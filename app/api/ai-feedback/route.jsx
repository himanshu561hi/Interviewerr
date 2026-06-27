import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const FEEDBACK_PROMPT = `{{conversation}}

Based on this Interview Conversation between an AI assistant and a user, provide detailed feedback for the user's interview performance.

Give me ratings out of 10 for:
- Technical Skills
- Communication
- Problem Solving
- Experience

{{attentionSection}}

Also provide:
- A summary in exactly 3 lines about the interview performance
- A recommendation on whether the candidate is recommended for hire (TRUE or FALSE in capital letters)
- A one-line recommendation message

Respond ONLY in valid JSON format matching this exact structure:
{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "summary": "<3 line summary>",
    "Recommendation": "TRUE",
    "RecommendationMsg": "<one line message>"
  }
}`;

export async function POST(req) {
  try {
    const { conversation, attentionMetrics } = await req.json();

    /* Build optional attention context block */
    let attentionSection = "";
    if (attentionMetrics) {
      attentionSection = `
Attention Monitoring Data (collected via real-time face tracking during the interview):
- Eye Contact Score: ${attentionMetrics.eyeContactScore ?? "N/A"}/10
- Face Visibility: ${attentionMetrics.faceVisibilityPct ?? "N/A"}%
- Attention Score: ${attentionMetrics.attentionScore ?? "N/A"}/10
- Total Warnings Issued: ${attentionMetrics.totalWarnings ?? 0}
- Total Look-Away Duration: ${attentionMetrics.lookAwayDurationSec ?? 0} seconds
- Interview Duration: ${attentionMetrics.interviewDurationMin ?? 0} minutes

Please factor attention behaviour into your Communication and overall assessment where relevant.`;
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT
      .replace("{{conversation}}", JSON.stringify(conversation, null, 2))
      .replace("{{attentionSection}}", attentionSection);

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not set");
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(FINAL_PROMPT);
    const content = result.response.text();

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error in AI Feedback route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
