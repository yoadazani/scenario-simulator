import EventsIcon from "@/assets/images/EventsIcon.png";
import RocketAttackIcon from "@/assets/images/RocketAttackIcon.png";
import SirensIcon from "@/assets/images/SirensIcon.png";
import ForcesIcon from "@/assets/images/ForcesIcon.png";

type SidebarItem = {
    title: string;
    url: string;
    icon: string;
    active?: boolean;
}

export const sidebarItems: SidebarItem[] = [
    {
        title: "אירועים",
        url: "events",
        icon: EventsIcon,
        active: true,
    },
    {
        title: "מטחים",
        url: "rocket-attack",
        icon: RocketAttackIcon,
        active: false,
    },
    {
        title: "צופרים",
        url: "sirens",
        icon: SirensIcon,
        active: false,
    },
    {
        title: "כוחות",
        url: "forces",
        icon: ForcesIcon,
        active: false,
    }
]