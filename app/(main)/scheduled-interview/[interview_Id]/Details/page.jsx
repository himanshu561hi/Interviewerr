"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';

const InterviewDetails = () => {
    const {interview_Id} = useParams();
    const { user } = useUser();
    const [interviewDetail,setInterviewDetail] = useState();

    useEffect(() => {
        user&&GetInterviewDetail();
    },[user])

    const GetInterviewDetail = async () => {
    const result = await supabase
        .from("Interview")
        .select(`id, jobPosition, jobDescription, type, questionList, duration, created_at, interview_Id, 
            interview-feedback(userEmail,userName,feedback,created_at)`)
        .eq("email", user?.email)
        .eq('interview_Id', interview_Id);
            setInterviewDetail(result?.data[0])
    console.log(result);
}
    return (
        <div>
            <h2 className="font-bold text-2xl">Interview Detail</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail}/>
            <CandidateList candidateList={interviewDetail?.['interview-feedback']}/>
        </div>
    );
};

export default InterviewDetails;
