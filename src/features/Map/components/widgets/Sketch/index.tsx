import {RefObject, useCallback, useEffect, useRef, useState} from "react";
import SketchModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import {useWidget} from "@/features/Map/hooks/useWidget.ts";
import {Position, SketchTool, Symbols, Tools} from "@/features/Map/types";
import {useMap} from "@/contexts/MapContainer.tsx";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import {useGraphicsLayer} from "@/contexts/GraphicLayer.tsx";
import {sketchTools} from "@/features/Map/data/sketch_tools.ts";
import Pencil from "@/assets/pencil.svg?react";
import Trash from "@/assets/trash.svg?react";
import {projectedGeometry} from "@/features/Map/utils";
import ToolButton from "./ToolButton.tsx";
import UndoRedoButtons from "./UndoRedoButtons.tsx";

interface SketchProps {
    symbols: Symbols;
    position?: Position;
    availableTools?: Tools[];
    creationMode?: "single" | "continuous" | "update";
    updateTool?: "move" | "transform" | "reshape";
    defaultCreateMode?: "hybrid" | "freehand" | "click";
    onSketchCreate?: (
        event: __esri.SketchViewModelCreateEvent,
        type: Tools
    ) => void;
    onSketchUpdate?: (
        event: __esri.SketchViewModelUpdateEvent,
        type: Tools
    ) => void;
    onSketchDelete?: (
        event: __esri.SketchViewModelDeleteEvent,
        type: Tools
    ) => void;
}

const Sketch = (props: SketchProps) => {
    const {
        symbols,
        position,
        onSketchCreate,
        onSketchUpdate,
        onSketchDelete,
        availableTools,
        defaultCreateMode = "click",
        updateTool = "transform",
        creationMode = "single",
    } = props;
    const prevActiveTool = useRef<Tools | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTool, setActiveTool] = useState<Tools>();
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [graphicSelected, setGraphicSelected] = useState(false);

    const {mapView} = useMap();
    const {graphicsLayer} = useGraphicsLayer();

    const fillSymbol = useRef(new SimpleFillSymbol());

    const sketchRef = useRef(
        new SketchModel({
            view: mapView.current,
            layer: graphicsLayer,
            pointSymbol: new PictureMarkerSymbol(symbols.markerSymbol),
            polygonSymbol: new SimpleFillSymbol(symbols.polygonSymbol),
            polylineSymbol: new SimpleLineSymbol(symbols.polylineSymbol),
            creationMode: creationMode,
            defaultCreateOptions: {
                mode: defaultCreateMode,
            },
            defaultUpdateOptions: {
                tool: updateTool,
                toggleToolOnClick: false,
                enableScaling: true,
                multipleSelectionEnabled: false,
                enableZ: false,
                enableRotation: true,
            },
            updateOnGraphicClick: false,
        })
    );
    const {elementRef} = useWidget(position ?? "top-left");

    const updateFillSymbol = useCallback(
        (
            activeTool: Tools,
            symbols: Symbols,
            fillSymbol: RefObject<SimpleFillSymbol>
        ) => {
            switch (activeTool) {
                case "circle":
                    fillSymbol.current.set(symbols.circleSymbol);
                    break;
                case "rectangle":
                    fillSymbol.current.set(symbols.rectangleSymbol);
                    break;
                case "ellipse":
                    fillSymbol.current.set(symbols.ellipseSymbol);
                    break;
                default:
                    fillSymbol.current.set(symbols.polygonSymbol);
                    break;
            }
        },
        []
    );

    const handleSketchUpdate = useCallback(
        async (event: __esri.SketchViewModelUpdateEvent) => {
            setGraphicSelected(event.state !== "complete");

            if (event.aborted) {
                setActiveTool(undefined);
                return;
            }

            const graphic = event.graphics[0];
            setActiveTool(graphic.attributes.toolType);

            if (event.state === "complete") {
                graphic.geometry = await projectedGeometry(graphic);
                setActiveTool(undefined);
            }

            onSketchUpdate?.(event, graphic.attributes.toolType);
        },
        [onSketchUpdate]
    );

    const handleSketchDelete = useCallback((event: __esri.SketchViewModelDeleteEvent) => {
        onSketchDelete?.(event, event.graphics[0].attributes.toolType);
    }, [onSketchDelete]);

    const updateUndoRedoState = useCallback(() => {
        setCanUndo(sketchRef.current.canUndo());
        setCanRedo(sketchRef.current.canRedo());
    }, []);

    const handleSketchCreate = useCallback(
        async (event: __esri.SketchViewModelCreateEvent) => {
            updateUndoRedoState();
            if (event.state !== "complete") return;

            event.graphic.attributes = {toolType: prevActiveTool.current};
            event.graphic.geometry = await projectedGeometry(event.graphic);

            if (sketchRef.current.creationMode === "update") {
                await sketchRef.current.update(event.graphic);
            } else if (sketchRef.current.creationMode !== "continuous") {
                sketchRef.current.cancel();
            }

            setActiveTool(undefined);

            onSketchCreate?.(event, event.graphic.attributes.toolType);
        },
        [onSketchCreate, updateUndoRedoState]
    );

    const handleCreateOrCancel = useCallback(
        (tool: SketchTool["tool"], currentActiveTool: Tools) => {
            if (activeTool !== currentActiveTool) {
                sketchRef.current.create(tool, {
                    preserveAspectRatio: currentActiveTool !== "ellipse",
                    mode:
                        currentActiveTool === "ellipse" ? "freehand" : defaultCreateMode,
                });
                prevActiveTool.current = currentActiveTool;
                setActiveTool(currentActiveTool);
            } else {
                sketchRef.current.cancel();
                setActiveTool(undefined);
            }
        },
        [activeTool, defaultCreateMode]
    );

    const handleUndo = useCallback(() => sketchRef.current.undo(), []);
    const handleRedo = useCallback(() => sketchRef.current.redo(), []);

    useEffect(() => {
        if (activeTool) {
            updateFillSymbol(activeTool, symbols, fillSymbol);
            sketchRef.current.polygonSymbol = fillSymbol.current;
        }
    }, [activeTool, symbols, updateFillSymbol]);

    useEffect(() => {
        sketchRef.current.creationMode = creationMode;
        sketchRef.current.defaultUpdateOptions.tool = updateTool;
    }, [creationMode, updateTool]);

    useEffect(() => {
        sketchRef.current.updateOnGraphicClick = true;
        const createHandler = sketchRef.current.on("create", handleSketchCreate);
        const updateHandler = sketchRef.current.on("update", handleSketchUpdate);
        const deleteHandler = sketchRef.current.on("delete", handleSketchDelete);

        return () => {
            createHandler.remove();
            updateHandler.remove();
            deleteHandler.remove();
        };
    }, [handleSketchCreate, handleSketchDelete, handleSketchUpdate]);

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
        setActiveTool(undefined);
    }, [isOpen]);

    return (
        <div ref={elementRef} className="flex gap-x-2 relative">
            <Pencil
                className={`btn pencil ${isOpen ? "open" : ""}`}
                onClick={handleClick}
            />
            <div
                className={`absolute left-full ml-2 tools-container ${
                    isOpen ? "open" : ""
                }`}
            >
                {sketchTools.map((skeatchTool) => {
                    if (
                        availableTools &&
                        !availableTools.includes(skeatchTool.activeTool)
                    )
                        return null;
                    return (
                        <ToolButton
                            key={skeatchTool.id}
                            tool={skeatchTool.tool}
                            ComponentSvg={skeatchTool.component}
                            currentActiveTool={skeatchTool.activeTool}
                            activeTool={activeTool!}
                            handleCreateOrCancel={handleCreateOrCancel}
                        />
                    );
                })}

                {activeTool && (
                    <UndoRedoButtons
                        canUndo={canUndo}
                        canRedo={canRedo}
                        currentActiveTool={activeTool}
                        handleUndo={handleUndo}
                        handleRedo={handleRedo}
                    />
                )}

                {graphicSelected && (
                    <Trash className="btn" onClick={() => sketchRef.current.delete()}/>
                )}
            </div>
        </div>
    );
};

export default Sketch;
