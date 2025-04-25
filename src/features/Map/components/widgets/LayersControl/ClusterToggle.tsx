import { Toggle } from "@/components/ui/toggle.tsx";
import ClusterOn from "@/assets/cluster-on.svg?react";
import ClusterOff from "@/assets/cluster-off.svg?react";

interface ClusterToggleProps {
  isCluster: boolean;
  onToggle: (value: boolean) => void;
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

export default ClusterToggle;