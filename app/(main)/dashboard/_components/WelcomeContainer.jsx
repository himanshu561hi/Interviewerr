"use client"
import React, { useContext } from 'react';
import Image from 'next/image'; // Next.js Image Component
import { useRouter } from 'next/navigation'; // Next.js App Router Hook
import { LogOut, Menu, LayoutDashboard, Calendar, Users } from 'lucide-react'; // Added icons for menu
import { DashboardContext } from '../../provider'; // Context Provider
import { supabase } from '@/services/supabaseClient'; // Supabase Client
import { Button } from '@/components/ui/button'; // Button Component
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'; // Dropdown Menu Components

export default function WelcomeContainer() {
    const { userDetails, loading } = useContext(DashboardContext);
    const router = useRouter(); 

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth');
    };

    if (loading) {
        return (
            <div className="bg-white shadow-md p-4 sm:p-6 mt-6 mx-4 sm:mx-6 md:mx-10 rounded-xl flex items-center justify-center min-h-[100px]">
                <p className="text-gray-600">Loading user data...</p>
            </div>
        );
    }
    
    if (!userDetails) {
        return null;
    }
    return (
        <div className="bg-white shadow-lg p-4 sm:p-6 mt-6 mx-4 sm:mx-6 md:mx-10 rounded-xl">
            
            <div className="hidden md:flex justify-between items-center gap-6">
                
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 truncate">
                        Welcome Back! {userDetails?.name}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 mt-0.5">
                        AI-Driven interviews, hassle-free hiring.
                    </p>
                </div>
                
                {userDetails && (
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <Image 
                            src={userDetails?.profile_image} 
                            alt="Profile Image" 
                            width={48} 
                            height={48} 
                            className="rounded-full object-cover w-12 h-12 border-2 border-indigo-500/50"
                            unoptimized 
                        />
                        <LogOut 
                            className="cursor-pointer h-6 w-6 text-gray-500 hover:text-red-600 transition duration-150"
                            onClick={handleLogout}
                            title="Logout"
                        />
                    </div>
                )}
            </div>


            <div className="md:hidden flex justify-between items-center w-full">
                
                <div className="flex items-center gap-3 min-w-0">
                    {userDetails && (
                        <Image 
                            src={userDetails?.profile_image} 
                            alt="Profile Image" 
                            width={36} // Smaller size for mobile
                            height={36} 
                            className="rounded-full object-cover w-9 h-9 border-2 border-indigo-500/50 flex-shrink-0"
                            unoptimized 
                        />
                    )}
                    <div className="flex flex-col min-w-0">
                        <h2 className="text-base font-bold text-gray-800 truncate">
                            Hi, {userDetails?.name.split(' ')[0] || 'User'}! {/* Only show first name */}
                        </h2>
                        <p className="text-xs text-gray-500 truncate">
                            Ready to hire?
                        </p>
                    </div>
                </div>

                <div className="flex items-center flex-shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Navigation Menu">
                                <Menu className="h-6 w-6 text-gray-700" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60 shadow-lg">
                            
                            {/* Option 1: Dashboard */}
                            <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </DropdownMenuItem>

                            {/* Option 2: Scheduled Interview */}
                            <DropdownMenuItem onClick={() => router.push('/scheduled-interview')} className="cursor-pointer">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Scheduled Interviews</span>
                            </DropdownMenuItem>
                            
                            {/* Option 3: All Interview */}
                            <DropdownMenuItem onClick={() => router.push('/all-interview')} className="cursor-pointer">
                                <Users className="mr-2 h-4 w-4" />
                                <span>All Interviews</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Option 4: Logout */}
                            <DropdownMenuItem 
                                onClick={handleLogout} 
                                className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </div>
    );
}