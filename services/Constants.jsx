"use client"
import { Calendar, List, LayoutDashboard, Settings, WalletCards, Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, Sparkles } from "lucide-react";

export const SideBarOptions = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Scheduled Interview",
        href: "/scheduled-interview",
        icon: Calendar       
    },
    {
        name: "All Interview",
        href: "/all-interview",
        icon: List       
    },
    {
        name: "Billing",
        href: "/billing",
        icon: WalletCards       
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings       
    }
]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },{
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },{
        title: 'Leadership',
        icon: Sparkles
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
]