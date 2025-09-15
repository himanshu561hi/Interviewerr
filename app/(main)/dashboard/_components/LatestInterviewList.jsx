"use client"
import React from 'react';
import { useState } from 'react';


function LatestInterviewList() {
    const [interviewList, setInterviewList] = useState([]);
    return (
        <div className="grid mt-5 grid-cols-3 gap-5">  
            <div className="bg-white p-5 border rounded-xl cursor-pointer hover:shadow-lg transition">
                <h2 className="font-bold mt-3">Interview 1</h2>
               
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-xl cursor-pointer hover:shadow-lg transition">
                <h2 className="font-bold mt-3">Interview 2</h2>
                
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-xl cursor-pointer hover:shadow-lg transition">
                <h2 className="font-bold mt-3">Interview 3</h2>
                
            </div>
        </div>
    );
}
export default LatestInterviewList;