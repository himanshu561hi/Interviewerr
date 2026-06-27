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
import { Plus, Zap, ShoppingCart, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { DashboardContext } from "@/app/(main)/provider";
import UpgradeModal from "@/components/UpgradeModal";

const MAX_FREE_CREDITS = 5;

export function AppSidebar() {
    const path = usePathname();
    const { userDetails } = useContext(DashboardContext);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const credits      = userDetails?.credits      ?? 0;
    const totalCredits = userDetails?.totalCredits ?? MAX_FREE_CREDITS;
    const plan         = userDetails?.plan         ?? 'free';
    const creditPct    = Math.min((credits / totalCredits) * 100, 100);

    // Color scheme based on credits left
    const barColor =
        credits === 0 ? "bg-red-500" :
        credits <= 2  ? "bg-amber-400" :
                        "bg-indigo-500";
    const badgeStyle =
        credits === 0
            ? "bg-red-50 text-red-600 border-red-200"
            : credits <= 2
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-indigo-50 text-indigo-700 border-indigo-200";

    const activeBg    = "bg-blue-50";
    const activeText  = "text-blue-700";
    const inactiveText = "text-gray-600";
    const hoverBg     = "hover:bg-gray-50";

  return (
    <>
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}

      <Sidebar className="bg-white border-r border-gray-200">

        {/* --- Header: Logo & Create Button --- */}
        <SidebarHeader className="flex flex-col items-start px-4 pt-6 pb-4 border-b border-gray-100">
          <div className="mb-7">
            <Image
              src={"/logo.png"}
              priority={true}
              alt="logo"
              width={200}
              height={50}
              className="w-[130px] object-contain"
            />
          </div>

          <Link href={"/dashboard/create-interview"} className="w-full">
            <Button className="w-full text-base font-semibold h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
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
                  <SidebarMenuItem key={index} className="p-0">
                    <SidebarMenuButton
                      asChild
                      className={`
                        w-full justify-start rounded-lg p-3 text-base transition-colors duration-150
                        ${path === option.href
                          ? `${activeBg} ${activeText} font-bold`
                          : `${inactiveText} ${hoverBg} font-medium`}
                      `}
                    >
                      <Link href={option.href} className="flex items-center space-x-3 w-full">
                        <option.icon
                          className={`h-5 w-5 ${path === option.href ? "text-blue-600" : "text-gray-500"}`}
                        />
                        <span>{option.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Admin Panel Link */}
                {userDetails?.isAdmin && (
                  <SidebarMenuItem className="p-0 mt-4 border-t border-gray-100 pt-2">
                    <SidebarMenuButton
                      asChild
                      className={`
                        w-full justify-start rounded-lg p-3 text-base transition-colors duration-150
                        ${path.startsWith('/admin')
                          ? `${activeBg} text-purple-700 font-bold`
                          : `${inactiveText} ${hoverBg} font-medium`}
                      `}
                    >
                      <Link href="/admin" className="flex items-center space-x-3 w-full">
                        <Shield
                          className={`h-5 w-5 ${path.startsWith('/admin') ? "text-purple-600" : "text-gray-500"}`}
                        />
                        <span>Admin Panel</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </SidebarContent>

        {/* --- Footer: Credits Widget --- */}
        <SidebarFooter className="border-t border-gray-100 p-4">
          {userDetails && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">

              {/* Title row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-bold text-gray-700">Interview Credits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Plan badge */}
                  {plan === 'basic' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">Basic</span>
                  )}
                  {/* Credits badge */}
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                    {credits}/{totalCredits}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${creditPct}%` }}
                />
              </div>

              {/* Status text */}
              <p className="text-[11px] text-gray-500 mb-3 leading-snug">
                {credits === 0
                  ? "⚠️ No credits left. Buy more to create interviews."
                  : credits === 1
                  ? "⚠️ Only 1 credit remaining!"
                  : `${credits} free interview${credits === 1 ? "" : "s"} remaining.`}
              </p>

              {/* Buy Credits Button */}
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="w-full flex items-center justify-center gap-2 h-9 rounded-xl text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Buy Credits
              </button>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}