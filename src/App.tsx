import GraphicLayer from "@/features/Map/contexts/GraphicLayer";
import MapContainer from "@/features/Map/contexts/MapContainer";
import MapZoom from "@/features/Map/components/widgets/Zoom";
import Sketch from "@/features/Map/components/widgets/Sketch";
import Layers from "@/features/Map/components/shared/Layers";
import BaseMapGallery from "@/features/Map/components/widgets/BaseMapGallery";
import {
    ellipseSymbol,
    markerSymbol,
    polygonSymbol,
    polylineSymbol,
    circleSymbol,
    rectangleSymbol,
} from "@/features/Map/constants/symbols";
import {useShallow} from "zustand/shallow";
import {useMapStore} from "@/features/Map/stores/mapStore.ts";
import Measurement from "@/features/Map/components/widgets/Measurement";

function App() {
    const {updateGraphic, removeGraphic} = useMapStore(
        useShallow((state) => {
            return {
                updateGraphic: state.updateGraphic,
                removeGraphic: state.removeGraphic,
            };
        })
    );

    return (
        <MapContainer>
            <MapZoom position="top-left"/>

            <GraphicLayer>
                <Sketch
                    position="top-left"
                    symbols={{
                        polylineSymbol,
                        polygonSymbol,
                        rectangleSymbol,
                        circleSymbol,
                        markerSymbol,
                        ellipseSymbol,
                    }}
                    availableTools={["point", "polyline", "polygon", "ellipse"]}
                    creationMode="update"
                    onSketchCreate={(event, type) => {
                        if (event.state === "complete") {
                            updateGraphic(type, event.graphic);
                        }
                    }}
                    onSketchUpdate={(event, type) => {
                        if (event.state === "complete" && type) {
                            updateGraphic(type, event.graphics[0]);
                        }
                    }}
                    onSketchDelete={(_event, type) => {
                        removeGraphic(type);
                    }}
                />
            </GraphicLayer>

            <BaseMapGallery/>

            <Layers/>

            <GraphicLayer>
                <Measurement />
            </GraphicLayer>
        </MapContainer>
    );
}

export default App;
