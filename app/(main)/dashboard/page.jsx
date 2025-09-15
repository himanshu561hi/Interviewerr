// import React from 'react'

// function Dashboard ({ children }) {
//     return (
//         <div>
//             Dashboard Page
//         </div>
//     )
// }
// export default Dashboard;



import React from 'react';

export default function Dashboard({ children }) {
    return (
        <div>
            <h1>Dashboard Page</h1>
            {children}
        </div>
    );
}