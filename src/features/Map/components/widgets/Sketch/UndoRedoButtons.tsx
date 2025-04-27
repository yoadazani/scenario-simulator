import {Tools} from "@/features/Map/types";
import Undo from "@/assets/undo.svg?react";
import Redo from "@/assets/redo.svg?react";

interface UndoRedoButtonsProps {
    canUndo: boolean;
    canRedo: boolean;
    currentActiveTool: Tools;
    handleUndo: () => void;
    handleRedo: () => void;
}

const UndoRedoButtons = (props: UndoRedoButtonsProps) => {
    const {canUndo, canRedo, currentActiveTool, handleUndo, handleRedo} = props;
    return (
        <>
            {canUndo &&
                (currentActiveTool === "polygon" ||
                    currentActiveTool === "polyline") && (
                    <Undo className="btn" onClick={handleUndo}>
                        Undo
                    </Undo>
                )}
            {canRedo &&
                (currentActiveTool === "polygon" ||
                    currentActiveTool === "polyline") && (
                    <Redo className="btn" onClick={handleRedo}>
                        Redo
                    </Redo>
                )}
        </>
    );
};

export default UndoRedoButtons;
export type {UndoRedoButtonsProps};