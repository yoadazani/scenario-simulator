import {memo, ReactNode, useMemo} from "react";

import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {getVersion} from "@/lib/utils";
import {sidebarItems} from "@/data/sidebar-items";
import AppSidebarHeader from "./appSidebarHeader";
import AppSidebarFooter from "./appSidebarFooter";
import AppSidebarContent from "./appSidebarContent";


const AppSidebar = ({children}: { children: ReactNode }) => {
    const appVersion = useMemo(() => getVersion(), [])
    const memoizedSidebarItems = useMemo(() => sidebarItems, [])
    return (
        <SidebarProvider className="relative" defaultOpen={false} dir="rtl">
            <Sidebar side="right" variant="sidebar" collapsible="icon">
                <AppSidebarHeader appVersion={appVersion}/>
                <AppSidebarContent sidebarItems={memoizedSidebarItems}/>
                <AppSidebarFooter/>
            </Sidebar>
            <main className="overflow-auto">
                <SidebarTrigger variant="default" className="rounded-none rounded-bl-md flex-shrink-0 fixed z-50"/>
                <div className="px-4 py-8">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}

export default memo(AppSidebar);