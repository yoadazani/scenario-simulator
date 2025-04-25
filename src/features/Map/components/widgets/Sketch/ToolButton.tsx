import React from "react";
import {Tools} from "@/features/Map/types";
import {SketchTool} from "@/features/Map/types";

interface ToolButtonProps {
    tool: SketchTool["tool"];
    ComponentSvg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    currentActiveTool: Tools;
    activeTool: Tools;
    handleCreateOrCancel: (
        tool: SketchTool["tool"],
        currentActiveTool: Tools
    ) => void;
}

const ToolButton = (props: ToolButtonProps) => {
    const {
        tool,
        ComponentSvg,
        currentActiveTool,
        activeTool,
        handleCreateOrCancel,
    } = props;
    return (
        <div className="flex flex-col space-y-2">
            <ComponentSvg
                className={`btn draw-btn ${
                    activeTool === currentActiveTool ? "active" : ""
                }`}
                onClick={() => handleCreateOrCancel(tool, currentActiveTool)}
            />
        </div>
    );
};

export default ToolButton;
export type {ToolButtonProps};