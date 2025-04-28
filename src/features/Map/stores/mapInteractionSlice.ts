import {GraphicDefinition, Tools} from "@/features/Map/types";
import Graphic from "@arcgis/core/Graphic";
import {StateCreator} from "zustand";
import Point from "@arcgis/core/geometry/Point";
import {
    circleSymbol,
    ellipseSymbol,
    markerSymbol,
    polygonSymbol,
    polylineSymbol,
} from "@/features/Map/constants/symbols.ts";
import Circle from "@arcgis/core/geometry/Circle";
import Polyline from "@arcgis/core/geometry/Polyline";
import Polygon from "@arcgis/core/geometry/Polygon";
import {ellipse} from "@turf/turf";
import {MapStore} from "./mapStore";

export type MapInteractionState = {
    graphics: {
        point?: Graphic;
        polygon?: Graphic;
        polyline?: Graphic;
        circle?: Graphic;
        ellipse?: Graphic;
        rectangle?: Graphic;
    };
};

export type MapInteractionActions = {
    createGraphic: (graphic: GraphicDefinition) => void;
    updateGraphic: (type: Tools, graphic: Graphic) => void;
    getGraphic: (type: Tools) => Graphic | undefined;
    removeGraphic: (type: Tools) => void;
};

export type MapInteractionSlice = MapInteractionState & MapInteractionActions;

export const mapInteractionSlice: StateCreator<
    MapStore,
    [["zustand/persist", unknown], ["zustand/immer", never]],
    [],
    MapInteractionSlice
> = (set, get) => ({
    graphics: {},
    createGraphic: (graphic) => {
        let geometry: __esri.Geometry | undefined = undefined;
        let symbol: __esri.GraphicProperties["symbol"] = undefined;
        switch (graphic.type) {
            case "point":
                geometry = new Point({
                    longitude: graphic.point.longitude,
                    latitude: graphic.point.latitude,
                });
                symbol = {...markerSymbol, type: "picture-marker"};
                break;
            case "ellipse": {
                const ellipseGeometry = ellipse(
                    [graphic.center.longitude, graphic.center.latitude],
                    graphic.xaxsis,
                    graphic.yaxsis,
                    {
                        angle: graphic.rotation,
                    }
                ).geometry.coordinates[0];
                geometry = new Polygon({
                    rings: [ellipseGeometry],
                });
                symbol = {...ellipseSymbol, type: "simple-fill"};
                break;
            }
            case "circle": {
                const circleGeometry = new Circle({
                    center: new Point({
                        longitude: graphic.center.longitude,
                        latitude: graphic.center.latitude,
                    }),
                    radius: graphic.radius,
                }).rings[0];
                geometry = new Polygon({
                    rings: [circleGeometry],
                });
                symbol = {...circleSymbol, type: "simple-fill"};
                break;
            }
            case "polyline":
                geometry = new Polyline({
                    paths: [graphic.paths],
                });
                symbol = {...polylineSymbol, type: "simple-line"};
                break;
            case "polygon":
                geometry = new Polygon({
                    rings: [graphic.rings],
                });
                symbol = {...polygonSymbol, type: "simple-fill"};
                break;
            default:
                break;
        }
        if (geometry && symbol) {
            const newGraphic = new Graphic({
                geometry,
                symbol,
                attributes: {toolType: graphic.type}
            });
            set((state) => {
                state.graphics[graphic.type] = newGraphic.toJSON();
            });
        }
    },
    updateGraphic: (type, graphic) => {
        set((state) => {
            state.graphics[type] = graphic.toJSON();
        });
    },
    removeGraphic: (type) => {
        set((state) => {
            state.graphics[type] = undefined;
        });
    },
    getGraphic: (type) => {
        return Graphic.fromJSON(get().graphics[type])
    },
});
