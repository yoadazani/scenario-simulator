import {cn} from "@/utils";
import {Input} from "@/components/ui/input.tsx";
import {ComponentProps} from "react";

type NumberInputProps = ComponentProps<"input"> & {
    className?: string,
}

export const NumberInput = (props: NumberInputProps) => (
    <Input
        {...props}
        type="number"
        className={cn(
            "w-full border-input focus-visible:border-ring focus-visible:ring-ring/50",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            "transition-all duration-200 ease-in-out",
            "hover:border-ring/70",
            "shadow-sm hover:shadow", props.className)}
        min={0}
        onPaste={e => {
            if (isNaN((e.target as HTMLInputElement).valueAsNumber)) {
                e.preventDefault();
            }
        }}
        onKeyDown={(e) => {
            if (/^[eE\-+]$/.test(e.key)) {
                e.preventDefault();
            }
        }}
        onWheel={(e) => {
            e.stopPropagation();
        }}
    />
);