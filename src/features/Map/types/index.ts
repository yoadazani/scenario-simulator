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
    component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    activeTool: Tools
}