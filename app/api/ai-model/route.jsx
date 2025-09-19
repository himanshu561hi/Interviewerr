

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const formData = await req.json();

        if (!formData.jobPosition || !formData.jobDescription || !formData.duration || !formData.type || formData.type.length === 0) {
            return NextResponse.json({ error: "Missing required form fields" }, { status: 400 });
        }
        
        // Determine the number of questions based on duration.
        // This must be done AFTER formData has been populated.
        let numberOfQuestions;
        switch (formData.duration) {
            case '5 Min':
                numberOfQuestions = 4;
                break;
            case '15 Min':
                numberOfQuestions = 8;
                break;
            case '30 Min':
                numberOfQuestions = 14;
                break;
            case '60 Min':
                numberOfQuestions = 25;
                break;
            default:
                // Fallback for an unexpected duration
                numberOfQuestions = 10;
                break;
        }
        
        const typeList = formData.type.join(', ');

        const prompt = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of **exactly ${numberOfQuestions}** high-quality interview questions:

Job Title: "${formData.jobPosition}"
Job Description: "${formData.jobDescription}"
Interview Duration: "${formData.duration}"
Interview Type: "${typeList}"

📝 Your task:
- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- The total number of questions must be exactly **${numberOfQuestions}** to fit the interview duration.
- Ensure the questions match the tone and structure of a real-life "${typeList}" interview.
- Adjust the number and depth of questions to match the specified interview duration.

🧩 Format your response in JSON format. The response must contain a single key, "interviewQuestions", which is an array of objects.
Example JSON Format:
{
  "interviewQuestions": [
    {
      "question": "What is the difference between a process and a thread?",
      "type": "Technical"
    },
    {
      "question": "Tell me about a time you had to handle a conflict with a team member.",
      "type": "Behavioral"
    }
  ]
}

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a "${formData.jobPosition}" role.`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const result = await model.generateContent(prompt);
        const content = result.response.text();
        
        // Use a regular expression to safely extract the JSON object
        const jsonMatch = content.match(/```json([\s\S]*)```/);

        if (!jsonMatch || jsonMatch.length < 2) {
            console.error("No JSON code block found in AI response:", content);
            return NextResponse.json({ error: "AI failed to generate a valid JSON." }, { status: 500 });
        }

        const jsonString = jsonMatch[1].trim();

        try {
            const questionsObject = JSON.parse(jsonString);
            return NextResponse.json(questionsObject);
        } catch (parseError) {
            console.error("Final JSON Parse Error:", parseError, "AI Response:", jsonString);
            return NextResponse.json({ error: "Invalid JSON format from AI." }, { status: 500 });
        }

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: "An unexpected server error occurred." }, { status: 500 });
    }
}
