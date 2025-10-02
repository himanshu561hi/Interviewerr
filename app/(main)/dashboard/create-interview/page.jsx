"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { Toaster, toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

export default function CreateInterview({ onFinish }) {
  const Router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [interview_Id, setInterviewId] = useState();


  const onHandleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setFormData]
  );

  const onGenerateQuestionsClick = useCallback(async () => {
    
    if (
      !formData.jobPosition ||
      !formData.jobDescription ||
      !formData.duration ||
      !formData.type ||
      formData.type.length === 0
    ) {
      toast.error("Please fill all the details.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions(data.interviewQuestions);
        setStep(step + 1);
        toast.success("Questions generated successfully!");
      } else {
        toast.error(data.error || "Failed to generate questions.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [formData, setStep, setQuestions, setLoading]);

  const onCreateLink = (interview_Id) => {
    setInterviewId(interview_Id);
    setStep(step + 1);
  };

  return (
    <div className="mt-5 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex items-center gap-5 ">
        <ArrowLeft onClick={() => Router.back()} className="cursor-pointer" />
        <h2 className="text-2xl font-bold">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step === 1 ? (
        <FormContainer
          formData={formData}
          onHandleInputChange={onHandleInputChange}
          onGenerateQuestionsClick={onGenerateQuestionsClick}
          loading={loading}
        />
      ) : step === 2 ? (
        <QuestionList
          questions={questions}
          loading={loading}
          formData={formData}
          onFinish={onFinish}
          onCreateLink={(interview_Id) => onCreateLink(interview_Id)}
        />
      ) : step == 3 ? (
        <InterviewLink interview_Id={interview_Id} formData={formData} />
      ) : null}

      <Toaster position="bottom-right" />
    </div>
  );
}
