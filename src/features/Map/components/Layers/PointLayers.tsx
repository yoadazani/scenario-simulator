import MapMarker from "@/features/Map/components/Graphics/Marker";
import {uuidToInt} from "@/features/Map/utils";
import {Event} from "@/features/Events/types";

export const PointLayers = (props: {
    featureData: Event[],
    symbol: __esri.PictureMarkerSymbolProperties,
}) => {
    const {featureData, symbol} = props;
    return featureData.map((data) => {
        const id = uuidToInt(data.id)
        return <MapMarker
            key={data.id}
            attributes={{...data.event, id}}
            point={data.event.location}
            symbol={symbol}
        />
    })
}