import * as React from "react";
import {
    addMonths,
    endOfDay,
    endOfMonth,
    endOfWeek,
    isEqual,
    startOfDay,
    startOfMonth,
    startOfWeek,
    subDays,
    subMonths,
} from "date-fns";
import DateRangePresetButton from "@/components/ui/date-range-preset-button.tsx";
import {DateTimeRange} from "@/components/ui/date-range-picker";
import {memo} from "react";

interface Preset {
    name: string;
    label: string;
}

const PRESETS: Preset[] = [
    {name: "last7", label: "7 ימים אחרונים"},
    {name: "last14", label: "14 יום אחרונים"},
    {name: "last30", label: "30 יום אחרונים"},
    {name: "thisWeek", label: "השבוע הנוכחי"},
    {name: "lastWeek", label: "שבוע אחרון"},
    {name: "thisMonth", label: "החודש הנוכחי"},
    {name: "lastMonth", label: "החודש האחרון"},
];

interface DateRangePresetsProps {
    range: DateTimeRange;
    setRange: React.Dispatch<React.SetStateAction<DateTimeRange>>;
    setCalendarMonths: React.Dispatch<React.SetStateAction<[Date, Date]>>;
}

const DateRangePresets = (props: DateRangePresetsProps) => {
    const {
        range,
        setRange,
        setCalendarMonths,
    } = props;
    const [selectedPreset, setSelectedPreset] = React.useState<string | undefined>(undefined);

    const getPresetRange = React.useCallback(
        (presetName: string): DateTimeRange => {
            const now = new Date();
            const today = startOfDay(now);
            const endToday = endOfDay(now);

            switch (presetName) {
                case "today":
                    return {from: today, to: endToday};
                case "yesterday": {
                    const yesterday = subDays(today, 1);
                    return {from: yesterday, to: endOfDay(yesterday)};
                }
                case "last7":
                    return {from: subDays(today, 6), to: endToday};
                case "last14":
                    return {from: subDays(today, 13), to: endToday};
                case "last30":
                    return {from: subDays(today, 29), to: endToday};
                case "thisWeek":
                    return {
                        from: startOfWeek(today, {weekStartsOn: 0}),
                        to: endToday,
                    };
                case "lastWeek": {
                    const lastWeekStart = startOfWeek(subDays(today, 7), {
                        weekStartsOn: 0,
                    });
                    const lastWeekEnd = endOfWeek(lastWeekStart, {weekStartsOn: 0});
                    return {
                        from: lastWeekStart,
                        to: lastWeekEnd,
                    };
                }
                case "thisMonth":
                    return {
                        from: startOfMonth(today),
                        to: endToday,
                    };
                case "lastMonth": {
                    const lastMonth = subMonths(today, 1);
                    return {
                        from: startOfMonth(lastMonth),
                        to: endOfMonth(lastMonth),
                    };
                }
                default:
                    throw new Error(`Unknown date range preset: ${presetName}`);
            }
        },
        [],
    );

    const setPreset = (preset: string): void => {
        const newRange = getPresetRange(preset);
        setRange(newRange);
        setSelectedPreset(preset);
        if (newRange.from) {
            setCalendarMonths([newRange.from, addMonths(newRange.from, 1)]);
        }
    };

    const checkPreset = React.useCallback(() => {
        if (!range.from || !range.to) return;


        if (selectedPreset) {
            const currentPresetRange = getPresetRange(selectedPreset);
            if (
                isEqual(startOfDay(range.from), startOfDay(currentPresetRange.from!)) &&
                isEqual(endOfDay(range.to), endOfDay(currentPresetRange.to!))
            ) {
                return; // Keep the current selection
            }
        }

        for (const preset of PRESETS) {
            const presetRange = getPresetRange(preset.name);
            if (
                isEqual(startOfDay(range.from), startOfDay(presetRange.from!)) &&
                isEqual(endOfDay(range.to), endOfDay(presetRange.to!))
            ) {
                setSelectedPreset(preset.name);
                return;
            }
        }
        setSelectedPreset(undefined);
    }, [range, getPresetRange]);

    React.useEffect(() => {
        checkPreset();
    }, [checkPreset]);

    return (
        <div className="lg:border-l lg:pl-4 space-y-2 lg:p-4 p-0">
            <h3 className="font-medium text-sm lg:p-0 p-2 text-center">העדפה אישית</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1 text-xs text-muted-foreground">
                {PRESETS.map((preset) => (
                    <DateRangePresetButton
                        key={preset.name}
                        preset={preset.name}
                        label={preset.label}
                        isSelected={selectedPreset === preset.name}
                        setPreset={setPreset}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(DateRangePresets)