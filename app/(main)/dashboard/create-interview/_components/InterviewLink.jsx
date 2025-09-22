import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import React, { useState } from 'react';

    
function InterviewLink({ interview_Id, formData }) {
    const [copied, setCopied] = useState(false);
    const GetInterviewUrl = () => {
        const interviewUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_Id}`;
        return interviewUrl;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(GetInterviewUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);  // Optional: show Copied! message briefly
        } catch (err) {
            setCopied(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Image src={'/check.png'} alt="check" width={200} height={200}
            className="w-[50px] h-[50px]"/>
            <h2 className="font-bold mt-4 text-lg">Your AI Interview Is Ready.</h2>
            <p className="mt-3">Share this link with your candidate to start the interview process.</p>
            <div className="w-full p-7 mt-6 rounded-xl bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold">
                        Interview Link
                    </h2>
                    <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-4xl">
                        Valid for 30 Days
                    </h2>
                </div>
                <div className="mt-3 flex flex-row-2 gap-3">
                        <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                                        <Button onClick={handleCopy}>
                    <Copy />
                    {copied ? "Copied!" : "Copy Link"}
                </Button>
                </div>
                    <hr className="my-5"/>
            </div>
        </div>
    )
}

export default InterviewLink;