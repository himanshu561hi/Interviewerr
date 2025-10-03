
"use client";
import React from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { useEffect } from "react";
import { useState } from "react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useContext } from "react";
import Footer from "@/app/(main)/footer/page"; // Footer is imported here

function Interview() {
  const { interview_Id } = useParams();
  console.log(interview_Id);
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const {InterviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
  const router = useRouter();
  
  useEffect(() => {
    interview_Id && GetInterviewDetails();
  }, [interview_Id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try{
    let { data: Interview, error } = await supabase
      .from("Interview")
      .select("jobPosition,jobDescription,duration,type")
      .eq('interview_Id',interview_Id)
    setInterviewData(Interview[0]);
    setLoading(false);
  
    }catch(e){
      setLoading(false);
      toast('Incorrect Interview Link')
    }
    
  };



  const onJoinInterview=async()=>{
    setLoading(true);
    let { data: Interview, error } = await supabase
  .from('Interview')
  .select('*')
  .eq('interview_Id',interview_Id)

  console.log(Interview[0]);
  setInterviewInfo({
    userName: userName,
    userEmail: userEmail,
    interviewData: Interview[0]
  });
  router.push('/interview/'+interview_Id+'/start');
  setLoading(false);
  }


  return (
    // 1. Set component to take full screen height and use flex column layout
    <div className="min-h-screen flex flex-col"> 
      {/* 2. Main content div takes up remaining space and handles inner padding */}
      <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16 flex justify-center flex-grow">
        <div className="flex justify-center items-center mb-20 p-7 flex-col border rounded-lg bg-white md:px-18 lg:px-50 xl:px-52">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={80}
            className="w-[auto]"
          />
          <h2 className="mt-3">AI-Powered Interview Platform</h2>
          <Image
            src={"/interview.png"}
            alt="Interview"
            width={500}
            height={500}
            priority={true}
            className="w-[300px] my-6"
          />

          <h2 className="font-bold text-xl">{interviewData?.jobPosition}</h2>
          <h2 className="flex gap-2 items-center mb-3 text-gray-500 mt-3">
            <Clock className="w-4 h-4" />
            {interviewData?.duration}
          </h2>
          <div className="w-full">
            <h2 className="font-medium">Enter Your Full Name</h2>
            <Input type="text" placeholder="e.g. Jhon" className="mt-2" onChange={(event) => setUserName(event.target.value)} />
          </div>
          <div className="w-full mt-3">
            <h2 className="font-medium">Enter Your Email</h2>
            <Input type="email" placeholder="e.g. john@example.com" className="mt-2" onChange={(event) => setUserEmail(event.target.value)} />
          </div>
          <div className="p-3 bg-blue-100 border border-blue-200 rounded-lg mt-6 flex gap-3">
            <Info className=" text-primary" />
            <div>
              <h2 className="font-bold">Before You Begin</h2>
              <ul>
                <li className="text-sm text-primary">
                  - Test your audio and video setup
                </li>
                <li className="text-sm text-primary">
                  - Ensure you have a stable connection
                </li>
                <li className="text-sm text-primary">
                  - Find a quiet and well-lit space
                </li>
              </ul>
            </div>
          </div>
          <Button className="mt-5 w-full font-bold"
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}>
            <Video className="w-4 h-4" />{loading&&<Loader2Icon/>} Join Interview
          </Button>
        </div>
      </div>
      
      {/* 3. Footer is correctly placed at the bottom of the component */}
      <Footer />
    </div>
  
  );
}

export default Interview;
