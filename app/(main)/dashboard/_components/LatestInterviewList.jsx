
"use client"
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/services/supabaseClient';
import InterviewCard from './InterviewCard';

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
        return <div className="my-5">Loading user...</div>;
    }

    return (
        <div className="my-5">  

            {interviewList.length === 0 &&
                <div className="p-5 flex flex-col gap-3 bg-white rounded-2xl border border-gray-200 items-center mt-5">
                    <Video className="h-10 w-10 text-primary" />
                    <h2 className="text-base font-medium text-gray-700">You Don't Have Any Interviews Created</h2>
                    <Button asChild>
                        <Link href="/dashboard/create-interview">+ Create New Interview</Link>
                    </Button>
                </div>}
             
                {interviewList && interviewList.length > 0 &&
          
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
                        {interviewList.map((interview, index) => (
                            <InterviewCard interview={interview} key={index}/>
                        ))}
                </div>}
            
        </div>
    );
}

export default LatestInterviewList;
