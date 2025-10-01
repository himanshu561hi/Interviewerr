// // InterviewCard.js
// import React from 'react';
// import { format } from 'date-fns'; // Import karein
// import { Copy, Send, Timer } from 'lucide-react';
// import { Button } from '@/components/ui/button';


// const InterviewCard = ({ interview }) => {

//     const copyLink = () => {
//         const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_Id
//             navigator.clipboard.writeText(url);
//         }

//     // created_at ko format karein
//     const formattedDate = interview?.created_at 
//         ? format(new Date(interview.created_at), 'dd MMM yyyy') 
//         : ''; 

//     return (
//         <div className="p-5 rounded-lg bg-white border">
//             <div className="flex items-center justify-between">
//                 <div className="h-[40px] w-[40px] bg-primary rounded-full">
                    
//                 </div>
//                 <h2 className="text-sm">{formattedDate}</h2>
//             </div>
//             <h2 className="text-lg font-bold mt-3">{interview?.jobPosition}</h2>
         
//             <h2 className="font-normal gap-3 text-sm text-gray-600">{interview?.duration}</h2>
//             <div className="flex gap-3 w-full mt-5">
//                 {/* `w-full` ko `flex-1` se replace karein */}
//                 <Button variant={'outline'} className={"flex-1"} onClick={copyLink}>
//                     <Copy className="mr-2 h-4 w-4"/>Copy Link
//                 </Button>
//                 <Button className={"flex-1"}>
//                     <Send className="mr-2 h-4 w-4"/>Send
//                 </Button>
//             </div>

//         </div>
//     );   
// };

// export default InterviewCard;

// InterviewCard.js
import React, { useState } from 'react'; // Step 1: useState ko import karein
import { format } from 'date-fns';
import { Copy, Send, Check } from 'lucide-react'; // Step 2: 'Check' icon import karein
import { Button } from '@/components/ui/button';

const InterviewCard = ({ interview }) => {
    // Step 3: Button ke text ko manage karne ke liye state banayein
    const [isCopied, setIsCopied] = useState(false);

    const copyLink = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_Id;
        navigator.clipboard.writeText(url);
        
        // Step 4: State ko 'true' set karein
        setIsCopied(true);

        // Step 5: 3 second ke baad state ko wapas 'false' set kar dein
        setTimeout(() => {
            setIsCopied(false);
        }, 3000); 
    };

    const onSend =()=> {
        window.location.href="mailto:himanshu561hi@gmail.com?subject=AI Interview Link & body=Interview Link:"+process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_Id;
    }

    const formattedDate = interview?.created_at 
        ? format(new Date(interview.created_at), 'dd MMM yyyy') 
        : ''; 

    return (
        <div className="p-5 rounded-lg bg-white border flex flex-col h-full">
            <div className="flex-grow">
                <div className="flex items-center justify-between">
                    <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
                    <h2 className="text-sm">{formattedDate}</h2>
                </div>
                <h2 className="text-lg font-bold mt-3">{interview?.jobPosition}</h2>
                <h2 className="font-normal text-sm text-gray-600">{interview?.duration} Min</h2>
            </div>
            <div className="flex gap-3 w-full mt-5">
                <Button variant={'outline'} className={"flex-1"} onClick={copyLink} disabled={isCopied}>
                    {/* Step 6: State ke adhar par text aur icon badlein */}
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
        </div>
    );   
};

export default InterviewCard;

