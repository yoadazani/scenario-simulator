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

export const rulerSymbol = {
  data: {
    type: "CIMSymbolReference",
    symbol: {
      type: "CIMLineSymbol",
      symbolLayers: [
        {
          type: "CIMVectorMarker",
          enable: true,
          size: 32,
          frame: {
            xmin: 0,
            ymin: 0,
            xmax: 16,
            ymax: 16
          },
          markerGraphics: [
            {
              type: "CIMMarkerGraphic",
              geometry: {
                rings: [
                  [
                    [12.5, 8.5],
                    [12.36, 9.28],
                    [12.0, 10.0],
                    [11.45, 10.61],
                    [10.73, 11.05],
                    [9.94, 11.28],
                    [9.09, 11.3],
                    [8.25, 11.11],
                    [7.5, 10.73],
                    [6.89, 10.18],
                    [6.45, 9.45],
                    [6.22, 8.66],
                    [6.2, 7.81],
                    [6.39, 6.97],
                    [6.77, 6.22],
                    [7.32, 5.61],
                    [8.05, 5.17],
                    [8.84, 4.94],
                    [9.69, 4.92],
                    [10.53, 5.11],
                    [11.28, 5.5],
                    [11.89, 6.05],
                    [12.33, 6.77],
                    [12.56, 7.56],
                    [12.5, 8.5]
                  ]
                ]
              },
              symbol: {
                type: "CIMPolygonSymbol",
                symbolLayers: [
                  {
                    type: "CIMSolidFill",
                    enable: true,
                    color: [109, 188, 223, 255]
                  }
                ]
              }
            }
          ],
          markerPlacement: {
            type: "CIMMarkerPlacementOnVertices",
            primitiveName: "Circle",
            angleToLine: true
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

