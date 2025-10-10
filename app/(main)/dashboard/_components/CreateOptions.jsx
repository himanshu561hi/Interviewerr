
// "use client"
// import React from 'react';
// import Link from 'next/link' 
// import { Video, Phone } from 'lucide-react'; 

// function CreateOptions() {
//     return (
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">      

//             <div className="bg-white p-5 border rounded-xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out">

//                 <Link href={"/dashboard/create-interview"} className="block h-full">

//                     <Video className="p-3 text-blue-600 bg-blue-50 rounded-lg w-12 h-12"/>
//                     <h2 className="font-bold mt-4 text-lg">Create New Interview</h2>
//                     <p className="text-gray-500 text-sm mt-1">Create AI Interviews and Schedule them with Candidates.</p>
//                 </Link>
//             </div>
            

//             <div className="bg-white p-5 border border-gray-200 rounded-xl cursor-not-allowed opacity-70">
//                 <div className="flex items-center justify-between">

//                     <Phone className="p-3 text-purple-600 bg-purple-50 rounded-lg w-12 h-12"/>
//                     <h2 className="font-bold text-gray-500 text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-full">
//                         Coming Soon
//                     </h2>
//                 </div>
//                 <h2 className="font-bold mt-4 text-lg">Create Phone Screening Call</h2>
//                 <p className="text-gray-500 text-sm mt-1">Schedule phone screening call with candidates.</p>
//             </div>
//         </div>
//     );
// }

// export default CreateOptions;




// "use client"
// import React from 'react';
// import Link from 'next/link' 
// import { Video, Phone } from 'lucide-react'; 

// function CreateOptions() {
//     return (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">      

//             {/* Card 1: Create New Interview (Active) */}
//             <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-blue-50/20 transition duration-500 ease-in-out hover:shadow-2xl hover:shadow-blue-100/40 transform hover:-translate-y-1">

//                 <Link 
//                     href={"/dashboard/create-interview"} 
//                     className="block p-6 sm:p-8 h-full group"
//                 >

//                     {/* Icon and Accent */}
//                     <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition duration-300 mb-4">
//                         <Video className="w-8 h-8 text-blue-600"/>
//                     </div>
                    
//                     {/* Content */}
//                     <h2 className="font-extrabold text-xl text-gray-900 mt-2 tracking-tight">
//                         Create New Interview
//                     </h2>
//                     <p className="text-gray-500 text-base mt-2 leading-relaxed">
//                         Design AI-driven interviews and seamlessly schedule them with candidates.
//                     </p>
//                 </Link>
//             </div>
            
//             {/* Card 2: Create Phone Screening Call (Coming Soon/Disabled) */}
//             <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 cursor-not-allowed opacity-80 select-none">
                
//                 <div className="flex flex-col h-full">
//                     {/* Header with Icon and Badge */}
//                     <div className="flex items-start justify-between">
//                         {/* Icon */}
//                         <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-50 mb-4">
//                             <Phone className="w-8 h-8 text-purple-600"/>
//                         </div>
                        
//                         {/* Badge */}
//                         <span className="font-semibold text-xs text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
//                             Coming Soon
//                         </span>
//                     </div>

//                     {/* Content */}
//                     <h2 className="font-extrabold text-xl text-gray-500 mt-2 tracking-tight">
//                         Create Phone Screening Call
//                     </h2>
//                     <p className="text-gray-400 text-base mt-2 leading-relaxed">
//                         Effortlessly schedule and manage initial phone screening calls with candidates.
//                     </p>
//                 </div>

//                 {/* Optional: Overlay to emphasize "disabled" state */}
//                 <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl"></div>
//             </div>
//         </div>
//     );
// }

// export default CreateOptions;







"use client"
import React from 'react';
import Link from 'next/link' 
import { Video, Phone } from 'lucide-react'; 

function CreateOptions() {
    return (
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">      
    
            {/* Card 1: Create New Interview (Active) */}
            <div className="bg-white border border-transparent rounded-3xl p-6 sm:p-8 
                            shadow-2xl shadow-blue-200/50 
                            transition-all duration-500 ease-in-out 
                            hover:shadow-blue-300/60 transform hover:-translate-y-2 
                            group relative overflow-hidden">
                
                {/* Subtle Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

                <Link 
                    href={"/dashboard/create-interview"} 
                    className="block h-full relative z-10" // Ensure content is above the gradient
                >

                    {/* Icon and Accent */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-100 group-hover:bg-blue-600 transition duration-500 mb-4">
                        <Video className="w-8 h-8 text-blue-600 group-hover:text-white transition duration-500"/>
                    </div>
                    
                    {/* Content */}
                    <h2 className="font-extrabold text-2xl text-gray-900 mt-2 tracking-tight 
                                   group-hover:text-blue-700 transition duration-500">
                        Create New Interview
                    </h2>
                    <p className="text-gray-600 text-base mt-2 leading-relaxed">
                        Design AI-driven interviews and seamlessly schedule them with candidates.
                    </p>
                </Link>
            </div>
            
            {/* Card 2: Create Phone Screening Call (Coming Soon/Disabled) */}
            <div className="relative bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 cursor-not-allowed opacity-80 select-none shadow-inner shadow-gray-100">
                
                <div className="flex flex-col h-full relative z-10">
                    {/* Header with Icon and Badge */}
                    <div className="flex items-start justify-between">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-purple-100 mb-4">
                            <Phone className="w-8 h-8 text-purple-600"/>
                        </div>
                        
                        {/* Badge */}
                        <span className="font-bold text-xs text-purple-700 bg-purple-200/70 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                            Coming Soon
                        </span>
                    </div>

                    {/* Content */}
                    <h2 className="font-extrabold text-2xl text-gray-400 mt-2 tracking-tight">
                        Create Phone Screening Call
                    </h2>
                    <p className="text-gray-400 text-base mt-2 leading-relaxed">
                        Effortlessly schedule and manage initial phone screening calls with candidates.
                    </p>
                </div>

                {/* Disabled Overlay - made it slightly more subtle with a very light background and blur */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl"></div>
            </div>
        </div>
    );
}

export default CreateOptions;
