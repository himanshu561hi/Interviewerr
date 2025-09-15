// import React from 'react';
// import DashboardProvider from './provider';
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "./_components/AppSidebar";

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



import React from 'react';
import DashboardProvider from './provider';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </DashboardProvider>
  );
}