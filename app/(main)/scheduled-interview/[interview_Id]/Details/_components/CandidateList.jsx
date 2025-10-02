
import React from "react";
import { format } from "date-fns";

import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

// The component only needs the list of candidates
const CandidateList = ({ candidateList }) => {
  return (
    <div className="p-5">
      <h2 className="font-bold my-5">Candidates ({candidateList?.length})</h2>

      {candidateList?.map((candidate, index) => {
        const feedback = candidate?.feedback?.feedback;
        
        const totalScore =
          (feedback?.rating?.technicalSkills || 0) +
          (feedback?.rating?.communication || 0) +
          (feedback?.rating?.problemSolving || 0) +
          (feedback?.rating?.experience || 0);


        const finalResult =
          totalScore > 0 ? (totalScore/40*10).toFixed(1) : 0;
        

        return (
          <div
            key={index}
            className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg mb-4" // Added mb-4 for spacing
          >
            <div className="flex items-center gap-4">
              <h2 className="bg-primary p-3 px-4 font-bold text-white rounded-full">
                {candidate.userName[0]}
              </h2>
              <div>
                <h2 className="font-bold">{candidate?.userName}</h2>
                <h2 className="text-sm text-gray-500">
                  Completed On:{" "}
                  {candidate.created_at
                    ? format(new Date(candidate.created_at), "MMM dd, yyyy")
                    : ""}
                </h2>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              {/* 4. Display the unique finalResult for this candidate */}
              <h2 className="font-bold text-green-600 ">{finalResult}</h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateList;