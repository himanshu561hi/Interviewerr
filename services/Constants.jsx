"use client"
import { calendar, List, LayoutDashboard, Settings, walletCards } from "lucide-react";

export const SideBarOptions = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Scheduled Interview",
        href: "/scheduled-interview",
        icon: calendar       
    },
    {
        name: "All Interview",
        href: "/all-interview",
        icon: List       
    },
    {
        name: "Billing",
        href: "/billing",
        icon: walletCards       
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings       
    }
];