import {memo} from "react";
import {
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {Link} from "@tanstack/react-router";
import {LogOutIcon} from "lucide-react";

export const AppSidebarFooter = memo(() => {
    return <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 px-0">
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
                            <Link
                                to="/"
                                activeProps={{
                                    style: {backgroundImage: "none"}
                                }}>
                                <LogOutIcon className="stroke-primary"/>
                                <span className="font-semibold text-zinc-700 group-data-[collapsible=icon]:hidden">
                                    התנתק מהמערכת
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarFooter>;
})