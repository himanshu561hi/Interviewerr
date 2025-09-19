
"use client"
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import QuestionListContainer from './QuestionListContainer';

// This component now contains all the logic and styling for the question list
// It receives formData and onFinish as props from the parent
function QuestionList({ questions, loading, formData, onFinish }) {

  const [userDetails, setUserDetails] = useState(null);


  const handleFinish = async() => {
    // You can now access formData and questions from the props
    if (!questions.length || !formData.jobPosition) {
        toast.error("No questions or form data available to save.");
        return;
    }

    try {
        const interview_id = uuidv4();
        const { data, error } = await supabase
        .from('Interview')
        .insert([
            { 
                ...formData,
                questionList: questions, // Use the questions prop
                email: userDetails?.email,
                interview_id: interview_id,
                name: userDetails?.name
            },
        ])
        .select();

        if (error) {
            console.error("Supabase insert error:", error);
            toast.error("Failed to save the interview.");
        } else {
            console.log("Data saved successfully:", data);
            toast.success("Interview saved successfully!");
            // Call the onFinish prop from the parent
            if (onFinish) {
                onFinish();
            }
        }
    } catch (err) {
        console.error("An unexpected error occurred:", err);
        toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="container bg-white pb-10 rounded-2xl m-5 px-4 py-1">
      {loading && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md border border-blue-200 flex items-center space-x-4 animate-pulse">
          <Loader2Icon className="h-8 w-8 text-blue-500 animate-spin" />
          <div>
            <h2 className="text-xl font-semibold text-blue-800">Generating Interview Questions</h2>
            <p className="text-sm text-blue-600">Our AI is crafting personalized questions based on your job position and description.</p>
          </div>
        </div>
      )}
      {!loading && questions.length > 0 && (
        <div className="mt-5">
            {/* Pass the questions prop to the container component */}
            <QuestionListContainer questions={questions} />
        </div>
      )}
      <div className="flex justify-end mt-10">
        <Button onClick={handleFinish}>Finish</Button>
      </div>
    </div>
  )
}

export default QuestionList;
