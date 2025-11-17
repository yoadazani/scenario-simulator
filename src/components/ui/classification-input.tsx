import {ComponentProps, memo, useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";

export const ClassificationInput = memo(({onUpdate, value}: { onUpdate?: (value: number) => void, value: number | string | undefined } & ComponentProps<"button">) => {
    const [selectedClassification, setSelectedClassification] = useState<number | undefined>(Number(value ?? -1));

    useEffect(() => {
        setSelectedClassification(Number(value));
    },[value])

    return <div className="flex items-center gap-2">
        {Array.from({length: 5}).map((_, index) => {
            return <Button
                key={index}
                size="icon"
                type="button"
                variant={selectedClassification === index + 1 ? "default" : "outline"}
                onClick={() => {
                    setSelectedClassification(index + 1)
                    onUpdate?.(index + 1)
                }}
                onDoubleClick={() => {
                    setSelectedClassification(-1)
                    onUpdate?.(-1)
                }}
            >
                {index + 1}
            </Button>
        })}
    </div>;
})