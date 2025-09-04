import {memo} from "react";
import {SidebarHeader} from "@/components/ui/sidebar";
import LogoIcon from "@/assets/images/LogoIcon.png";

export const AppSidebarHeader = memo((props: { appVersion: string }) => {
    return <SidebarHeader className="flex flex-col items-center justify-center gap-4 py-4">
        <div className="flex items-center justify-center bg-sidebar-accent rounded-full p-2">
            <img src={LogoIcon} alt="אירועים" width={50} height={50}
                 className="transition-transform hover:scale-105"/>
        </div>
        <div className="text-xs text-zinc-400 font-semibold mt-1 group-data-[collapsible=icon]:hidden">
            {props.appVersion}
        </div>
    </SidebarHeader>;
})