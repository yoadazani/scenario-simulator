import {Event} from "@/features/Map/types/map.type.ts";
import MapMarker from "@/features/Map/components/Graphics/Marker.tsx";
import {uuidToInt} from "@/features/Map/utils";

export const PointLayers = (props: {
    featureData: Event[],
    symbol: __esri.PictureMarkerSymbolProperties,
}) => {
    const {featureData, symbol} = props;
    return featureData.map((data) => {
        const id = uuidToInt(data.event?.id)
        return <MapMarker
            key={data.event?.id}
            attributes={{...data.event, id}}
            point={data.event.location}
            symbol={symbol}
        />
    })
}