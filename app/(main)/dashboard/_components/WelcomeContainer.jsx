// "use client"
// import React, { useContext } from 'react';
// import { DashboardContext } from '../../provider';
// import Image from 'next/image';

// export default function WelcomeContainer() {
//     const { userDetails, loading } = useContext(DashboardContext);
    
//     // 1. सबसे पहले loading state को check करें
//     if (loading) {
//         return (
//             <div className="bg-white p-5 mt-10 ml-10 mr-10 rounded-xl flex items-center justify-center">
//                 <p>Loading user data...</p>
//             </div>
//         );
//     }
    
//     // 2. जब loading खत्म हो जाए, तब userDetails को check करें
//     if (!userDetails) {
//         return null;
//     }

//     // 3. जब data load हो जाए, तब content दिखाएं
//     return (
//         <div className="bg-white p-5 mt-10 ml-10 mr-10 rounded-xl flex justify-between items-center">
//             <div>
//                 <h2 className="text-large font-bold">
//                     Welcome Back! {userDetails?.name}
//                 </h2>
//                 <p className="text-gray-500">
//                     AI-Driven interviews, Hassele-free hiring.
//                 </p>
//             </div>
//             {userDetails && (
//                 <Image 
//                     src={userDetails?.profile_image} 
//                     alt="Profile Image" 
//                     width={40} 
//                     height={40} 
//                     className="rounded-full"
//                 />
//             )}
//         </div>
//     );
// }







"use client"
import React, { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { LogOut } from 'lucide-react'; // 2. Import the logout icon
import { DashboardContext } from '../../provider';
import { supabase } from '@/services/supabaseClient'; // 3. Import Supabase client

export default function WelcomeContainer() {
    const { userDetails, loading } = useContext(DashboardContext);
    const router = useRouter(); // 4. Initialize the router

    // Function to handle user logout
    const handleLogout = async () => {
        // Sign out from Supabase
        await supabase.auth.signOut();
        // Redirect to the sign-in page
        router.push('/auth');
    };

    if (loading) {
        return (
            <div className="bg-white p-5 mt-10 ml-10 mr-10 rounded-xl flex items-center justify-center">
                <p>Loading user data...</p>
            </div>
        );
    }
    
    if (!userDetails) {
        return null;
    }

    return (
        <div className="bg-white p-5 mt-10 ml-10 mr-10 rounded-xl flex justify-between items-center">
            <div>
                <h2 className="text-large font-bold">
                    Welcome Back! {userDetails?.name}
                </h2>
                <p className="text-gray-500">
                    AI-Driven interviews, Hassele-free hiring.
                </p>
            </div>
            {userDetails && (
                // 5. Group the image and icon together
                <div className="flex items-center gap-4">
                    <Image 
                        src={userDetails?.profile_image} 
                        alt="Profile Image" 
                        width={40} 
                        height={40} 
                        className="rounded-full"
                    />
                    <LogOut 
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                        onClick={handleLogout}
                    />
                </div>
            )}
        </div>
    );
}