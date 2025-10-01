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
import { DashboardContext } from '../../provider';
import Image from 'next/image';

export default function WelcomeContainer() {
    const { userDetails, loading } = useContext(DashboardContext);
    
    // 1. सबसे पहले loading state को check करें
    if (loading) {
        return (
            <div className="bg-white p-5 mt-10 ml-10 mr-10 rounded-xl flex items-center justify-center">
                <p>Loading user data...</p>
            </div>
        );
    }
    
    // 2. जब loading खत्म हो जाए, तब userDetails को check करें
    if (!userDetails) {
        return null;
    }

    // 3. जब data load हो जाए, तब content दिखाएं
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
                <Image 
                    src={userDetails?.profile_image} 
                    alt="Profile Image" 
                    width={40} 
                    height={40} 
                    className="rounded-full"
                />
            )}
        </div>
    );
}