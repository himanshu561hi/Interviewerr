import React from 'react';
import DashboardProvider from './provider';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
   <SidebarProvider>
       <AppSidebar />
       <main className="bg-gray-100 w-full">
         <SidebarTrigger />
         <div className="p-10 w-full">
        {children}
        </div>
       </main>
     </SidebarProvider>
    </DashboardProvider>
  );
}








// export default function DashboardLayout({ children }) {
//   return (
//     <DashboardProvider>
//       <SidebarProvider>
//         <AppSidebar />
//         <main>
//           <SidebarTrigger />
//           {children}
//         </main>
//       </SidebarProvider>
//     </DashboardProvider>
//   );
// }