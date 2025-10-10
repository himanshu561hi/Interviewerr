// "use client"
// import { SideBarOptions } from "@/services/Constants";
// import { Button } from "@/components/ui/button";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import { Plus } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export function AppSidebar() {


//     const path = usePathname();
//     console.log(path);
//   return (
//     <Sidebar>
//       <SidebarHeader className="flex items-center mt-5">
//         <Image src={"/logo.png"} priority={true} alt="logo" width={200} height={50}
//         className="w-[150px]"/>
//         <Link href={'/dashboard/create-interview'}>
//         <Button className="mt-5 w-full"><Plus/>Create New Interview</Button>
//         </Link>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarContent>
//             <SidebarMenu>
//               {SideBarOptions.map((option, index) => (
//                 <SidebarMenuItem 
//                   key={index}
//                   className="p-1 font-medium"
//                 >
//                   <SidebarMenuButton asChild 
//                     className={`p-3 ${path===option.href&&"bg-blue-50"}`}>
//                     <Link href={option.href}>
//                         <option.icon className={`text-[16px] ${path===option.href&&"text-primary"}`} />
//                       <span className={`text-[16px] ${path===option.href&&"text-primary"}`}>{option.name}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter />
//     </Sidebar>
//   );
// }




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
    
    // Define the minimalist light theme classes
    const activeBg = "bg-blue-50"; // Very light blue
    const activeText = "text-blue-700"; // Primary blue text
    const inactiveText = "text-gray-600"; // Medium gray text
    const hoverBg = "hover:bg-gray-50"; // Very subtle gray hover

  return (
    // Minimalist: Clean white background, thin border, no heavy shadow
    <Sidebar className="bg-white border-r border-gray-200">
      
      {/* --- Header: Logo & Create Button --- */}
      <SidebarHeader className="flex flex-col items-start px-4 pt-6 pb-4 border-b border-gray-100">
        
        {/* Logo - Increased margin */}
        <div className="mb-7"> 
            <Image 
                src={"/logo.png"} 
                priority={true} 
                alt="logo" 
                width={200} 
                height={50}
                className="w-[130px] object-contain" // Slightly reduced logo size for a more focused look
            />
        </div>

        {/* Create Button - Clean, sharp primary style */}
        <Link href={'/dashboard/create-interview'} className="w-full">
            <Button 
                // Removed all shadows and excessive padding for a flatter, modern look
                className="w-full text-base font-semibold h-11 bg-blue-600 hover:bg-blue-700 text-white 
                           rounded-lg transition-colors duration-200"
            >
                <Plus className="h-4 w-4 mr-2" />
                Create Interview
            </Button>
        </Link>
      </SidebarHeader>
      
      {/* --- Menu Content --- */}
      <SidebarContent className="px-3 pt-4">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu className="space-y-1">
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem 
                  key={index}
                  className="p-0"
                >
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      w-full justify-start rounded-lg p-3 text-base transition-colors duration-150 
                      ${path === option.href 
                        ? `${activeBg} ${activeText} font-bold` // Active state: Soft background, bold font
                        : `${inactiveText} ${hoverBg} font-medium`} // Inactive state: Subtle hover
                    `}
                  >
                    <Link href={option.href} className="flex items-center space-x-3 w-full">
                        {/* Icon Styling */}
                        <option.icon 
                            className={`h-5 w-5 ${path === option.href ? "text-blue-600" : "text-gray-500"}`} 
                        />
                      
                        {/* Text Styling */}
                        <span>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* --- Footer --- */}
      <SidebarFooter className="border-t border-gray-100 p-4" />
    </Sidebar>
  );
}