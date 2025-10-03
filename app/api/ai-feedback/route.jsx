import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const FEEDBACK_PROMPT = `{{conversation}}
Depends on this Interview Conversation between assitant and user,
Give me feedback for user interview. Give me rating out of 10 for technical Skills, 
Communication, Problem Solving, Experince. Also give me summery in 3 lines 
about the interview and one line to let me know whether is recommanded 
for hire or not with msg. Give me response in JSON format

{
  feedback:{
    rating:{
      techicalSkills:5,
      communication:6,
      problemSolving:4,
      experince:7
    },
    summery:<in 3 Line>,
    Recommendation:"",
    RecommendationMsg:""
  }
}
and recommendation in only TRUE or FALSE on Capital letter.
`;


export async function POST(req) {
    try {
        const { conversation } = await req.json();
        const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation, null, 2));

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
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}