import {FunctionComponent, SVGProps} from "react";

export type Position =
    | "bottom-leading"
    | "bottom-left"
    | "bottom-right"
    | "bottom-trailing"
    | "top-leading"
    | "top-left"
    | "top-right"
    | "top-trailing"
    | "manual";

export type Symbols = {
    polylineSymbol: __esri.SimpleLineSymbolProperties;
    polygonSymbol: __esri.SimpleFillSymbolProperties;
    rectangleSymbol: __esri.SimpleFillSymbolProperties;
    circleSymbol: __esri.SimpleFillSymbolProperties;
    markerSymbol: __esri.PictureMarkerSymbol;
    ellipseSymbol: __esri.SimpleFillSymbolProperties;
};


export type Tools = 'point' | 'polyline' | 'polygon' | 'rectangle' | 'circle' | 'ellipse'

export type SketchTool = {
    id: number;
    tool: | "point"
        | "multipoint"
        | "polyline"
        | "polygon"
        | "rectangle"
        | "circle";
    component: FunctionComponent<SVGProps<SVGSVGElement>>;
    activeTool: Tools
}

type Circle = { type: "circle", center: { latitude: number; longitude: number }, radius: number }
type Polygon = { type: "polygon"; rings: number[][] }
type Polyline = { type: "polyline"; paths: number[][] }
type Point = {
    type: "point";
    point: {
        latitude: number;
        longitude: number
    }
}
type Ellipse = {
    type: "ellipse";
    center: { latitude: number; longitude: number },
    xaxsis: number,
    yaxsis: number,
    rotation: number
}
type Rectangle = {
    type: "rectangle",
    center: { latitude: number; longitude: number },
    radius: number,
    rotation?: number
}

export type GraphicDefinition = | Point | Polyline | Polygon | Circle | Rectangle | Ellipse
