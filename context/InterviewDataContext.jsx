// import { createContext } from "react";
// // In '@/context/InterviewDataContext' (simplified example)

// export const InterviewDataContext = createContext({

//     interviewInfo: { 
//         userName: '', 
//         jobPosition: '',
//         duration: '',
//         type: '',
//     },
//     setInterviewInfo: () => {},
// });





"use client";

import { createContext, useState, useEffect } from 'react';

export const InterviewDataContext = createContext({
    interviewInfo: { userName: '', jobPosition: '', duration: '', type: '', interviewData: { questionList: [] } },
    setInterviewInfo: () => {},
});

// Define the Provider Component
export function InterviewDataProvider({ children }) {
    const [interviewInfo, setInterviewInfo] = useState({
        userName: 'Test User',
        jobPosition: 'Developer',
        duration: '30 Min',
        type: 'Technical',
        interviewData: {
            questionList: [
                { question: 'What is your experience?' },
                { question: 'Why do you want this job?' },
            ],
        },
    });

    useEffect(() => {
        console.log("Context interviewInfo initialized in provider:", interviewInfo);
    }, [interviewInfo]);

    return (
        <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
            {children}
        </InterviewDataContext.Provider>
    );
}