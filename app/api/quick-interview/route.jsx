import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Server-side Supabase client (uses service role key for full DB access)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function getQuestionCount(duration) {
  if (duration === "5 Min")  return 4;
  if (duration === "15 Min") return 8;
  if (duration === "30 Min") return 14;
  if (duration === "60 Min") return 25;
  return 8;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/quick-interview
//
// Called by external projects (e.g. MERN stack) to:
//   1. Verify the user exists in Supabase and has credits
//   2. Generate AI questions
//   3. Save interview to DB + deduct 1 credit
//   4. Return the interview link
//
// Body: { userEmail, jobTitle, jobDescription, duration }
// Returns: { interviewLink, interview_Id, creditsLeft }
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    // CORS headers — allow your MERN project's domain
    const headers = {
      "Access-Control-Allow-Origin": "*", // Replace * with your MERN domain in production
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    const { userEmail, jobTitle, jobDescription, duration } = await req.json();

    if (!userEmail || !jobTitle || !jobDescription || !duration) {
      return NextResponse.json(
        { error: "Missing required fields: userEmail, jobTitle, jobDescription, duration" },
        { status: 400, headers }
      );
    }

    // ── 1. Fetch user & check credits ──────────────────────────────────────
    const { data: user, error: userError } = await supabaseAdmin
      .from("Users")
      .select("*")
      .eq("email", userEmail)
      .maybeSingle();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found. Make sure the user is registered in Interviewerr." },
        { status: 404, headers }
      );
    }

    if (user.credits <= 0) {
      return NextResponse.json(
        {
          error: "NO_CREDITS",
          message: "User has no interview credits left.",
          creditsLeft: 0,
          plan: user.plan,
        },
        { status: 403, headers }
      );
    }

    // ── 2. Generate questions with Gemini ──────────────────────────────────
    const numberOfQuestions = getQuestionCount(duration);

    const prompt = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of exactly ${numberOfQuestions} high-quality interview questions:

Job Title: "${jobTitle}"
Job Description: "${jobDescription}"
Interview Duration: "${duration}"

Your task:
- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- Generate exactly ${numberOfQuestions} questions to fit the interview duration.

Respond ONLY in valid JSON with this exact structure:
{
  "interviewQuestions": [
    { "question": "...", "type": "Technical" },
    { "question": "...", "type": "Behavioral" }
  ]
}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const content = result.response.text();

    // Extract JSON
    const jsonMatch = content.match(/```json([\s\S]*)```/) || [null, content];
    const jsonString = jsonMatch[1].trim();

    let questionsObject;
    try {
      questionsObject = JSON.parse(jsonString);
    } catch {
      return NextResponse.json(
        { error: "AI failed to generate valid JSON." },
        { status: 500, headers }
      );
    }

    // ── 3. Save interview to DB ────────────────────────────────────────────
    const interview_Id = uuidv4();
    const interviewPayload = {
      interview_Id,
      jobPosition:    jobTitle,
      jobDescription: jobDescription,
      duration:       duration,
      type:           ["Technical"],   // default; can extend later
      questionList:   questionsObject.interviewQuestions,
      email:          userEmail,
      name:           user.name,
      createdAt:      new Date().toISOString(),
    };

    const { error: insertError } = await supabaseAdmin
      .from("Interview")
      .insert([interviewPayload]);

    if (insertError) {
      console.error("DB insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save interview." },
        { status: 500, headers }
      );
    }

    // ── 4. Deduct 1 credit ────────────────────────────────────────────────
    const newCredits = user.credits - 1;
    await supabaseAdmin
      .from("Users")
      .update({ credits: newCredits })
      .eq("email", userEmail);

    // ── 5. Return interview link ───────────────────────────────────────────
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const interviewLink = `${baseUrl}/interview/${interview_Id}`;

    return NextResponse.json(
      {
        success: true,
        interview_Id,
        interviewLink,
        creditsLeft: newCredits,
        totalCredits: user.totalCredits ?? 5,
        plan: user.plan ?? "free",
      },
      { status: 200, headers }
    );

  } catch (error) {
    console.error("Quick Interview API Error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

// Handle preflight OPTIONS request (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
