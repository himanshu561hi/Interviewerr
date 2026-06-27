"use client";
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'

function InterviewHeader() {
  const pathname = usePathname();
  
  // Hide the header on the interview start screen
  if (pathname.endsWith("/start")) {
    return null;
  }

  return (
    <div className="p-4 shadow-sm bg-white">
        <Image src="/logo.png" alt="Logo" width={150} height={80} 
        className="w-[150px]" />
    </div> 
  ) 
}

export default InterviewHeader