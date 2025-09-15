"use client"
import React from 'react';
import { useUser } from '@/app/provider';
import Image from 'next/image';


function WelcomeContainer({ children }) {
    const {user} = useUser();
    return (
        <div className="bg-white p-5 rounded-xl flex justify-between items-center">
            <div>
                <h2 className="text-large font-bold">
                    Welcome Back! {user?.name}
                </h2>
                <p className="text-gray-500">
                    AI-Driven interviews, Hassele-free hiring.
                </p>
            </div>
            {user&& <Image src={user?.profile_image} alt="Profile Image" width={40} height={40} className="rounded-full"/>}
        </div>
    );
}
export default WelcomeContainer;