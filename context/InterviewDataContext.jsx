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

import { createContext, useState } from 'react';

export const InterviewDataContext = createContext({
    interviewInfo: { userName: '', jobPosition: '', duration: '', type: '' },
    setInterviewInfo: () => {},
});

// 2. Define the Provider Component
export function InterviewDataProvider({ children }) {
    const [interviewInfo, setInterviewInfo] = useState({
        userName: '', 
        jobPosition: '',
        duration: '',
        type: '',
    });

    return (
        <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
            {children}
        </InterviewDataContext.Provider>
    );
}