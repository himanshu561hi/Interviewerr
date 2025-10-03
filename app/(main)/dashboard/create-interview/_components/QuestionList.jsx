
// "use client"
// import { Button } from '@/components/ui/button';
// import { Loader2, Loader2Icon } from 'lucide-react';
// // useEffect ko yahan import karein
// import { React, useState, useEffect } from 'react';
// import { supabase } from '@/services/supabaseClient';
// import { v4 as uuidv4 } from 'uuid';
// import { toast } from "sonner";
// import QuestionListContainer from './QuestionListContainer';

// function QuestionList({ questions, loading, formData, onFinish, onCreateLink }) {

//   // user state ko null se initialize karna behtar hai
//   const [user, setUserDetails] = useState(null);
//   const [saveLoading, setSaveLoading] = useState(false);

//   // useEffect hook add karein
//   useEffect(() => {
//     // Ek function banayein user data fetch karne ke liye
//     const fetchUser = async () => {
//       try {
//         const { data: { user } } = await supabase.auth.getUser();
//         if (user) {
//           // Agar user mil jaaye toh state me set karein
//           setUserDetails(user);
//         } else {
//           console.log("No user is logged in.");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleFinish = async () => {
//     if (!user) {
//         toast.error("User details not found. Please log in again.");
//         return;
//     }

//     if (!questions.length || !formData.jobPosition) {
//       toast.error("No questions or form data available to save.");
//       return;
//     }

//     try {
//       setSaveLoading(true);
//       const interview_Id = uuidv4();
//       const { data, error } = await supabase
//         .from('Interview')
//         .insert([
//           {
//             ...formData,
//             questionList: questions,
//             email: user.email,
//             name: user.user_metadata?.full_name || user.email,
//             interview_Id: interview_Id,

//           },
//         ])
//         .select();
          

//       setSaveLoading(false);
//       onCreateLink(interview_Id);

//       if (error) {
//         console.error("Supabase insert error:", error);
//         toast.error("Failed to save the interview.");
//       } else {
//         console.log("Data saved successfully:", data);
//         toast.success("Interview saved successfully!");
//         if (onFinish) {
//           onFinish();
//         }
//       }
//     } catch (err) {
//       setSaveLoading(false); 
//       console.error("An unexpected error occurred:", err);
//       toast.error("An unexpected error occurred.");
//     }
//   };

//   return (
//     <div className="container bg-white pb-10 rounded-2xl m-5 px-4 py-1">
//       {loading && (
//         <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md border border-blue-200 flex items-center space-x-4 animate-pulse">
//           <Loader2Icon className="h-8 w-8 text-blue-500 animate-spin" />
//           <div>
//             <h2 className="text-xl font-semibold text-blue-800">Generating Interview Questions</h2>
//             <p className="text-sm text-blue-600">Our AI is crafting personalized questions based on your job position and description.</p>
//           </div>
//         </div>
//       )}
//       {!loading && questions.length > 0 && (
//         <div className="mt-5">
//           <QuestionListContainer questions={questions} />
//         </div>
//       )}
//       <div className="flex justify-end mt-10">
//         <Button onClick={handleFinish} disabled={saveLoading || !user}>
//           {saveLoading && <Loader2 className="animate-spin" />}
//           Create Interview Link & Finish
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default QuestionList;



"use client"
import { Button } from '@/components/ui/button';
import { Loader2, Loader2Icon } from 'lucide-react';
// useEffect ko yahan import karein
import React, { useState, useEffect } from 'react'; // React import ko sahi tareeke se destructure kiya
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import QuestionListContainer from './QuestionListContainer';

function QuestionList({ questions, loading, formData, onFinish, onCreateLink }) {

  // user state ko null se initialize karna behtar hai
  const [user, setUserDetails] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // useEffect hook add karein
  useEffect(() => {
    // Ek function banayein user data fetch karne ke liye
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Agar user mil jaaye toh state me set karein
          setUserDetails(user);
        } else {
          console.log("No user is logged in.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleFinish = async () => {
    if (!user) {
        toast.error("User details not found. Please log in again.");
        return;
    }

    if (!questions.length || !formData.jobPosition) {
      toast.error("No questions or form data available to save.");
      return;
    }

    try {
      setSaveLoading(true);
      const interview_Id = uuidv4();
      const { data, error } = await supabase
        .from('Interview')
        .insert([
          {
            ...formData,
            questionList: questions,
            email: user.email,
            name: user.user_metadata?.full_name || user.email,
            interview_Id: interview_Id,

          },
        ])
        .select();
          

      setSaveLoading(false);
      onCreateLink(interview_Id);

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Failed to save the interview.");
      } else {
        console.log("Data saved successfully:", data);
        toast.success("Interview saved successfully!");
        if (onFinish) {
          onFinish();
        }
      }
    } catch (err) {
      setSaveLoading(false); 
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    // Responsive Container: m-2 (mobile) to m-5 (laptop), px-4 (mobile) to px-8 (laptop)
    <div className="container bg-white pb-10 rounded-2xl m-2 md:m-5 px-4 md:px-8 py-1 shadow-lg">
      {loading && (
        // Responsive Loading State: p-4 (mobile) to p-6 (laptop), flex-col (mobile) to flex-row (laptop)
        <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md border border-blue-200 flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 animate-pulse">
          <Loader2Icon className="h-6 w-6 md:h-8 md:w-8 text-blue-500 animate-spin" />
          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-xl font-semibold text-blue-800">Generating Interview Questions</h2>
            <p className="text-xs md:text-sm text-blue-600">Our AI is crafting personalized questions based on your job position and description.</p>
          </div>
        </div>
      )}
      {!loading && questions.length > 0 && (
        <div className="mt-5">
          {/* QuestionListContainer will need its own internal responsiveness */}
          <QuestionListContainer questions={questions} />
        </div>
      )}
      {/* Responsive Button Section: mt-8 (mobile) to mt-10 (laptop) */}
      <div className="flex justify-center md:justify-end mt-8 md:mt-10">
        <Button 
          onClick={handleFinish} 
          disabled={saveLoading || !user}
          className="w-full md:w-auto text-sm md:text-base py-3 px-6" // Full width on mobile, auto width on laptop
        >
          {saveLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  )
}

export default QuestionList;