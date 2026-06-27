"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

export default function FeedbacksTable() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("interview-feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load feedbacks");
    } else {
      setFeedbacks(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
          <tr>
            <th className="px-6 py-4 rounded-tl-lg">Interviewee Name</th>
            <th className="px-6 py-4">Interviewee Email</th>
            <th className="px-6 py-4">Interview ID</th>
            <th className="px-6 py-4">Recommended</th>
            <th className="px-6 py-4">Date Taken</th>
            <th className="px-6 py-4 rounded-tr-lg text-right">Link</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id} className="bg-white border-b hover:bg-gray-50/50">
              <td className="px-6 py-4 font-medium text-gray-900">{feedback.userName || "Unknown"}</td>
              <td className="px-6 py-4">{feedback.userEmail || "Unknown"}</td>
              <td className="px-6 py-4">
                <span className="font-mono text-xs bg-gray-100 p-1 rounded text-gray-600">
                  {feedback.interview_Id?.slice(0, 8)}...
                </span>
              </td>
              <td className="px-6 py-4">
                {feedback.recommended ? (
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full text-[10px]">YES</span>
                ) : (
                  <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded-full text-[10px]">NO</span>
                )}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {feedback.created_at ? format(new Date(feedback.created_at), 'PPP') : 'N/A'}
              </td>
              <td className="px-6 py-4 text-right">
                <Link href={`/interview/${feedback.interview_Id}/feedback`} target="_blank" className="inline-flex items-center text-purple-600 hover:text-purple-800">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {feedbacks.length === 0 && (
        <div className="text-center p-10 text-gray-500">No interviews taken yet.</div>
      )}
    </div>
  );
}
