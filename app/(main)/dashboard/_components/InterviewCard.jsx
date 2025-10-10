
// "use client";
// import React, { useState } from "react";
// import { format } from "date-fns";
// import { Copy, Send, Check, ArrowRight, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/services/supabaseClient";
// import Link from "next/link"; 
// import { toast } from "sonner";

// const InterviewCard = ({ interview, viewdetail = false }) => {
//   const [isCopied, setIsCopied] = useState(false);

//   const copyLink = () => {
//     const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_Id}`;
//     navigator.clipboard.writeText(url); 

//     setIsCopied(true);

//     setTimeout(() => {
//       setIsCopied(false);
//     }, 3000);
//   };

// async function deleteInterview() {
//   const { error } = await supabase
//     .from('Interview')
//     .delete()
//     .eq('id', interview?.id);

//   if (error) {
//     console.error('Error deleting data:', error);
//     toast.error('Delete Candidate List Then Try Again!');
//     return false;
//   }

//   console.log('Data deleted successfully!');
//   // Handle success (e.g., update the UI)
//   return true;
// }

//  const isDeletable = (interview["interview-feedback"]?.length || 0) === 0;

//   const onSend = () => {
//     window.location.href = `mailto:?subject=AI Interview Link&body=Here is your AI interview link: ${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_Id}`;
//   };

//   const formattedDate = interview?.created_at
//     ? format(new Date(interview?.created_at), "dd MMM yyyy")
//     : "";

//   return (
//     <div className="p-4 sm:p-5 rounded-lg bg-white border flex flex-col h-full shadow-sm relative overflow-hidden">
//       {isDeletable && (
//         <div className="absolute top-3 right-3 z-10"> 
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => deleteInterview(interview?.interview_Id)}
//             className="text-red-500 hover:text-red-700 hover:bg-red-50"
//           >
//             <Trash2 className="h-5 w-5" />
//           </Button>
//         </div>
//       )}

//       <div className="flex-grow min-w-0">
//         <div className="flex items-center justify-between pr-10">
//           <div className="h-[40px] w-[40px] bg-primary rounded-full shrink-0"></div> 
//           <h2 className="text-xs text-gray-500 whitespace-nowrap">{formattedDate}</h2>
//         </div>
        

//         <h2 className="text-lg font-bold mt-3 truncate">{interview?.jobPosition}</h2>
        
//         <h2 className="font-normal text-gray-500 flex justify-between mt-3 text-sm min-w-0">

//           <span className="truncate mr-2">{interview?.duration}</span> 

//           <span className="text-green-700 whitespace-nowrap shrink-0">
//             {interview["interview-feedback"]?.length} Candidates
//           </span>
//         </h2>
//       </div>
      
//       <div className="flex flex-col gap-3 w-full mt-5">
//         {viewdetail ? (

//           <Link
//             href={`/scheduled-interview/${interview?.interview_Id}/Details`}
//             className="w-full"
//           >
//             <Button className="w-full" variant={"outline"}>
//               View Details
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </Link>
//         ) : (

//           <>
//             <div className="flex gap-2 sm:gap-3 w-full"> 
//               <Button
//                 variant={"outline"}
//                 className={"flex-1 text-xs sm:text-sm"} 
//                 onClick={copyLink}
//                 disabled={isCopied}
//               >
//                 {isCopied ? (
//                   <>
//                     <Check className="mr-1 sm:mr-2 h-4 w-4 text-green-500" /> <span className="hidden sm:inline">Copied!</span> <span className="sm:hidden">Copied</span>
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="mr-1 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Copy Link</span> <span className="sm:hidden">Copy</span>
//                   </>
//                 )}
//               </Button>
//               <Button className={"flex-1 text-xs sm:text-sm"} onClick={onSend}> 
//                 <Send className="mr-1 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Send</span> <span className="sm:hidden">Send</span>
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;






"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Copy, Send, Check, ArrowRight, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link"; 
import { toast } from "sonner";

const InterviewCard = ({ interview, viewdetail = false }) => {
  const [isCopied, setIsCopied] = useState(false);

  // --- Logic Functions (Unchanged) ---
  const copyLink = () => {
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_Id}`;
    navigator.clipboard.writeText(url); 
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  async function deleteInterview() {
    const { error } = await supabase
      .from('Interview')
      .delete()
      .eq('id', interview?.id);

    if (error) {
      console.error('Error deleting data:', error);
      toast.error('Delete Candidate List Then Try Again!');
      return false;
    }
    toast.success('Interview deleted successfully!');
    // Note: You might need a way to refresh the parent list here
    return true;
  }

  const isDeletable = (interview["interview-feedback"]?.length || 0) === 0;

  const onSend = () => {
    window.location.href = `mailto:?subject=AI Interview Link&body=Here is your AI interview link: ${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_Id}`;
  };

  const formattedDate = interview?.created_at
    ? format(new Date(interview?.created_at), "dd MMM yyyy")
    : "";
  // --- End Logic Functions ---

  return (
    <div className="p-5 rounded-xl bg-white border border-gray-100 flex flex-col h-full 
                    shadow-lg shadow-gray-100/50 
                    transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-100/50 
                    group relative overflow-hidden">
      
      {/* Delete Button */}
      {isDeletable && (
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 
          <Button
            variant="ghost"
            size="icon"
            onClick={deleteInterview}
            className="text-red-500 hover:text-red-600 bg-white hover:bg-red-50 rounded-full"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex-grow min-w-0">
        
        {/* Top Info */}
        <div className="flex items-center justify-between pr-12">
          {/* Accent Icon Placeholder */}
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <Video className="h-5 w-5 text-blue-600" />
          </div> 
          
          <h2 className="text-xs font-medium text-gray-500 whitespace-nowrap tracking-wider">{formattedDate}</h2>
        </div>
        

        {/* Position Title */}
        <h2 className="text-xl font-extrabold text-gray-900 mt-4 truncate tracking-tight">{interview?.jobPosition}</h2>
        
        {/* Stats Line */}
        <div className="flex justify-between items-center mt-3 text-sm min-w-0 border-b pb-4 border-gray-100">

          <span className="text-gray-500 truncate mr-3 font-medium">
            Duration: <span className="text-gray-700 font-semibold">{interview?.duration}</span>
          </span> 

          <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            {interview["interview-feedback"]?.length} Candidates
          </span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full mt-5">
        
        {viewdetail ? (
          // --- View Details State ---
          <Link
            href={`/scheduled-interview/${interview?.interview_Id}/Details`}
            className="w-full"
          >
            <Button className="w-full text-base font-semibold py-6 bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-none transition duration-300" variant={"outline"}>
              View Candidate Feedback
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          // --- Share/Copy State ---
          <div className="flex gap-3 w-full"> 
            
            {/* Copy Button */}
            <Button
              variant={"outline"}
              className={`flex-1 text-sm font-semibold py-6 transition duration-300 
                          ${isCopied ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' : 'text-blue-600 border-blue-200 hover:bg-blue-50'}`} 
              onClick={copyLink}
              disabled={isCopied}
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy Link
                </>
              )}
            </Button>
            
            {/* Send Button (Primary) */}
            <Button className="flex-1 text-sm font-semibold py-6 bg-blue-600 hover:bg-blue-700 transition duration-300" onClick={onSend}> 
              <Send className="mr-2 h-4 w-4" /> Send Link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;