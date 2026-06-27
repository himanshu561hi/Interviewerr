
"use client";

import { createContext, useState, useEffect } from 'react';
import React from 'react';

export const InterviewDataContext = createContext({
  interviewInfo: null,
  setInterviewInfo: () => {},
});

export function InterviewDataProvider({ children }) {
  const [interviewInfo, setInterviewInfo] = useState(null);

  useEffect(() => {
    if (interviewInfo) {
      console.log("InterviewDataContext updated:", {
        userName: interviewInfo.userName,
        userGender: interviewInfo.userGender,
        jobPosition: interviewInfo.interviewData?.jobPosition,
      });
    }
  }, [interviewInfo]);

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      {children}
    </InterviewDataContext.Provider>
  );
}