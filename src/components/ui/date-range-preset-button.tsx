import {Button} from "@/components/ui/button";
import {cn} from "@/utils";
import {CheckIcon} from "lucide-react";
import {memo} from "react";

interface PresetButtonProps {
    preset: string;
    label: string;
    isSelected: boolean;
    setPreset: (preset: string) => void;
}

const DateRangePresetButton = (props: PresetButtonProps) => {
    const {
        preset,
        label,
        isSelected,
        setPreset,
    } = props;

    return <Button
        dir="rtl"
        className={cn("justify-start", isSelected && "bg-muted")}
        variant="ghost"
        onClick={() => setPreset(preset)}
    >
        {label}
        <CheckIcon
            className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
        />
    </Button>
};

export default memo(DateRangePresetButton)