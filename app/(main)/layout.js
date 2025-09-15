// import React from 'react'
// import DashboardProvider from './provider';

// function DashboardLayout({ children }) {
//     return (
//         <div>
//             <DashboardProvider>
//                 {children}
//             </DashboardProvider>
//         </div>
//     )
// }
// export default DashboardLayout;


import React from 'react';
import DashboardProvider from './provider';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </DashboardProvider>
  );
}