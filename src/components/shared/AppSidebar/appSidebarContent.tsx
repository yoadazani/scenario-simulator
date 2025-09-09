import {SidebarItem} from "@/data/sidebar-items";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarSeparator
} from "@/components/ui/sidebar";
import {AppSidebarMenuItem} from "@/components/shared/AppSidebar/appSidebarMenuItem";
import {memo} from "react";

const AppSidebarContent = (props: { sidebarItems: SidebarItem[] }) => {
    return <SidebarContent>
        <SidebarSeparator/>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                    {
                        props.sidebarItems.map(item => {
                            return <AppSidebarMenuItem key={item.title} item={item}/>
                        })
                    }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>;
}

export default memo(AppSidebarContent)