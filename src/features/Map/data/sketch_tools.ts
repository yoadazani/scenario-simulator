import Location from "@/assets/icons/location.svg?react";
import Polygon from "@/assets/icons/polygon.svg?react";
import Polyline from "@/assets/icons/polyline.svg?react";
import Circle from "@/assets/icons/circle.svg?react";
import Ellipse from "@/assets/icons/ellipse.svg?react";
import Square from "@/assets/icons/square.svg?react";
import { SketchTool } from "@/features/Map/types";

export const sketchTools: SketchTool[] = [
    {
        id: 1,
        tool: "point",
        activeTool: "point",
        component: Location
    },
    {
        id: 2,
        tool: "polygon",
        activeTool: "polygon",
        component: Polygon
    },
    {
        id: 3,
        tool: "polyline",
        activeTool: "polyline",
        component: Polyline
    },
    {
        id: 4,
        tool: "circle",
        activeTool: "circle",
        component: Circle
    },
    {
        id: 5,
        tool: "circle",
        activeTool: "ellipse",
        component: Ellipse
    },
    {
        id: 6,
        tool: "rectangle",
        activeTool: "rectangle",
        component: Square
    }
]