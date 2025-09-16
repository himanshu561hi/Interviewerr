"use client"
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React from 'react';
import { useState } from 'react';


function LatestInterviewList() {
    const [interviewList, setInterviewList] = useState([]);
    return (
        <div className="my-5">  
            {interviewList.length === 0 &&
            <div className="p-5 flex flex-col gap-3 items-center mt-5">
                <Video className="h-10 w-10 text-primary "/>
                <h2>You Don't Have Any Interviews Created</h2>
                <Button>+ Create New Interview</Button>
                </div>}
        </div>
    );
}
export default LatestInterviewList;