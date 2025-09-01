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
    fields: __esri.FieldProperties[];
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
    } & Record<string, unknown>;
};

export enum SendingStatusEnum {
    Pending = "Pending",
    Sent = "Sent",
    Failed = "Failed",
    On_Hold = "On_Hold"
}

export type Event = {
    event: {
        id: string;
        cityId: number;
        name: string;
        location: { latitude: number, longitude: number };
        startDate: Date;
        responsibleJournal: number;
        status: number;
        generator: number;
        eventType: number;
        isUrbanArea: boolean;

        // optional fields
        description?: string;
        endDate?: Date;
        damageLevel?: number;
        lifeSavingPotential?: number;
        allocatedStatus?: number;
        classification?: number;
        permittedJournal?: string;
        permittedEditingJournalsIds?: string;

        seriousInjuries?: number; // חרדה
        minorInjuries?: number; // קל
        moderateInjuries?: number; // בינוני
        severeInjuries?: number; // קשה
        trappedInjuries?: number; // לכודים
        fatalInjuries?: number; // הרוגים
    }
    address?: string;
    scheduling_sending_time: Date;
    sendingStatus: SendingStatusEnum;
    source: number;
    isVibe?: boolean | null;
}

export type Location = {
    latitude: number;
    longitude: number;
}

export type RocketAttack = {
    id: string;
    scheduling_sending_time: Date;
    sendingStatus?: SendingStatusEnum;

    MissileType: number;
    MissileTypeName: string;
    missileCategory: number
    missileCategoryName: string;
    source: number
    SourceName: string;
    location: Location,
    radiusXMeters: number;
    radiusYMeters: number;
    azimut: number;

    vibeBarrages?: Location[];
    barrageRadius?: number;
    numberVibeBarrages?: number;
    eventsNumber?: number;
}

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
        | { type: "ellipse"; data: RocketAttack[]; symbol: SimpleFillSymbolProperties }
    >;
    features: Record<
        OnlyFeatures,
        { type: "point"; data: Event[]; symbol: SimpleMarkerSymbolProperties | PictureMarkerSymbolProperties }
    >;
};