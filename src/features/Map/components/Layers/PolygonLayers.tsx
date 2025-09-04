import {DistrictAndSubdistrict} from "@/features/Map/types/map.type";
import MapPolygon from "@/features/Map/components/Graphics/Polygon";
import {labelSymbol} from "@/features/Map/constants/symbols";

export const PolygonLayers = (props: {
    featureData: DistrictAndSubdistrict[],
    symbol: __esri.SimpleFillSymbolProperties,
}) => {
    const {featureData, symbol} = props;
    return featureData.map((data) => (
        <MapPolygon
            key={data.id}
            rings={data.geometry}
            attributes={{
                id: data.id,
                name: data.name,
            }}
            symbol={symbol}
            label={data.name}
            labelSymbol={labelSymbol}
        />
    ));
}
