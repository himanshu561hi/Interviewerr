
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from "@/app/(main)/footer/page"; // Assuming Footer path is correct

const InterviewComplete = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (secondsLeft <= 0) {
      // Navigate after the timer hits 0. Replace this with your actual route.
      // router.push('/dashboard'); 
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, router]); // Dependency array

  return (
    // 1. Main container: Full height, flex column to push footer to bottom
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-700">
      
      {/* 2. Content container: Takes up available space, centers content */}
      <div className="flex-grow flex flex-col items-center justify-center p-5">
        
        {/* Header with Checkmark */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-5 text-4xl text-white font-bold">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Interview Complete!
          </h1>
          <p className="text-base text-gray-500">
            Thank you for participating in the AI-driven interview with Alcruiter
          </p>
        </div>

        {/* Timer */}
        <p className="mt-5 text-gray-600 text-sm">
          Wait for <b>{secondsLeft}</b> seconds...
        </p>

        {/* Illustration */}
        <div className="w-full max-w-sm h-64 mb-10 mt-2">
          {/* Note: Ensure the image path /interviewComplete copy.png is correct */}
          <img 
            src="/interviewComplete copy.png" 
            alt="Interview Complete Illustration" 
            className="w-full h-full object-contain" 
          />
        </div>

        {/* What's Next Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4 text-xl text-white">
            ✈️
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            What's Next?
          </h2>
          <p className="text-base text-gray-700 mb-2 leading-relaxed">
            The recruiter will review your interview responses and will contact you soon regarding the next steps.
          </p>
          <p className="text-sm text-gray-400 mt-2 italic">
            (c) Response within 2-3 business days
          </p>
        </div>
      </div>

      {/* 3. Footer is correctly placed at the bottom */}
      <Footer />
    </div>
  );
};

export default InterviewComplete;
