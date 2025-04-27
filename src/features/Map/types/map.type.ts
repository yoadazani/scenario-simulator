import {MapLayersState} from "@/features/Map/stores/mapLayersSlice.ts";
import {KeyOfType} from "@/types";
import SimpleFillSymbolProperties = __esri.SimpleFillSymbolProperties;
import SimpleMarkerSymbolProperties = __esri.SimpleMarkerSymbolProperties;
import PictureMarkerSymbolProperties = __esri.PictureMarkerSymbolProperties;
export type BaseLayer = {
    id: string;
    title: string;
    visible: boolean;
    order: number;
};

export type FeatureLayer = BaseLayer & {
    isCluster: boolean;
    type: "feature";
};

export type GraphicLayer = BaseLayer & { type: "graphic" };

export type layerName = keyof MapLayersState["layers"];

export type layer = GraphicLayer | FeatureLayer;

export type BaseMapGalleryItem = {
    id: string;
    type: "vector" | "imagery";
    title: string;
    thumbnailUrl?: string;
    baseLayerUrl: string;
};


type GeoPoint = {
    latitude: number;
    longitude: number;
};

type BaseItem = {
    id: number;
    attributes: {
        id: number;
        name: string;
    };
};

export type Event = BaseItem & {
    point: GeoPoint;
    width: string;
    height: string;
};

export type Ellipse = BaseItem & {
    center: GeoPoint;
    xaxsis: number;
    yaxsis: number;
    rotation: number;
};

export type DistrictAndSubdistrict = {
    id: number;
    name: string;
    geometry: number[][];
};

export type OnlyGraphics = KeyOfType<MapLayersState["layers"], GraphicLayer>
export type OnlyFeatures = KeyOfType<MapLayersState["layers"], FeatureLayer>

export type FeaturesGroupsData = {
    graphics: Record<
        OnlyGraphics,
        | { type: "polygon"; data: DistrictAndSubdistrict[]; symbol: SimpleFillSymbolProperties }
        | { type: "ellipse"; data: Ellipse[]; symbol: SimpleFillSymbolProperties }
    >;
    features: Record<
        OnlyFeatures,
        { type: "point"; data: Event[]; symbol: SimpleMarkerSymbolProperties | PictureMarkerSymbolProperties }
    >;
};