"use client"
import React, { useState, useEffect } from 'react'; // Standard React import

import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser'; // Adjust path if needed
import { supabase } from '@/services/supabaseClient';
import InterviewCard from '../dashboard/_components/InterviewCard';

// FIX 1: Component name must be in PascalCase (e.g., AllInterview instead of allInterview)
function AllInterview() { 
    const [interviewList, setInterviewList] = useState([]);
    const { user, isLoading } = useUser();

    useEffect(() => {
        // Fetch interviews only when user data is available and not loading
        if (user && !isLoading) {
            getInterviewList();
        }
    }, [user, isLoading]);

    const getInterviewList = async () => {
        console.log('Fetching interviews for email:', user?.email);
        
        // Ensure user and user.email exist before making the query
        if (!user?.email) {
            console.log('User email is not available, skipping fetch.');
            return;
        }

        const { data, error } = await supabase
            .from('Interview')
            .select('*')
            .eq('email', user.email)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching interviews:', error);
            // Optionally, you could set an error state here to show in the UI
            return;
        }

        console.log('Fetched Interview data:', data);
        setInterviewList(data || []);
    }

    if (isLoading) {
        return <div className="my-5 text-center">Loading user data...</div>;
    }

    return (
        <div className="">
            <h2 className="my-3 font-bold ml-3 text-2xl">All Previously Created Interviews</h2>
            {/* FIX 2: Check if the list has items to decide what to render. This is clearer. */}
            {interviewList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {interviewList.map((interview) => (
                        // FIX 3: Use a unique and stable ID from your data as the key, not the index.
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
    );
}

export default AllInterview;