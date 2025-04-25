import {Ellipse} from "@/features/Map/types/map.type.ts";
import MapEllipse from "@/features/Map/components/Layers/Ellipse.tsx";

export const EllipseLayers = (props: {
    featureData: Ellipse[],
    symbol: __esri.SimpleFillSymbolProperties,
}) => {
    const {featureData, symbol} = props;
    return featureData.map((data) => (
        <MapEllipse
            key={data.id}
            symbol={symbol}
            {...data}
        />
    ));
}
