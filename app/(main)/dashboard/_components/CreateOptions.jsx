"use client"
import React from 'react';
import { Video } from 'lucide-react';
import { Phone } from 'lucide-react';
import Link from 'next/link' 
function CreateOptions() {
    return (
        <div className="grid grid-cols-2 gap-5">      
            <div className="bg-white p-5 border rounded-xl cursor-pointer hover:shadow-lg transition">
                <Link href={"/dashboard/create-interview"} className="bg-whhie">
                    <Video className="p-3 text-primary bg-blue-50 rounded-lg w-12 h-12"/>
                    <h2 className="font-bold mt-3">Create New Interview</h2>
                    <p className="text-gray-500">Create AI Interviews and Schedule then with Candidates</p>
                </Link>
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-xl cursor-pointer hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                <Phone className="p-3 text-primary bg-blue-50 rounded-lg w-12 h-12"/>
                <h2 className="font-bold text-gray-500 mr-10">Coming Soon</h2>
                </div>
                <h2 className="font-bold mt-3">Create Phone Screening Call</h2>
                <p className="text-gray-500">Schedule phone screening call with candidates</p>
            </div>
        </div>
    );
}
export default CreateOptions;