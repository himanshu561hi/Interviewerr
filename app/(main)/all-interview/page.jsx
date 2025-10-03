
// "use client"
// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Video } from 'lucide-react';
// import Link from 'next/link';
// import { useUser } from '@/app/provider'; // Using the consistent provider path
// import { supabase } from '@/services/supabaseClient';
// import InterviewCard from '../dashboard/_components/InterviewCard';

// function AllInterview() { 
//     const [interviewList, setInterviewList] = useState([]);
//     const { user, loading } = useUser(); // Changed isLoading to loading to match provider

//     useEffect(() => {
//         if (user && !loading) { // Changed isLoading to loading
//             getInterviewList();
//         }
//     }, [user, loading]); // Changed isLoading to loading

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

//     if (loading) { // Changed isLoading to loading
//         return <div className="my-5 text-center">Loading user data...</div>;
//     }

//     return (
//         <div className="">
//             <h2 className="font-bold text-2xl mb-8">All Previously Created Interviews</h2>
//             {interviewList.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                     {interviewList.map((interview) => (
//                         <InterviewCard interview={interview} key={interview.id} /> 
//                     ))}
//                 </div>
//             ) : (
//                 <div className="p-5 flex flex-col gap-3 bg-white rounded-2xl border border-gray-200 items-center mt-5">
//                     <Video className="h-10 w-10 text-primary" />
//                     <h2 className="font-bold">No Interviews Found</h2>
//                     <p className="text-sm text-gray-500">You haven't created any interviews yet.</p>
//                     <Button asChild className="mt-2">
//                         <Link href="/dashboard/create-interview">+ Create New Interview</Link>
//                     </Button>
//                 </div>
//             )}
//         </div>
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
        return <div className="my-5 text-center">Loading user data...</div>;
    }

    return (
        // Use a React Fragment to return both the content and the footer
        <>
            <div className="flex-grow p-5 mb-10"> {/* Added p-5 for spacing consistency */}
                <h2 className="font-bold text-2xl mb-8">All Previously Created Interviews</h2>
                {interviewList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {interviewList.map((interview) => (
                            <InterviewCard interview={interview} key={interview.id} /> 
                        ))}
                    </div>
                ) : (
                    <div className="p-5 flex flex-col gap-3 bg-white rounded-2xl border border-gray-200 items-center mt-5">
                        <Video className="h-10 w-10 text-primary" />
                        <h2 className="font-bold">No Interviews Found</h2>
                        <p className="text-sm text-gray-500">You haven't created any interviews yet.</p>
                        <Button asChild className="mt-2">
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