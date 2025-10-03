
"use client"
import React from 'react';
import Link from 'next/link' 
import { Video, Phone } from 'lucide-react'; 

function CreateOptions() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">      

            <div className="bg-white p-5 border rounded-xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out">

                <Link href={"/dashboard/create-interview"} className="block h-full">

                    <Video className="p-3 text-blue-600 bg-blue-50 rounded-lg w-12 h-12"/>
                    <h2 className="font-bold mt-4 text-lg">Create New Interview</h2>
                    <p className="text-gray-500 text-sm mt-1">Create AI Interviews and Schedule them with Candidates.</p>
                </Link>
            </div>
            

            <div className="bg-white p-5 border border-gray-200 rounded-xl cursor-not-allowed opacity-70">
                <div className="flex items-center justify-between">

                    <Phone className="p-3 text-purple-600 bg-purple-50 rounded-lg w-12 h-12"/>
                    <h2 className="font-bold text-gray-500 text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-full">
                        Coming Soon
                    </h2>
                </div>
                <h2 className="font-bold mt-4 text-lg">Create Phone Screening Call</h2>
                <p className="text-gray-500 text-sm mt-1">Schedule phone screening call with candidates.</p>
            </div>
        </div>
    );
}

export default CreateOptions;
