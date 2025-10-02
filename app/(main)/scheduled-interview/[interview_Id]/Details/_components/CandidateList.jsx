import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

const CandidateList = ({ candidateList }) => {
  return (
    <div className="p-5">
      <h2 className="font-bold my-5">Candidates ({candidateList?.length})</h2>
      {/* We will map over each 'candidate' in the 'candidateList' array */}
      {candidateList?.map((candidate, index) => (
        <div
          key={index}
          className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg"
        >
          <div className="flex items-center gap-4">
            <h2 className="bg-primary p-3 px-4 font-bold text-white rounded-full">
              {candidate.userName[0]}
            </h2>
            <div className="">
              <h2 className="font-bold ">{candidate?.userName}</h2>
              {/* Format the date for each individual candidate inside the map */}
              <h2 className="text-sm  text-gray-500">
                Completed On:{" "}
                {candidate.created_at
                  ? format(new Date(candidate.created_at), "MMM dd, yyyy")
                  : ""}
              </h2>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <h2 className="font-bold text-green-600 ">6/10</h2>
            <CandidateFeedbackDialog candidate={candidate} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
