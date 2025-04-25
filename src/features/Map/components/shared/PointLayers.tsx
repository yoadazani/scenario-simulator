import {Event} from "@/features/Map/types/map.type.ts";
import MapMarker from "@/features/Map/components/Layers/Marker.tsx";

export const PointLayers = (props: {
    featureData: Event[],
    symbol: __esri.PictureMarkerSymbolProperties,
}) => {
    const {featureData, symbol} = props;
    return featureData.map((data) => (
        <MapMarker key={data.id} {...data} symbol={symbol}/>
    ))
}