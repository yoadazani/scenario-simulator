import GraphicLayer from "@/contexts/GraphicLayer";
import MapContainer from "@/contexts/MapContainer";
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
import { useMapInteraction } from "./features/Map/stores/mapInteractionStore";
import { useShallow } from "zustand/shallow";

function App() {
  const { updateGraphic,removeGraphic } = useMapInteraction(
    useShallow((state) => {
      return {
        updateGraphic: state.updateGraphic,
        removeGraphic: state.removeGraphic,
      };
    })
  );

  return (
    <MapContainer>
      <MapZoom position="top-left" />

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
          availableTools={["point","polyline","polygon","ellipse"]}
          creationMode="update"
          onSketchCreate={(event,type) => {
            if (event.state === "complete") {
              updateGraphic(type,event.graphic);
            }
          }}
          onSketchUpdate={(event,type) => {
            if (event.state === "complete" && type) {
              updateGraphic(type,event.graphics[0]);
            }
          }}
          onSketchDelete={(_event,type) => {
            removeGraphic(type);
          }}
        />
      </GraphicLayer>

      <BaseMapGallery />

      <Layers />
    </MapContainer>
  );
}

export default App;
