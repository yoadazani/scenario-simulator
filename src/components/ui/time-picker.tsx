"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import {memo} from "react";

interface TimeInputProps {
    value?: Date;
    onChange: (date: Date) => void;
    disabled?: boolean;
    className?: string;
}

interface TimeParts {
    hours: number;
    minutes: number;
}

const TimePicker = (props: TimeInputProps) => {
    const {value, onChange, disabled = false, className} = props;

    const [time, setTime] = React.useState<TimeParts>(() => {
        const d = value ? new Date(value) : new Date();
        const hours = d.getHours();
        return {
            hours: hours,
            minutes: d.getMinutes(),
        };
    });

    const hoursRef = React.useRef<HTMLInputElement | null>(null);
    const minutesRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (value) {
            const d = value;
            const hours = d.getHours();
            const minutes = d.getMinutes();
            setTime({hours, minutes});
        }
    }, [value]);

    const updateTime = (newTime: TimeParts) => {
        if (disabled) return;

        const currentDate = value ? new Date(value) : new Date();
        currentDate.setHours(newTime.hours);
        currentDate.setMinutes(newTime.minutes);
        currentDate.setSeconds(0);

        onChange(currentDate);
        setTime(newTime);
    };

    const handleInputChange =
        (field: keyof TimeParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled) return;

            const value = e.target.value.replace(/\D/g, "");
            if (!value) return;

            let numValue = Number.parseInt(value, 10);

            if (field === "hours") {
                if (numValue < 0) numValue = 0;
                else if (numValue > 23) numValue = 0;
            } else if (field === "minutes") {
                if (numValue < 0) numValue = 0;
                else if (numValue > 59) numValue = 0;
            }

            updateTime({ ...time, [field]: numValue });
        };

    const incrementHours = () => {
        if (disabled) return;
        const newHours = time.hours === 23 ? 0 : time.hours + 1;
        updateTime({ ...time, hours: newHours });
    };

    const decrementHours = () => {
        if (disabled) return;
        const newHours = time.hours === 0 ? 23 : time.hours - 1;
        updateTime({ ...time, hours: newHours });
    };

    const incrementMinutes = () => {
        if (disabled) return;
        const newMinutes = time.minutes === 59 ? 0 : time.minutes + 1;
        updateTime({ ...time, minutes: newMinutes });
    };

    const decrementMinutes = () => {
        if (disabled) return;
        const newMinutes = time.minutes === 0 ? 59 : time.minutes - 1;
        updateTime({ ...time, minutes: newMinutes });
    };

    const formatTimeValue = (value: number): string => {
        return value.toString().padStart(2, "0");
    };

    return (
        <div
            className={cn(
                "flex items-center space-x-1 rounded-md border p-1 justify-evenly",
                className,
            )}
        >
            <div className="flex flex-col items-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-4 cursor-pointer"
                    onClick={incrementHours}
                    disabled={disabled}
                >
                    <ChevronUp className="size-4" />
                </Button>
                <Input
                    ref={hoursRef}
                    type="text"
                    inputMode="numeric"
                    value={formatTimeValue(time.hours)}
                    onChange={handleInputChange("hours")}
                    className="w-10 border-0 text-center focus:outline-none focus:ring-0 p-0 disabled:opacity-50"
                    disabled={disabled}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-4 cursor-pointer"
                    onClick={decrementHours}
                    disabled={disabled}
                >
                    <ChevronDown className="size-4" />
                </Button>
            </div>
            <span className="text-sm font-medium">:</span>
            <div className="flex flex-col items-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-4 cursor-pointer"
                    onClick={incrementMinutes}
                    disabled={disabled}
                >
                    <ChevronUp className="size-4" />
                </Button>
                <Input
                    ref={minutesRef}
                    type="text"
                    inputMode="numeric"
                    value={formatTimeValue(time.minutes)}
                    onChange={handleInputChange("minutes")}
                    className="w-10 border-0 text-center focus:outline-none focus:ring-0 p-0 disabled:opacity-50"
                    disabled={disabled}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-4 cursor-pointer"
                    onClick={decrementMinutes}
                    disabled={disabled}
                >
                    <ChevronDown className="size-4" />
                </Button>
            </div>
        </div>
    );
};

export default memo(TimePicker)
