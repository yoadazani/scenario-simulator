import GroupLayer from "@arcgis/core/layers/GroupLayer";
import { createContext, ReactNode, useEffect, useRef } from "react";
import { useParentLayer } from "@/features/Map/hooks/useParentLayer";

interface GroupChildProps {
  groupLayer: GroupLayer;
}

export const groupLayerContext = createContext<GroupChildProps | null>(null);

export const GroupsLayer = ({
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
    parentLayer.add(groupLayer.current);
    return () => {
      parentLayer.remove(groupLayer.current);
    };
  }, [groupLayer.current.id]);

  return (
    <groupLayerContext.Provider value={{ groupLayer: groupLayer.current }}>
      {children}
    </groupLayerContext.Provider>
  );
};

export default GroupLayer;