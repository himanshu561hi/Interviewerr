

// "use client";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// // Removed Next.js specific Link component to resolve compilation error
// // import Link from "next/link"; 
// import {
//   Copy,
//   Clock,
//   List,
//   Mail,
//   ArrowLeft,
//   Plus,
// } from "lucide-react";
// import React, { useState } from "react";

// function InterviewLink({ interview_Id, formData }) {
//   const [copied, setCopied] = useState(false);
  
//   // Removed process.env access due to environment limitations in this context
//   const GetInterviewUrl = () => {
//     // Mocking a host URL since process.env might not be available

//     const interviewUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_Id}`;
//     return interviewUrl;
//   };

//   const handleCopy = async () => {
//     try {
//       // Using document.execCommand('copy') as navigator.clipboard may be restricted in some environments
//       const interviewUrl = GetInterviewUrl();
//       const tempInput = document.createElement("textarea");
//       tempInput.value = interviewUrl;
//       document.body.appendChild(tempInput);
//       tempInput.select();
//       document.execCommand('copy');
//       document.body.removeChild(tempInput);
      
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Could not copy text: ", err);
//       setCopied(false);
//     }
//   };

//   return (
//     // Responsive padding and max-width for centering content
//     <div className="flex flex-col items-center justify-center p-4 max-w-lg mx-auto">
//       {/* Mock Image Placeholder */}
//       {/* Replaced Image component with a simple div/icon since external paths might fail */}
//       <div className="w-[50px] h-[50px] bg-green-100 rounded-full flex items-center justify-center">
//          <List className="w-6 h-6 text-green-600" />
//       </div>

//       <h2 className="font-bold mt-4 text-xl text-gray-800 text-center">Your AI Interview Is Ready!</h2>
//       <p className="mt-2 text-sm text-gray-600 text-center">
//         Share this link with your candidate to start the interview process.
//       </p>
      
//       {/* Interview Link Box */}
//       <div className="w-full p-5 sm:p-7 mt-6 rounded-xl bg-white shadow-lg border border-gray-100">
//         <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center mb-3">
//           <h2 className="font-bold text-lg mb-2 sm:mb-0">Interview Link</h2>
//           <h2 className="p-1 px-3 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full whitespace-nowrap">
//             Valid for 30 Days
//           </h2>
//         </div>
        
//         {/* Input and Copy Button Group */}
//         <div className="flex flex-col sm:flex-row gap-3">
//           <Input 
//             className="flex-grow min-w-0" // Ensure input takes space
//             defaultValue={GetInterviewUrl()} 
//             disabled={true} 
//           />
//           <Button onClick={handleCopy} className="whitespace-nowrap flex items-center justify-center">
//             <Copy className="mr-2 h-4 w-4" />
//             {copied ? "Copied!" : "Copy Link"}
//           </Button>
//         </div>
        
//         <hr className="my-5 border-t border-gray-200" />
        
//         {/* Interview Details */}
//         <div className="flex flex-wrap gap-x-6 gap-y-2">
//           <h2 className="text-sm text-gray-600 flex gap-2 items-center">
//             <Clock className="h-4 w-4 text-blue-500" />
//             Duration: <b>{formData?.duration || 'N/A'}</b>
//           </h2>
//           <h2 className="text-sm text-gray-600 flex gap-2 items-center">
//             <List className="h-4 w-4 text-blue-500" />
//             Questions: <b>?</b>
//           </h2>
//         </div>
//       </div>
      
//       {/* Share Via Section */}
//       <div className="mt-5 bg-white p-5 rounded-xl shadow-lg border border-gray-100 w-full">
//         <h2 className="font-bold mb-4 text-gray-800">Share Via</h2>
//         <div className="grid grid-cols-3 gap-3"> {/* Use grid for even spacing/distribution */}
//           <Button variant={"outline"} className="flex flex-col h-auto py-3">
//             <Mail className="h-5 w-5 mb-1" />
//             <span className="text-xs">Email</span>
//           </Button>
//           <Button variant={"outline"} className="flex flex-col h-auto py-3">
//             <Mail className="h-5 w-5 mb-1" />
//             <span className="text-xs">Slack</span>
//           </Button>
//           <Button variant={"outline"} className="flex flex-col h-auto py-3">
//             <Mail className="h-5 w-5 mb-1" />
//             <span className="text-xs">Whatsapp</span>
//           </Button>
//         </div>
//       </div>
      
//       {/* Navigation Buttons (Back/New) */}
//       <div className="mt-8 mb-5 flex flex-col-reverse sm:flex-row justify-between w-full gap-3">
//         {/* Replaced Link with standard <a> tag wrapped around Button */}
//         <a href={"/dashboard"} className="w-full sm:w-auto">
//           <Button variant={"outline"} className="w-full">
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
//           </Button>
//         </a>
//         {/* Replaced Link with standard <a> tag wrapped around Button */}
//         <a href={"/dashboard/create-interview"} className="w-full sm:w-auto">
//           <Button className="w-full">
//             <Plus className="mr-2 h-4 w-4" /> Create New Interview
//           </Button>
//         </a>
//       </div>
//     </div>
//   );
// }

// export default InterviewLink;






"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// Removed Next.js specific Link component to resolve compilation error
// import Link from "next/link"; 
import {
  Copy,
  Clock,
  List,
  Mail,
  ArrowLeft,
  Plus,
} from "lucide-react";
import React, { useState } from "react";

function InterviewLink({ interview_Id, formData }) {
  const [copied, setCopied] = useState(false);
  
  // Removed process.env access due to environment limitations in this context
  const GetInterviewUrl = () => {
    // Mocking a host URL since process.env might not be available
    // NOTE: Restoring the original logic using process.env, which is required
    // for production use, but mocking the variable if unavailable.
    const hostUrl = typeof process.env.NEXT_PUBLIC_HOST_URL !== 'undefined' 
      ? process.env.NEXT_PUBLIC_HOST_URL 
      : "https://ai-interview.app"; 
    const interviewUrl = `${hostUrl}/${interview_Id}`;
    return interviewUrl;
  };

  const handleCopy = async () => {
    try {
      // Using document.execCommand('copy') as navigator.clipboard may be restricted in some environments
      const interviewUrl = GetInterviewUrl();
      const tempInput = document.createElement("textarea");
      tempInput.value = interviewUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy text: ", err);
      setCopied(false);
    }
  };

  return (
    // ADJUSTMENT: Changed p-4 to p-2 for phone view (mobile) to reduce side margins. 
    // It remains p-4 (1rem) on larger screens (sm:p-4).
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 max-w-lg mx-auto">
      {/* Mock Image Placeholder */}
      {/* Replaced Image component with a simple div/icon since external paths might fail */}
      <div className="w-[50px] h-[50px] bg-green-100 rounded-full flex items-center justify-center">
         <List className="w-6 h-6 text-green-600" />
      </div>

      <h2 className="font-bold mt-4 text-xl text-gray-800 text-center">Your AI Interview Is Ready!</h2>
      <p className="mt-2 text-sm text-gray-600 text-center">
        Share this link with your candidate to start the interview process.
      </p>
      
      {/* Interview Link Box */}
      <div className="w-full p-5 sm:p-7 mt-6 rounded-xl bg-white shadow-lg border border-gray-100">
        <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center mb-3">
          <h2 className="font-bold text-lg mb-2 sm:mb-0">Interview Link</h2>
          <h2 className="p-1 px-3 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full whitespace-nowrap">
            Valid for 30 Days
          </h2>
        </div>
        
        {/* Input and Copy Button Group */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            className="flex-grow min-w-0" // Ensure input takes space
            defaultValue={GetInterviewUrl()} 
            disabled={true} 
          />
          <Button onClick={handleCopy} className="whitespace-nowrap flex items-center justify-center">
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
        
        <hr className="my-5 border-t border-gray-200" />
        
        {/* Interview Details */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <h2 className="text-sm text-gray-600 flex gap-2 items-center">
            <Clock className="h-4 w-4 text-blue-500" />
            Duration: <b>{formData?.duration || 'N/A'}</b>
          </h2>
          <h2 className="text-sm text-gray-600 flex gap-2 items-center">
            <List className="h-4 w-4 text-blue-500" />
            Questions: <b>?</b>
          </h2>
        </div>
      </div>
      
      {/* Share Via Section */}
      <div className="mt-5 bg-white p-5 rounded-xl shadow-lg border border-gray-100 w-full">
        <h2 className="font-bold mb-4 text-gray-800">Share Via</h2>
        <div className="grid grid-cols-3 gap-3"> {/* Use grid for even spacing/distribution */}
          <Button variant={"outline"} className="flex flex-col h-auto py-3">
            <Mail className="h-5 w-5 mb-1" />
            <span className="text-xs">Email</span>
          </Button>
          <Button variant={"outline"} className="flex flex-col h-auto py-3">
            <Mail className="h-5 w-5 mb-1" />
            <span className="text-xs">Slack</span>
          </Button>
          <Button variant={"outline"} className="flex flex-col h-auto py-3">
            <Mail className="h-5 w-5 mb-1" />
            <span className="text-xs">Whatsapp</span>
          </Button>
        </div>
      </div>
      
      {/* Navigation Buttons (Back/New) */}
      <div className="mt-8 mb-5 flex flex-col-reverse sm:flex-row justify-between w-full gap-3">
        {/* Replaced Link with standard <a> tag wrapped around Button */}
        <a href={"/dashboard"} className="w-full sm:w-auto">
          <Button variant={"outline"} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </a>
        {/* Replaced Link with standard <a> tag wrapped around Button */}
        <a href={"/dashboard/create-interview"} className="w-full sm:w-auto">
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Create New Interview
          </Button>
        </a>
      </div>
    </div>
  );
}

export default InterviewLink;
