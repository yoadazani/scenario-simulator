import marker from "@/assets/marker.png";
import endTarget from "@/assets/end-target.svg";
import target from "@/assets/target.svg";

export const polylineSymbol = {
  color: [62, 176, 144],
  width: 2,
  cap: "round",
  join: "round",
  style: "dash",
  marker: {
    color: [62, 176, 144, 0.2],
    placement: "end",
    style: "x",
  },
} as __esri.SimpleLineSymbolProperties;

export const ellipseSymbol = {
  color: [255, 0, 0, 0.2],
  style: "cross",
  outline: {
    color: [255, 0, 0, 0.5],
    width: 2,
    style: "solid",
    cap: "round",
    join: "round",
  },
} as __esri.SimpleFillSymbolProperties;

export const polygonSymbol = {
  color: [0, 0, 255, 0.2],
  style: "cross",
  outline: {
    color: [0, 0, 255, 0.5],
    width: 2,
    style: "solid",
    cap: "round",
    join: "round",
  },
} as __esri.SimpleFillSymbolProperties;

export const subdestrictSymbol = {
  color: [153, 0, 0, 0.2],
  style: "none",
  outline: {
    color: [153, 0, 0, 0.5],
    width: 1.5,
    style: "solid",
    cap: "round",
    join: "round",
  },
} as __esri.SimpleFillSymbolProperties;

export const destrictSymbol = {
  color: [0, 0, 153, 0.2],
  style: "none",
  outline: {
    color: [0, 0, 153, 1],
    width: 3,
    style: "solid",
    cap: "round",
    join: "round",
  },
} as __esri.SimpleFillSymbolProperties;

export const circleSymbol = {
  color: [121, 73, 0, 0.2],
  style: "cross",
  outline: {
    color: [121, 73, 0, 0.5],
    width: 2,
    style: "solid",
    cap: "round",
    join: "round",
  },
} as __esri.SimpleFillSymbolProperties;

export const rectangleSymbol = {
  color: [255, 180, 0, 0.2],
  style: "cross",
  outline: {
    color: [255, 180, 0, 0.5],
    width: 2,
    style: "solid",
    cap: "round",
    join: "round",
  },
} as __esri.SimpleFillSymbolProperties;

export const markerSymbol = {
  url: marker,
  width: 24,
  height: 24,
} as __esri.PictureMarkerSymbol;

export const labelSymbol = {
  color: "black",
  haloColor: "grey",
  haloSize: 0.5,
  font: {
    size: 12,
    family: "Arial",
    weight: "normal",
  },
} as __esri.TextSymbolProperties;

export const rulerSymbol = {
  data: {
    type: "CIMSymbolReference",
    symbol: {
      type: "CIMLineSymbol",
      symbolLayers: [
        {
          type: "CIMPictureMarker",
          enable: true,
          size: 22,
          frame: {
            xmin: 0,
            ymin: 0,
            xmax: 16,
            ymax: 16
          },
          url: endTarget,
          rotation: 45,
          rotateClockwise: false,
          markerPlacement: {
            type: "CIMMarkerPlacementAtExtremities",
            angleToLine: true,
            extremityPlacement: "JustEnd",
          },
          scaleSymbolsProportionally: true,
          respectFrame: true,
        },
        {
          type: "CIMPictureMarker",
          enable: true,
          size: 18,
          frame: {
            xmin: 0,
            ymin: 0,
            xmax: 16,
            ymax: 16
          },
          url: target,
          tintColor: [109, 188, 223, 255],
          markerPlacement: {
            type: "CIMMarkerPlacementAtExtremities",
            angleToLine: true,
            extremityPlacement: "JustBegin"
          },
          scaleSymbolsProportionally: true,
          respectFrame: true,
        },
        {
          type: "CIMPictureMarker",
          enable: true,
          size: 18,
          frame: {
            xmin: 0,
            ymin: 0,
            xmax: 16,
            ymax: 16
          },
          url: target,
          tintColor: [109, 188, 223, 255],
          markerPlacement: {
            type: "CIMMarkerPlacementOnVertices",
            primitiveName: "Circle",
            angleToLine: true,
            placeOnEndPoints: false
          },
          scaleSymbolsProportionally: true,
          respectFrame: true,
        },
        {
          type: "CIMSolidStroke",
          enable: true,
          capStyle: "Butt",
          joinStyle: "Round",
          width: 2.5,
          color: [109, 192, 223, 255],
          effects: [
            {
              type: "CIMGeometricEffectDashes",
              dashTemplate: [10, 10],
            }
          ]
        },
      ]
    }
  }
} as __esri.CIMSymbolProperties;

