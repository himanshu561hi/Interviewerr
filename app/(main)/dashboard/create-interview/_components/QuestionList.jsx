
"use client"
import { Button } from '@/components/ui/button';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import QuestionListContainer from './QuestionListContainer';
import { DashboardContext } from '@/app/(main)/provider';
import UpgradeModal from '@/components/UpgradeModal';

function QuestionList({ questions, loading, formData, onFinish, onCreateLink }) {

  const { userDetails, refreshUser } = useContext(DashboardContext);
  const [user, setUserDetails] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // useEffect hook add karein
  useEffect(() => {
    // Ek function banayein user data fetch karne ke liye
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Agar user mil jaaye toh state me set karein
          setUserDetails(user);
        } else {
          console.log("No user is logged in.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleFinish = async () => {
    if (!user) {
        toast.error("User details not found. Please log in again.");
        return;
    }

    if (!questions.length || !formData.jobPosition) {
      toast.error("No questions or form data available to save.");
      return;
    }

    // ── Credit check ────────────────────────────────
    const currentCredits = userDetails?.credits ?? 0;
    if (currentCredits <= 0) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      setSaveLoading(true);
      const interview_Id = uuidv4();
      const { data, error } = await supabase
        .from('Interview')
        .insert([
          {
            ...formData,
            questionList: questions,
            email: user.email,
            name: user.user_metadata?.full_name || user.email,
            interview_Id: interview_Id,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Failed to save the interview.");
        setSaveLoading(false);
        return;
      }

      // ── Deduct 1 credit ─────────────────────────
      await supabase
        .from('Users')
        .update({ credits: currentCredits - 1 })
        .eq('email', user.email);

      // Refresh context so credits update everywhere
      await refreshUser();

      setSaveLoading(false);
      toast.success("Interview saved successfully!");
      onCreateLink(interview_Id);
      if (onFinish) onFinish();

    } catch (err) {
      setSaveLoading(false);
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}

      <div className="container bg-white pb-10 rounded-2xl max-w-5xl m-2 md:m-5 px-5 md:px-8 py-1 shadow-lg">
        {loading && (
          <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md border border-blue-200 flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 animate-pulse">
            <Loader2Icon className="h-6 w-6 md:h-8 md:w-8 text-blue-500 animate-spin" />
            <div className="text-center md:text-left">
              <h2 className="text-lg md:text-xl font-semibold text-blue-800">Generating Interview Questions</h2>
              <p className="text-xs md:text-sm text-blue-600">Our AI is crafting personalized questions based on your job position and description.</p>
            </div>
          </div>
        )}
        {!loading && questions.length > 0 && (
          <div className="mt-5">
            <QuestionListContainer questions={questions} />
          </div>
        )}

        {/* Credits remaining hint */}
        {userDetails && (
          <p className="text-xs text-gray-400 text-center mt-4">
            🎯 {userDetails.credits > 0
              ? `${userDetails.credits} free interview${userDetails.credits === 1 ? '' : 's'} remaining`
              : <span className="text-red-500 font-semibold">No free interviews left — please upgrade</span>
            }
          </p>
        )}

        <div className="flex justify-center md:justify-end mt-6 md:mt-8">
          <Button
            onClick={handleFinish}
            disabled={saveLoading || !user || (userDetails?.credits ?? 0) <= 0}
            className="w-full md:w-auto text-sm md:text-base py-3 px-6"
          >
            {saveLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {(userDetails?.credits ?? 0) <= 0 ? '🔒 Upgrade to Create Interview' : 'Create Interview Link & Finish'}
          </Button>
        </div>
      </div>
    </>
  );
}

export default QuestionList;