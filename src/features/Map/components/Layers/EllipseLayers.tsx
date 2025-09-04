import {RocketAttack} from "@/features/Map/types/map.type";
import MapEllipse from "@/features/Map/components/Graphics/Ellipse";
import {uuidToInt} from "@/features/Map/utils";

export const EllipseLayers = (props: {
    featureData: RocketAttack[],
    symbol: __esri.SimpleFillSymbolProperties,
}) => {
    const {featureData, symbol} = props;
    return featureData.map((data) => {
        const id = uuidToInt(data.id)
        return <MapEllipse
            key={data.id}
            symbol={symbol}
            center={data.location}
            xaxsis={data.radiusXMeters}
            yaxsis={data.radiusYMeters}
            attributes={{...data, id}}
            rotation={data.azimut}
        />
    });
}
