

"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Copy, Send, Check, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient"
import Link from "next/link";

const InterviewCard = ({ interview, viewdetail = false }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = () => {

    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_Id}`;
    navigator.clipboard.writeText(url);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const onDelete = async () => {
    const { error } = await supabase
      .from("Interview")
      .delete()
      .eq("interview_Id", interview?.interview_Id);
  };

  const onSend = () => {
    window.location.href = `mailto:?subject=AI Interview Link&body=Here is your AI interview link: ${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_Id}`;
  };

  const formattedDate = interview?.created_at
    ? format(new Date(interview?.created_at), "dd MMM yyyy")
    : "";

  return (
    <div className="p-5 rounded-lg bg-white border flex flex-col h-full shadow-sm relative">
      <div className="absolute top-3 right-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(interview?.interview_Id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between pr-10">
          {" "}
          {/* Added pr-10 to make space for the trash button */}
          <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
          <h2 className="text-xs text-gray-500">{formattedDate}</h2>
        </div>
        <h2 className="text-lg font-bold mt-3">{interview?.jobPosition}</h2>
        <h2 className="font-normal text-gray-500 flex justify-between mt-3 text-sm">
          {interview?.duration}
          <span className="text-green-700">
            {interview["interview-feedback"]?.length} Candidates
          </span>
        </h2>
      </div>
      <div className="flex flex-col gap-3 w-full mt-5">
        {viewdetail ? (
          <Link
            href={`/scheduled-interview/${interview?.interview_Id}/Details`}
            className="w-full"
          >
            <Button className="w-full" variant={"outline"}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <>
            <div className="flex gap-3 w-full">
              <Button
                variant={"outline"}
                className={"flex-1"}
                onClick={copyLink}
                disabled={isCopied}
              >
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-500" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Link
                  </>
                )}
              </Button>
              <Button className={"flex-1"} onClick={onSend}>
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;
