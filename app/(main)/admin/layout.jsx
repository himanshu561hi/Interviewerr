"use client";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "@/app/(main)/provider";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }) {
  const { userDetails, loading } = useContext(DashboardContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!userDetails || !userDetails.isAdmin) {
        router.replace("/dashboard");
      }
    }
  }, [userDetails, loading, router]);

  if (loading || !userDetails || !userDetails.isAdmin) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Manage users, credits, and monitor platform activity.</p>
      </div>
      {children}
    </div>
  );
}
