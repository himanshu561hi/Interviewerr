
// "use client"
// import { Button } from '@/components/ui/button';
// import { Video } from 'lucide-react';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { useUser } from '@/hooks/useUser';
// import { supabase } from '@/services/supabaseClient';
// import InterviewCard from './InterviewCard';

// function LatestInterviewList({interview}) {
//     const [interviewList, setInterviewList] = useState([]);
//     const { user, isLoading } = useUser();

//     useEffect(() => {
//         console.log('useEffect triggered, user:', user);
//         console.log('isLoading:', isLoading);
//         if (user && !isLoading) {
//             GetInterviewList();
//         }
//     }, [user, isLoading]);

//     const GetInterviewList = async () => {
//         console.log('Fetching interviews for email:', user?.email);
//         const { data: Interview, error } = await supabase
//             .from('Interview')
//             .select('*')
//             .eq('email', user?.email)
//             .order('id',{ascending: false}) 
//             .limit('6');

//         if (error) {
//             console.error('Error fetching interviews:', error);
//             return;
//         }

//         console.log('Fetched Interview data:', Interview);
//         setInterviewList(Interview || []);
//     }

//     console.log('Component rendered - interviewList length:', interviewList.length);


//     if (isLoading) {
//         return <div className="my-5">Loading user...</div>;
//     }

//     return (
//         <div className="my-5">  

//             {interviewList.length === 0 &&
//                 <div className="p-5 flex flex-col gap-3 bg-white rounded-2xl border border-gray-200 items-center mt-5">
//                     <Video className="h-10 w-10 text-primary" />
//                     <h2 className="text-base font-medium text-gray-700">You Don't Have Any Interviews Created</h2>
//                     <Button asChild>
//                         <Link href="/dashboard/create-interview">+ Create New Interview</Link>
//                     </Button>
//                 </div>}
//                 {interviewList && interviewList.length > 0 &&
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
//                         {interviewList.map((interview, index) => (
//                             <InterviewCard interview={interview} key={index}/>
//                         ))}
//                 </div>}
            
//         </div>
//     );
// }

// export default LatestInterviewList;



"use client"
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/services/supabaseClient';
import InterviewCard from './InterviewCard'; // Assuming InterviewCard is well-designed

function LatestInterviewList({interview}) {
    const [interviewList, setInterviewList] = useState([]);
    const { user, isLoading } = useUser();

    useEffect(() => {
        console.log('useEffect triggered, user:', user);
        console.log('isLoading:', isLoading);
        if (user && !isLoading) {
            GetInterviewList();
        }
    }, [user, isLoading]);

    const GetInterviewList = async () => {
        console.log('Fetching interviews for email:', user?.email);
        const { data: Interview, error } = await supabase
            .from('Interview')
            .select('*')
            .eq('email', user?.email)
            .order('id',{ascending: false}) 
            .limit('6');

        if (error) {
            console.error('Error fetching interviews:', error);
            return;
        }

        console.log('Fetched Interview data:', Interview);
        setInterviewList(Interview || []);
    }

    console.log('Component rendered - interviewList length:', interviewList.length);


    if (isLoading) {
        // Enhanced Loading State
        return (
            <div className="my-8">
                <div className="h-6 w-1/4 mb-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="p-8 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-8">
            
            {/* --- Section Header --- */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Latest Interviews
                </h2>
                {interviewList.length > 0 && (
                    <Link href="/all-interview" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition duration-300">
                        View All (
                        {/* Placeholder for total count, ideally fetched from DB */}
                        {interviewList.length}
                        )
                    </Link>
                )}
            </div>
            
            {/* --- Conditional Rendering for Empty State --- */}
            {interviewList.length === 0 &&
                <div className="p-16 flex flex-col gap-6 bg-white rounded-3xl border border-blue-100 items-center justify-center text-center shadow-2xl shadow-blue-100/50">
                    
                    {/* Icon Container with Accent */}
                    <div className="p-4 bg-blue-100 rounded-full">
                        <Video className="h-10 w-10 text-blue-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Time to Create Your First Interview!
                    </h2>
                    
                    <p className="text-gray-500 text-base max-w-md">
                        There are no AI interviews here yet. Click the button to start designing a professional screening process.
                    </p>

                    {/* Button - Using a bolder, slightly more prominent button style */}
                    <Button asChild size="lg" className="px-10 py-3 font-semibold text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 transition duration-300 transform hover:scale-[1.02]">
                        <Link href="/dashboard/create-interview">+ Create New Interview</Link>
                    </Button>
                </div>}
            
            {/* --- Conditional Rendering for List State --- */}
            {interviewList && interviewList.length > 0 &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {/* InterviewCard is assumed to follow the premium theme */}
                        {interviewList.map((interview, index) => (
                            <InterviewCard interview={interview} key={index}/>
                        ))}
                </div>}
            
        </div>
    );
}

export default LatestInterviewList;