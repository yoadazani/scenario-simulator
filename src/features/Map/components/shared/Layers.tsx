import {GroupsLayer} from "@/contexts/GroupLayer";

import {useMapStore} from "@/features/Map/stores/mapStore";
import {useSuspenseQueries} from "@tanstack/react-query";
import {DisrictsQueryOptions} from "../../queries/districts.query";
import {SubdisrictsQueryOptions} from "../../queries/subdistricts.query";
import {EventsQueryOptions} from "../../queries/events.query";
import {EllipsesQueryOptions} from "../../queries/ellipses.query";
import {useShallow} from "zustand/shallow";
import {destrictSymbol, ellipseSymbol, markerSymbol, subdestrictSymbol,} from "../../constants/symbols";

import GraphicLayer from "@/contexts/GraphicLayer";
import FeaturesLayer from "@/contexts/FeatureLayer";
import LayersControl from "../widgets/LayersControl";

import {FeaturesGroupsData, OnlyFeatures, OnlyGraphics,} from "../../types/map.type.ts";
import {featuresLayersComponents, graphicLayersComponents} from "@/features/Map/data/layers.tsx";


const Layers = () => {
    const layers = useMapStore(useShallow((state) => state.layers));
    const [
        {data: districts = []},
        {data: subdistricts = []},
        {data: events = []},
        {data: ellipses = []},
    ] = useSuspenseQueries({
        queries: [
            DisrictsQueryOptions,
            SubdisrictsQueryOptions,
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