import {memo} from "react";
import {SidebarItem} from "@/data/sidebar-items";
import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {Link, useLocation} from "@tanstack/react-router";

export const AppSidebarMenuItem = memo((props: { item: SidebarItem }) => {
    const {pathname} = useLocation()
    return <SidebarMenuItem>
        <SidebarMenuButton
            size="lg"
            isActive={pathname.includes(props.item.url)}
            tooltip={props.item.title}
            className="flex-row items-center justify-between"
        >
            <Link
                to={props.item.url}
                className="flex items-center gap-2"
                activeProps={{
                    style: {backgroundImage: "none"}
                }}
            >
                <img src={props.item.icon} alt={props.item.title} width={50} height={50}/>
                <span className="font-semibold text-zinc-700 group-data-[collapsible=icon]:hidden">
                        {props.item.title}
                </span>
            </Link>
        </SidebarMenuButton>
    </SidebarMenuItem>;
})