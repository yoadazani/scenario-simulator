import {ReactNode, useMemo} from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import {LogOutIcon} from "lucide-react";
import LogoIcon from "@/assets/images/LogoIcon.png";
import {getVersion} from "@/lib/utils.ts";
import {sidebarItems} from "@/data/sidebar-items.ts";


const AppSidebar = ({children}: { children: ReactNode }) => {
    const appVersion = useMemo(() => getVersion(), [])
    return (
        <SidebarProvider className="relative" defaultOpen={false} dir="rtl">
            <Sidebar side="right" variant="sidebar" collapsible="icon">
                <SidebarHeader className="flex flex-col items-center justify-center gap-4 py-4">
                    <div className="flex items-center justify-center bg-sidebar-accent rounded-full p-2">
                        <img src={LogoIcon} alt="אירועים" width={50} height={50}
                             className="transition-transform hover:scale-105"/>
                    </div>
                    <div className="text-xs text-zinc-400 font-semibold mt-1 group-data-[collapsible=icon]:hidden">
                        {appVersion}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarSeparator/>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-2">
                                {sidebarItems.map(item => {
                                    return <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            size="lg"
                                            isActive={item.active}
                                            tooltip={item.title}
                                            className="flex-row items-center justify-between"
                                        >
                                            <a href={item.url} className="flex items-center gap-2">
                                                <img src={item.icon} alt={item.title} width={50} height={50}/>
                                                <span
                                                    className="font-semibold text-zinc-700  group-data-[collapsible=icon]:hidden">
                                                        {item.title}
                                                </span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 px-0">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        size="lg"
                                        tooltip="התנתק מהמערכת"
                                        variant="outline"
                                        className="group-data-[collapsible=icon]:justify-center">
                                        <a href="">
                                            <LogOutIcon className="stroke-primary"/>
                                            <span
                                                className="font-semibold text-zinc-700 group-data-[collapsible=icon]:hidden">
                                                התנתק מהמערכת
                                            </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarFooter>
            </Sidebar>
            <main>
                <SidebarTrigger variant="default" className="rounded-none rounded-bl-md"/>
                {children}
            </main>
        </SidebarProvider>
    );
}

export default AppSidebar;