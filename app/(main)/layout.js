
import React from 'react';
import DashboardProvider from './provider';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomeContainer from './dashboard/_components/WelcomeContainer';

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-gray-100 w-full">
          <WelcomeContainer />
          <div className="p-10 w-full">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </DashboardProvider>
  );
}