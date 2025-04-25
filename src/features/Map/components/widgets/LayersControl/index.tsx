import { useWidget } from "@/features/Map/hooks/useWidget.ts";
import { Position } from "@/features/Map/types";
import Layers from "@/assets/layers.svg?react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { useMapStore } from "@/features/Map/stores/mapStore.ts";
import { useShallow } from "zustand/shallow";
import { layer, layerName } from "@/features/Map/types/map.type.ts";
import LayersControlItem from "./LayersControlItem";

interface LayersControl {
  position?: Position;
}

const LayersControl = (props: LayersControl) => {
  const { position } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { elementRef } = useWidget(position ?? "top-left");
  const layers = useMapStore(useShallow((state) => state.layers));

  return (
    <div ref={elementRef}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Layers className="btn" />
        </SheetTrigger>
        <SheetContent container={elementRef.current} className="bg-accent">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-zinc-700 text-center border-b-1 border-blue-800 pt-6 pb-3">
              ניהול שכבות
            </SheetTitle>
            {(Object.entries(layers) as [layerName, layer][]).map(
              ([layerName, layer]) => {
                return (
                  <LayersControlItem
                    key={layerName}
                    layer={layer}
                    layerName={layerName}
                  />
                );
              }
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default LayersControl;
