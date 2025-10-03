import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const CandidateFeedbackDialog = ({ candidate }) => {
  const feedback = candidate?.feedback?.feedback;

  const totalScore = 
    (feedback?.rating?.technicalSkills) +
    (feedback?.rating?.communication) +
    (feedback?.rating?.problemSolving) +
    (feedback?.rating?.experience);


const finalResult = totalScore > 0 
    ? (totalScore/40*10).toFixed(1)
    : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h2 className="bg-primary p-3 px-4 font-bold text-white rounded-full">
                    {candidate.userName[0]}
                  </h2>
                  <div>
                    <h2 className="font-bold">{candidate?.userName}</h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <h2 className="font-bold text-primary text-2xl">{finalResult}</h2>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold text-lg">Skill Assessment</h2>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h2 className="flex justify-between">
                      Technical Skills{" "}
                      <span>{feedback?.rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={feedback?.rating?.technicalSkills * 10}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Communication{" "}
                      <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={feedback?.rating?.communication * 10}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving
                      <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={feedback?.rating?.problemSolving * 10}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Experience<span>{feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress
                      className="mt-2"
                      value={feedback?.rating?.experience * 10}
                    />
                  </div>
                </div>
              </div>

              <h2 className="font-bold mt-7 text-lg">Performance Summary</h2>
              <div className="mt-3 bg-gray-100 rounded-lg p-5">
                {feedback?.summary ? (
                  <p className="mt-2 text-gray-600">{feedback?.summary}</p>
                ) : (
                  <p className="mt-2 text-gray-500">No summary avaable.</p>
                )}
              </div>
              <div
                className={`p-5 mt-5 flex items-center justify-between rounded-md ${
                  feedback?.Recommendation == "false"
                    ? "bg-red-100"
                    : "bg-green-100"
                }`}
              >
                <div>
                    <h2
                        className={`font-bold ${
                        feedback?.Recommendation == "false"
                            ? "text-red-700"
                            : "text-green-700"
                        }`}
                    >
                        Recommendation Msg:
                    </h2>
                    <p
                        className={`${
                        feedback?.Recommendation == "false"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                    >
                        {feedback?.RecommendationMsg}
                    </p>
                </div>
                <Button className={`${
                        feedback?.Recommendation == "false"
                            ? "bg-red-700"
                            : "bg-green-700"
                        }`}>Send Msg</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateFeedbackDialog;