import { Toggle } from "@/components/ui/toggle";
import ClusterOn from "@/assets/icons/cluster-on.svg?react";
import ClusterOff from "@/assets/icons/cluster-off.svg?react";

interface ClusterToggleProps {
  isCluster: boolean;
  onToggle: (value: boolean) => void;
}

const ClusterToggle = (props: ClusterToggleProps) => {
  const { isCluster, onToggle } = props;
  return (
    <Toggle pressed={isCluster} onPressedChange={onToggle}>
      {isCluster ? (
        <ClusterOn className="size-6 stroke-primary" />
      ) : (
        <ClusterOff className="size-6 stroke-zinc-500" />
      )}
    </Toggle>
  );
};

export default ClusterToggle;