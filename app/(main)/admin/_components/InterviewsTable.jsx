"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

export default function InterviewsTable() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Interview")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load interviews");
    } else {
      setInterviews(data || []);
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
            <th className="px-6 py-4 rounded-tl-lg">Creator Name</th>
            <th className="px-6 py-4">Creator Email</th>
            <th className="px-6 py-4">Job Role / Position</th>
            <th className="px-6 py-4">Experience</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4 rounded-tr-lg text-right">Link</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview.id} className="bg-white border-b hover:bg-gray-50/50">
              <td className="px-6 py-4 font-medium text-gray-900">{interview.name}</td>
              <td className="px-6 py-4">{interview.email}</td>
              <td className="px-6 py-4">
                <span className="font-semibold text-gray-800">{interview.jobPosition}</span>
              </td>
              <td className="px-6 py-4">{interview.jobExperience} years</td>
              <td className="px-6 py-4 text-gray-500">
                {interview.created_at ? format(new Date(interview.created_at), 'PPP') : 'N/A'}
              </td>
              <td className="px-6 py-4 text-right">
                <Link href={`/interview/${interview.interview_Id}`} target="_blank" className="inline-flex items-center text-purple-600 hover:text-purple-800">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {interviews.length === 0 && (
        <div className="text-center p-10 text-gray-500">No interviews found.</div>
      )}
    </div>
  );
}
