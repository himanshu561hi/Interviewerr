import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Copy,
  Clock,
  List,
  Calendar,
  Mail,
  ArrowLeft,
  Plus,
} from "lucide-react";
import React, { useState } from "react";

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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/check.png"}
        alt="check"
        width={200}
        height={200}
        className="w-[50px] h-[50px]"
      />
      <h2 className="font-bold mt-4 text-lg">Your AI Interview Is Ready.</h2>
      <p className="mt-3">
        Share this link with your candidate to start the interview process.
      </p>
      <div className="w-full p-7 mt-6 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-4xl">
            Valid for 30 Days
          </h2>
        </div>
        <div className="mt-3 flex flex-row-2 gap-3">
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button onClick={handleCopy}>
            <Copy />
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
        <hr className="my-5" />
        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" />
            {formData?.duration}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" />
            ? Questions
          </h2>
          {/* <h2 className="text-sm text-gray-500 flex gap-2 items-center"><Calendar className="h-4 w-4"/> 30 Min {formData?.duration}</h2> */}
        </div>
      </div>
      <div className="mt-5 bg-white p-5 gap-5 flex flex-col rounded-lg w-full">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-5 justify-evenly">
          <Button variant={"outline"}>
            <Mail />
            Email
          </Button>
          <Button variant={"outline"}>
            <Mail />
            Slack
          </Button>
          <Button variant={"outline"}>
            <Mail />
            Whatsapp
          </Button>
        </div>
      </div>
      <div className="mt-5 flex justify-between w-full px-5">
        <Link href={"/dashboard"}>
          <Button variant={"outline"}>
            <ArrowLeft /> Back to Dashboard
          </Button>
        </Link>
        <Link href={"/dashboard/create-interview"}>
          <Button>
            <Plus /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
