import {SidebarItem} from "@/data/sidebar-items";
import {useLocation} from "@tanstack/react-router";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarSeparator
} from "@/components/ui/sidebar";
import {AppSidebarMenuItem} from "@/components/shared/AppSidebar/appSidebarMenuItem";

export const AppSidebarContent = (props: { sidebarItems: SidebarItem[] }) => {
    const {pathname} = useLocation()
    return <SidebarContent>
        <SidebarSeparator/>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                    {
                        props.sidebarItems.map(item => {
                            return <AppSidebarMenuItem key={item.title} pathname={pathname} item={item}/>
                        })
                    }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>;
}