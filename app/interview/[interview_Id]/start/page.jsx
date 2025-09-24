

"use client"
import React from 'react'
import { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Timer, Mic, Phone } from 'lucide-react';
import Image from 'next/image';

function StartInterview() {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    

    const userInitial = interviewInfo?.userName
        ? interviewInfo.userName[0].toUpperCase()
        : 'U';

 

  return (
    <div className="p-20 lg:px-48 xl:px-56">
        <h2 className="font-bold text-xl flex items-center justify-between">AI - Interview Session
            <span className="flex gap-2 items-center ">
                <Timer />
                00:00:00
            </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
            <div className="bg-white h-[300px] rounded-lg border flex flex-col justify-center items-center">
                <Image src={'/ai.jpeg'} alt='AI' width={100} height={100} className='w-[60px] h-[60px]  rounded-full object-cover'/>
                <h2 className="text-sm font-semibold mt-2">AI Interviewer</h2>
            </div>
            <div className="bg-white h-[300px] rounded-lg border flex flex-col justify-center items-center">
                {/* Use the safely calculated userInitial */}
                <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-6">{userInitial}</h2>
                <h2 className="text-sm mt-2 font-semibold">{interviewInfo?.userName} You</h2>
            </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-7">
        <Mic className="w-12 h-12 rounded-full bg-gray-500 text-white p-3 cursor-pointer" />
        <Phone className="w-12 h-12 rounded-full bg-red-500 text-white p-3 cursor-pointer" />
        </div>
        <h2 className="text-center text-sm text-gray-500 mt-4">Interview in progress...</h2>
    </div>
  )
}

export default StartInterview