"use client"
import React, { useEffect} from 'react';
import { useUser } from '@/app/provider'; 
import { supabase } from '@/services/supabaseClient'

function ScheduledInterview () {
    const { user } = useUser();

    useEffect(() =>{
        user&&GetInterviewList();
    }, [user])

    const GetInterviewList = async ()=> {
        const result = await supabase
          .from('Interview')
  .select('jobPosition,duration,interview_Id,interview-feedback(userEmail)')
  .eq('email', user?.email)
  .order('id',{asceending: false})

console.log(result);
    }

    return (
        <div>
            <h1>Scheduled Interview</h1>
            <p>This is the scheduled interview page.</p>
        </div>
    );
};

export default ScheduledInterview;