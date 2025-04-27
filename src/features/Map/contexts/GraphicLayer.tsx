import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {useParentLayer} from "@/features/Map/hooks/useParentLayer.ts";

interface GraphicChildProps {
    graphicsLayer: GraphicsLayer;
}

export const graphicsLayerContext = createContext<GraphicChildProps | null>(null);

const GraphicLayer = (
    {
        children,
        visible = true,
        title = null,
        id,
        order,
    }: {
        children?: ReactNode;
        visible?: boolean;
        title?: string | null;
        id?: string;
        order?: number;
    }) => {
    const parentLayer = useParentLayer();
    const graphicsLayer = useRef(
        new GraphicsLayer({
            id,
            title
        })
    );

    useEffect(() => {
        if (order) {
            parentLayer.reorder(graphicsLayer.current, order)
        }
    }, [order, parentLayer]);

    useEffect(() => {
        graphicsLayer.current.visible = visible;
    }, [visible]);

    useEffect(() => {
        const {current: graphics} = graphicsLayer;
        parentLayer.add(graphics);
        return () => {
            parentLayer.remove(graphics);
        };
    }, [graphicsLayer.current.id, parentLayer]);

    return (
        <graphicsLayerContext.Provider
            value={{graphicsLayer: graphicsLayer.current}}
        >
            {children}
        </graphicsLayerContext.Provider>
    );
};

export default GraphicLayer;

export const useGraphicsLayer = () => {
    const graphicsLayer = useContext(graphicsLayerContext);
    if (!graphicsLayer)
        throw new Error(
            "useGraphicsLayer must be used within a graphicsLayerContext"
        );
    return graphicsLayer;
};
