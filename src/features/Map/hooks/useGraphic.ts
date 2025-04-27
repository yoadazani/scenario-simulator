import {useEffect, useRef} from "react";
import Graphic from "@arcgis/core/Graphic";
import {useLayer} from "./useLayer";

export const useGraphic = (properties: __esri.GraphicProperties) => {
    const layer = useLayer();
    const graphicRef = useRef(new Graphic(properties));

    useEffect(() => {
        const {current: graphic} = graphicRef;
        layer.add(graphic);
        return () => {
            layer.remove(graphic);
        };
    }, [layer]);

    return graphicRef;
};
