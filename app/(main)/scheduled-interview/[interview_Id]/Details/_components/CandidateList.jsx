
"use client"
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/services/supabaseClient";



import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

// The component only needs the list of candidates
// NOTE: I am assuming 'supabase' and 'toast' are available in the scope (e.g., imported or provided by a context).
const CandidateList = ({ candidateList }) => {



  return (
    // Responsive Padding: p-4 (mobile) to p-5 (desktop)
    <div className="p-4 sm:p-5">
      
      <h2 className="font-bold my-5 text-xl sm:text-2xl">Candidates ({candidateList?.length})</h2>

      {candidateList?.map((candidate, index) => {
        const feedback = candidate?.feedback?.feedback;
        
        // Calculate Total Score (assuming max score is 10 per category, max 40 total)
        const totalScore =
          (feedback?.rating?.technicalSkills || 0) +
          (feedback?.rating?.communication || 0) +
          (feedback?.rating?.problemSolving || 0) +
          (feedback?.rating?.experience || 0);

        // Calculate Final Result (normalized to a 10-point scale)
        const finalResult =
          totalScore > 0 ? (totalScore / 40 * 10).toFixed(1) : 'N/A';
        

        return (
          // Responsive List Item: 
          // flex-col on mobile, flex-row on medium screens and up.
          // py-3 (mobile) to py-5 (desktop)
          <div
            key={index}
            className="p-3 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center justify-between bg-white rounded-lg mb-4 shadow-sm border relative" // Added 'relative' to the list item
          >
            
            {/* User Details Section: Always stays together */}
            <div className="flex items-center gap-4">
              {/* Initial Badge */}
              <div className="bg-primary p-2 px-3 sm:p-3 sm:px-4 text-lg font-bold text-white rounded-full flex-shrink-0 h-10 w-10 flex items-center justify-center">
                {candidate.userName[0]}
              </div>
              
              {/* Name and Date */}
              <div>
                <h2 className="font-bold text-base sm:text-lg">{candidate?.userName}</h2>
                <h2 className="text-xs sm:text-sm text-gray-500 mt-1">
                  Completed On:{" "}
                  {candidate.created_at
                    ? format(new Date(candidate.created_at), "MMM dd, yyyy")
                    : "Date N/A"}
                </h2>
              </div>
              
            </div> 
            
            {/* Score and Action Section: Uses justify-between to spread on mobile */}
            <div className="flex w-full sm:w-auto justify-between sm:justify-start gap-5 items-center mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0">
              {/* Final Result Score */}
              <div className="text-center flex-shrink-0">
                <h3 className="text-xs text-gray-500 font-medium">Score (Max 10)</h3>
                <h2 className={`font-bold text-xl sm:text-2xl ${totalScore > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {finalResult}
                </h2>
              </div>
              
              {/* Feedback Dialog Button */}
              <CandidateFeedbackDialog candidate={candidate} />
           
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateList;