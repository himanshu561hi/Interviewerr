"use client"
import { SideBarOptions } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {


    const path = usePathname();
    console.log(path);
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5">
        <Image src={"/logo.png"} priority={true} alt="logo" width={200} height={50}
        className="w-[150px]"/>
        <Link href={'/dashboard/create-interview'}>
        <Button className="mt-5 w-full"><Plus/>Create New Interview</Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem 
                  key={index}
                  className="p-1 font-medium"
                >
                  <SidebarMenuButton asChild 
                    className={`p-3 ${path===option.href&&"bg-blue-50"}`}>
                    <Link href={option.href}>
                        <option.icon className={`text-[16px] ${path===option.href&&"text-primary"}`} />
                      <span className={`text-[16px] ${path===option.href&&"text-primary"}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}