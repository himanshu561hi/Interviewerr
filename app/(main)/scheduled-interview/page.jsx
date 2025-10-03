
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';
import InterviewCard from '../dashboard/_components/InterviewCard';
import Footer from "@/app/(main)/footer/page"; // Import the Footer component

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    // Check if the user object exists before fetching the list
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    // Make sure we have a user email before querying
    if (!user?.email) return;


    const { data, error } = await supabase
      .from("Interview")
      .select("id, jobPosition, duration, interview_Id, interview-feedback(userEmail)")
      .eq("email", user.email) 
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching interview list:", error);
      return;
    }
    

    if (data) {
        setInterviewList(data);
    }
  };

  return (
    // Use a React Fragment to wrap both the content and the footer
    <>
      <div className="mb-10"> {/* Added padding to the content div for spacing */}
        <h2 className="font-bold text-2xl mb-8">Interview List With Candidate Feedback</h2>
        {interviewList && interviewList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {interviewList.map((interview) => (

                          <InterviewCard interview={interview} key={interview.id} 
                          viewdetail={true} /> 
                      ))}
                  </div>
              ) : (
                  <div className="p-5 flex flex-col gap-3 bg-white rounded-2xl border border-gray-200 items-center mt-5">
                      <Video className="h-10 w-10 text-primary" />
                      <h2 className="font-bold">No Interviews Found</h2>
                      <p className="text-sm text-gray-500">You haven't created any interviews yet.</p>
                      <Button asChild className="mt-2">
                          <Link href="/dashboard/create-interview">+ Create New Interview</Link>
                      </Button>
                  </div>
              )}
      </div>
      {/* Footer added to the bottom of the page */}
      <Footer className={"mt-15"}/>
    </>
  );
}

export default ScheduledInterview;