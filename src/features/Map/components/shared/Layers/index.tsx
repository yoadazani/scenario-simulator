import {useSuspenseQueries} from "@tanstack/react-query";
import {DistrictsQueryOptions} from "../../../queries/districts.query.tsx";
import {SubDistrictsQueryOptions} from "../../../queries/subdistricts.query.tsx";
import {EventsQueryOptions} from "../../../queries/events.query.tsx";
import {EllipsesQueryOptions} from "../../../queries/ellipses.query.tsx";
import {useShallow} from "zustand/shallow";
import {destrictSymbol, ellipseSymbol, markerSymbol, subdestrictSymbol,} from "../../../constants/symbols.ts";

import GroupsLayer from "@/features/Map/contexts/GroupLayer.tsx";
import GraphicLayer from "@/features/Map/contexts/GraphicLayer.tsx";
import FeaturesLayer from "@/features/Map/contexts/FeatureLayer.tsx";
import LayersControl from "../../widgets/LayersControl";

import {FeaturesGroupsData, OnlyFeatures, OnlyGraphics,} from "../../../types/map.type.ts";
import {featuresLayersComponents, graphicLayersComponents} from "@/features/Map/data/layers.tsx";
import {useMapStore} from "@/features/Map/stores/mapStore.ts";


const Layers = () => {
    const layers = useMapStore(useShallow((state) => state.layers));
    const [
        {data: districts = []},
        {data: subdistricts = []},
        {data: events = []},
        {data: ellipses = []},
    ] = useSuspenseQueries({
        queries: [
            DistrictsQueryOptions,
            SubDistrictsQueryOptions,
            EventsQueryOptions,
            EllipsesQueryOptions,
        ],
    });

    const featuresGroups: FeaturesGroupsData = {
        graphics: {
            districts: {type: "polygon", data: districts, symbol: destrictSymbol},
            subdistricts: {type: "polygon", data: subdistricts, symbol: subdestrictSymbol},
            ellipses: {type: "ellipse", data: ellipses, symbol: ellipseSymbol},
        },
        features: {events: {type: "point", data: events, symbol: markerSymbol}},
    };


    const getGraphicLayer = (
        key: OnlyGraphics,
        feature: typeof featuresGroups.graphics[OnlyGraphics],
    ) => {
        if (feature.type === "polygon")
            return graphicLayersComponents.polygon(key, feature.data, feature.symbol);
        if (feature.type === "ellipse")
            return graphicLayersComponents.ellipse(key, feature.data, feature.symbol);
        return null;
    };

    const getFeaturesLayer = (
        key: OnlyFeatures,
        feature: typeof featuresGroups.features[OnlyFeatures]
    ) => {
        if (feature.type === "point")
            return featuresLayersComponents.point(key, feature.data, feature.symbol);
        return null;
    }

    return (
        <GroupsLayer title="Layers" id="layers">
            <LayersControl/>;
            {Object.values(layers).map((layer) => {

                if (layer.type === "graphic") {
                    const layerId = layer.id as keyof typeof featuresGroups.graphics;
                    return (
                        <GraphicLayer
                            key={layer.id}
                            id={layer.id}
                            title={layer.title}
                            order={layer.order}
                            visible={layer.visible}
                        >
                            {getGraphicLayer(layerId, featuresGroups.graphics[layerId])}
                        </GraphicLayer>
                    );
                }

                if (layer.type === "feature") {
                    const layerId = layer.id as keyof typeof featuresGroups.features;
                    return (
                        <FeaturesLayer
                            key={layer.id}
                            id={layer.id}
                            title={layer.title}
                            order={layer.order}
                            visible={layer.visible}
                            isCluster={layer.isCluster}
                        >
                            {getFeaturesLayer(layerId, featuresGroups.features[layerId])}
                        </FeaturesLayer>
                    );
                }
            })}
        </GroupsLayer>
    );
};

export default Layers;