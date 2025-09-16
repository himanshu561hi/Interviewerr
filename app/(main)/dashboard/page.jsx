// "use client";
// import React from 'react';
// import { useUser } from '@/app/provider';  
// import WelcomeContainer from './_components/WelcomeContainer';
// import CreateOptions from './_components/CreateOptions';
// import LatestInterviewList from './_components/LatestInterviewList';

// export default function Dashboard({ children }) {
//     const {user} = useUser();
//     return (
//         <div>
//             {/* <WelcomeContainer /> */}
//             <h2 className="mb-5 font-bold ml-3 text-2xl">Dashboard</h2>
//             <CreateOptions />
//             <h2 className="my-3 font-bold ml-3 text-2xl">Previously Created Interviews</h2>
//             <LatestInterviewList />
//         </div>
//     );
// }

"use client";
import React from 'react';
import CreateOptions from './_components/CreateOptions';
import LatestInterviewList from './_components/LatestInterviewList';

export default function Dashboard({ children }) {
    return (
        <div>
            <h2 className="mb-5 font-bold ml-3 text-2xl">Dashboard</h2>
            <CreateOptions />
            <h2 className="my-3 font-bold ml-3 text-2xl">Previously Created Interviews</h2>
            <LatestInterviewList />
        </div>
    );
}