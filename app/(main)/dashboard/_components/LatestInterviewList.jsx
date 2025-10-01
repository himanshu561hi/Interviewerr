
"use client"
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser'; // Adjust path if needed
import { supabase } from '@/services/supabaseClient';

function LatestInterviewList() {
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
            .eq('email', user?.email);

        if (error) {
            console.error('Error fetching interviews:', error);
            return;
        }

        console.log('Fetched Interview data:', Interview);
        setInterviewList(Interview || []);
    }

    console.log('Component rendered - interviewList length:', interviewList.length);

    if (isLoading) {
        return <div className="my-5">Loading user...</div>;
    }

    return (
        <div className="my-5">  
            {interviewList.length === 0 ? (
                <div className="p-5 flex flex-col gap-3 bg-white rounded-2xl border border-gray-200 items-center mt-5">
                    <Video className="h-10 w-10 text-primary" />
                    <h2>You Don't Have Any Interviews Created</h2>
                    <Button asChild>
                        <Link href="/dashboard/create-interview">+ Create New Interview</Link>
                    </Button>
                </div>
            ) : (
                <div className="p-5 bg-white rounded-2xl border border-gray-200">
                    <h2>Latest Interviews</h2>
                    <ul className="mt-4 space-y-2">
                        {interviewList.map((interview, index) => (
                            <li key={interview.id || index} className="p-2 border-b last:border-b-0">
                                {interview.title || `Interview ${index + 1}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LatestInterviewList;