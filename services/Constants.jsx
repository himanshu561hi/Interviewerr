"use client"
import { Calendar, List, LayoutDashboard, Settings, WalletCards, Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, Sparkles } from "lucide-react";

export const SideBarOptions = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Scheduled Interview",
        href: "/scheduled-interview",
        icon: Calendar       
    },
    {
        name: "All Interview",
        href: "/all-interview",
        icon: List       
    },
    {
        name: "Billing",
        href: "/billing",
        icon: WalletCards       
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings       
    }
]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },{
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },{
        title: 'Leadership',
        icon: Sparkles
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
]


export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:"",
  type:"Technical/Behavioral/Experience/Problem Solving/Leadership"
},{
  ...
}]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`
