import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CirclePlus, Ellipsis, Pause, Pencil, Play, Trash} from "lucide-react";
import {memo} from "react";

function DataTableActions() {
    return <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                <Ellipsis className="size-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-md shadow-md p-1" align="end"
                             onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuGroup>
                <DropdownMenuItem className="text-zinc-700 gap-5 cursor-pointer">
                    <CirclePlus className="size-4 text-primary"/>
                    <span>צור רשומה חדשה</span>
                </DropdownMenuItem>
                <DropdownMenuItem className=" text-zinc-700 gap-5 cursor-pointer">
                    <Pencil className=" size-4 text-primary"/>
                    <span>ערוך רשומות</span>
                </DropdownMenuItem>
                <DropdownMenuItem className=" text-zinc-700 gap-5 cursor-pointer">
                    <Trash className=" size-4 text-primary"/>
                    <span>מחק רשומות</span>
                </DropdownMenuItem>
                <DropdownMenuItem className=" text-zinc-700 gap-5 cursor-pointer">
                    <Pause className=" size-4 text-primary"/>
                    <span>השהה רשומות</span>
                </DropdownMenuItem>
                <DropdownMenuItem className=" text-zinc-700 gap-5 cursor-pointer">
                    <Play className=" size-4 text-primary"/>
                    <span>הפעל רשומות</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default memo(DataTableActions)