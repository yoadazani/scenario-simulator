import { useWidget } from "@/features/Map/hooks/useWidget";
import { Position } from "@/features/Map/types";
import Layers from "@/assets/layers.svg?react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useMapStore } from "@/features/Map/stores/mapStore";
import { Toggle } from "@/components/ui/toggle";
import ClusterOn from "@/assets/cluster-on.svg?react";
import ClusterOff from "@/assets/cluster-off.svg?react";
import { useShallow } from "zustand/shallow";
import { layer, layerName } from "@/features/Map/types/map.type.ts";

interface LayersControl {
  position?: Position;
}

interface ClusterToggleProps {
  isCluster: boolean;
  onToggle: (value: boolean) => void;
}

interface LayersControlItemProps {
  layer: layer;
  layerName: layerName;
}

const ClusterToggle = (props: ClusterToggleProps) => {
  const { isCluster, onToggle } = props;
  return (
    <Toggle pressed={isCluster} onPressedChange={onToggle}>
      {isCluster ? (
        <ClusterOn className="size-6 stroke-blue-800" />
      ) : (
        <ClusterOff className="size-6 stroke-zinc-500" />
      )}
    </Toggle>
  );
};

const LayersControlItem = (props: LayersControlItemProps) => {
  const { layer, layerName } = props;
  const { setVisibility, setCluster } = useMapStore(
    useShallow((state) => {
      return {
        setVisibility: state.setVisibility,
        setCluster: state.setCluster,
      };
    })
  );

  return (
    <SheetDescription className="p-4 w-full">
      <Label className="text-md font-bold text-blue-800 flex flex-row-reverse justify-between">
        {layer.title}
        <span className="flex flex-row-reverse gap-2 items-center">
          {layer.type === "feature" && (
            <ClusterToggle
              isCluster={layer.isCluster}
              onToggle={(value) => setCluster(layerName, value)}
            />
          )}
          <Switch
            checked={layer.visible}
            onCheckedChange={(value) => setVisibility(layerName, value)}
            className="data-[state=checked]:bg-blue-800 focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
          />
        </span>
      </Label>
    </SheetDescription>
  );
};

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
