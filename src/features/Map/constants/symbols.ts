import marker from "@/assets/marker.png";

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

