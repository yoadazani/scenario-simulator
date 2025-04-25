import {DistrictAndSubdistrict, Ellipse, Event, OnlyFeatures, OnlyGraphics} from "@/features/Map/types/map.type.ts";
import {PolygonLayers} from "@/features/Map/components/shared/PolygonLayers.tsx";
import {EllipseLayers} from "@/features/Map/components/shared/EllipseLayers.tsx";
import {PointLayers} from "@/features/Map/components/shared/PointLayers.tsx";


const graphicLayersComponents = {
    polygon: (key: OnlyGraphics, data: DistrictAndSubdistrict[], symbol: __esri.SymbolProperties) => (
        <PolygonLayers
            key={key}
            featureData={data}
            symbol={symbol as __esri.SimpleFillSymbolProperties}
        />
    ),
    ellipse: (key: OnlyGraphics, data: Ellipse[], symbol: __esri.SymbolProperties) => (
        <EllipseLayers
            key={key}
            featureData={data}
            symbol={symbol as __esri.SimpleFillSymbolProperties}
        />
    ),
} as const;

const featuresLayersComponents = {
    point: (key: OnlyFeatures, data: Event[], symbol: __esri.SymbolProperties) => (
        <PointLayers
            key={key}
            featureData={data}
            symbol={symbol as __esri.PictureMarkerSymbolProperties}
        />
    ),
} as const;

export {graphicLayersComponents, featuresLayersComponents};