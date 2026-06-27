"use client";
import React, { useState } from "react";
import UsersTable from "./_components/UsersTable";
import InterviewsTable from "./_components/InterviewsTable";
import FeedbacksTable from "./_components/FeedbacksTable";
import { Users, Video, FileText } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center px-6 py-4 font-medium transition-colors ${
            activeTab === "users"
              ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Users
        </button>
        <button
          onClick={() => setActiveTab("interviews")}
          className={`flex items-center px-6 py-4 font-medium transition-colors ${
            activeTab === "interviews"
              ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Video className="w-4 h-4 mr-2" />
          Interviews Created
        </button>
        <button
          onClick={() => setActiveTab("feedbacks")}
          className={`flex items-center px-6 py-4 font-medium transition-colors ${
            activeTab === "feedbacks"
              ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FileText className="w-4 h-4 mr-2" />
          Interviews Taken
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "users" && <UsersTable />}
        {activeTab === "interviews" && <InterviewsTable />}
        {activeTab === "feedbacks" && <FeedbacksTable />}
      </div>
    </div>
  );
}
