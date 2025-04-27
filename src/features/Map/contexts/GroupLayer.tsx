import GroupLayer from "@arcgis/core/layers/GroupLayer";
import { createContext, ReactNode, useEffect, useRef } from "react";
import { useParentLayer } from "@/features/Map/hooks/useParentLayer.ts";

interface GroupChildProps {
  groupLayer: GroupLayer;
}

export const groupLayerContext = createContext<GroupChildProps | null>(null);

const GroupsLayer = ({
  children,
  id,
  title = null,
  visible = true,
}: {
  children?: ReactNode;
  id?: string;
  title?: string | null;
  visible?: boolean;
}) => {
  const parentLayer = useParentLayer();
  const groupLayer = useRef(
    new GroupLayer({
      id,
      title,
    })
  );

  useEffect(() => {
    groupLayer.current.visible = visible;
  }, [visible]);

  useEffect(() => {
    const { current: layer } = groupLayer;
    parentLayer.add(layer);
    return () => {
      parentLayer.remove(layer);
    };
  }, [groupLayer.current.id, parentLayer]);

  return (
    <groupLayerContext.Provider value={{ groupLayer: groupLayer.current }}>
      {children}
    </groupLayerContext.Provider>
  );
};

export default GroupsLayer;