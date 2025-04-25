import { SheetDescription } from "@/components/ui/sheet.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useMapStore } from "@/features/Map/stores/mapStore.ts";
import { useShallow } from "zustand/shallow";
import { layer, layerName } from "@/features/Map/types/map.type.ts";
import ClusterToggle from "./ClusterToggle";

interface LayersControlItemProps {
  layer: layer;
  layerName: layerName;
}

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

export default LayersControlItem;