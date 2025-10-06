
// "use client"
// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Video } from 'lucide-react';
// import Link from 'next/link';
// import { useUser } from '@/app/provider'; // Using the consistent provider path
// import { supabase } from '@/services/supabaseClient';
// import InterviewCard from '../dashboard/_components/InterviewCard';
// import Footer from "@/app/(main)/footer/page"; // Import the Footer component

// function AllInterview() { 
//     const [interviewList, setInterviewList] = useState([]);
//     const { user, loading } = useUser(); // Using the correct variable name 'loading'

//     useEffect(() => {
//         if (user && !loading) {
//             getInterviewList();
//         }
//     }, [user, loading]);

//     const getInterviewList = async () => {
//         if (!user?.email) {
//             return;
//         }

//         const { data, error } = await supabase
//             .from('Interview')
//             .select('*, interview-feedback(userEmail)')
//             .eq('email', user.email) // Matching the dashboard query logic
//             .order('id', { ascending: false });

//         if (error) {
//             console.error('Error fetching all interviews:', error);
//             setInterviewList([]);
//             return;
//         }

//         setInterviewList(data || []);
//     }

//     if (loading) {
//         return <div className="my-5 text-center">Loading user data...</div>;
//     }

//     return (
//         // Use a React Fragment to return both the content and the footer
//         <>
//             <div className="flex-grow p-5 mb-10"> {/* Added p-5 for spacing consistency */}
//                 <h2 className="font-bold text-2xl mb-8">All Previously Created Interviews</h2>
//                 {interviewList.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                         {interviewList.map((interview) => (
//                             <InterviewCard interview={interview} key={interview.id} /> 
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="p-5 flex flex-col gap-3 bg-white rounded-2xl border border-gray-200 items-center mt-5">
//                         <Video className="h-10 w-10 text-primary" />
//                         <h2 className="font-bold">No Interviews Found</h2>
//                         <p className="text-sm text-gray-500">You haven't created any interviews yet.</p>
//                         <Button asChild className="mt-2">
//                             <Link href="/dashboard/create-interview">+ Create New Interview</Link>
//                         </Button>
//                     </div>
//                 )}
//             </div>
//             {/* Footer added to the bottom of the component */}
//             <Footer />
//         </>
//     );
// }

// export default AllInterview;







"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/app/provider'; // Using the consistent provider path
import { supabase } from '@/services/supabaseClient';
import InterviewCard from '../dashboard/_components/InterviewCard';
import Footer from "@/app/(main)/footer/page"; // Import the Footer component

function AllInterview() { 
    const [interviewList, setInterviewList] = useState([]);
    const { user, loading } = useUser(); // Using the correct variable name 'loading'

    useEffect(() => {
        if (user && !loading) {
            getInterviewList();
        }
    }, [user, loading]);

    const getInterviewList = async () => {
        if (!user?.email) {
            return;
        }

        const { data, error } = await supabase
            .from('Interview')
            .select('*, interview-feedback(userEmail)')
            .eq('email', user.email) // Matching the dashboard query logic
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching all interviews:', error);
            setInterviewList([]);
            return;
        }

        setInterviewList(data || []);
    }

    if (loading) {
        // Simple centered loading message
        return <div className="flex justify-center items-center h-screen text-lg">Loading user data...</div>;
    }

    return (
        // Use a React Fragment to return both the content and the footer
        <>
            {/* Enhanced Responsive Content Container: 
                p-4 (mobile) to p-8 (laptop/desktop) 
                min-h-[80vh] ensures the content area takes up most of the viewport before the footer */}
            <div className="flex-grow sm:p-6 md:p-8 min-h-[80vh] mb-10"> 
                {/* Responsive Heading: text-xl (mobile) to text-3xl (desktop), mb-6/8 */}
                <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-6 md:mb-8">All Previously Created Interviews</h2>
                
                {interviewList.length > 0 ? (
                    // Grid Layout: Excellent for responsiveness. No changes needed here.
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                        {interviewList.map((interview) => (
                            <InterviewCard interview={interview} key={interview.id} /> 
                        ))}
                    </div>
                ) : (
                    // No Interviews State: Increased padding and center alignment
                    <div className="p-8 flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 items-center justify-center mt-5 shadow-lg max-w-lg mx-auto">
                        <Video className="h-12 w-12 text-primary" />
                        <h2 className="font-bold text-lg text-center">No Interviews Found</h2>
                        <p className="text-sm text-gray-500 text-center">You haven't created any interviews yet. Start your practice now!</p>
                        <Button asChild className="mt-3 w-full sm:w-auto">
                            <Link href="/dashboard/create-interview">+ Create New Interview</Link>
                        </Button>
                    </div>
                )}
            </div>
            {/* Footer added to the bottom of the component */}
            <Footer />
        </>
    );
}

export default AllInterview;