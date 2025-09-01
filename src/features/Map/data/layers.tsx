import {
    DistrictAndSubdistrict,
    OnlyFeatures,
    OnlyGraphics,
    RocketAttack
} from "@/features/Map/types/map.type.ts";
import {PolygonLayers} from "@/features/Map/components/Layers/PolygonLayers.tsx";
import {EllipseLayers} from "@/features/Map/components/Layers/EllipseLayers.tsx";
import {PointLayers} from "@/features/Map/components/Layers/PointLayers.tsx";
import {Event} from "@/features/Events/types";


const graphicLayersComponents = {
    polygon: (key: OnlyGraphics, data: DistrictAndSubdistrict[], symbol: __esri.SymbolProperties) => (
        <PolygonLayers
            key={key}
            featureData={data}
            symbol={symbol as __esri.SimpleFillSymbolProperties}
        />
    ),
    ellipse: (key: OnlyGraphics, data: RocketAttack[], symbol: __esri.SymbolProperties) => (
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