"use client";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {cn, convertToIsraelDateFormat} from "@/utils";
import {addMonths} from "date-fns";
import {he, type Locale} from "date-fns/locale";
import {CalendarIcon} from "lucide-react";
import * as React from "react";
import {Badge} from "@/components/ui/badge.tsx";
import DateRangePresets from "@/components/ui/date-range-presets";
import DateRangeTimePicker from "@/components/ui/date-range-time-picker.tsx";
import {ComponentProps, useEffect} from "react";
import {EMPTY_VALUES} from "@/constants";

export interface DateTimeRange {
    from: Date | undefined;
    to: Date | undefined;
}


export type DateTimeRangePickerProps =  ComponentProps<"button"> & {
    onUpdate?: (values: { range: DateTimeRange }) => void;
    initialDateFrom?: Date | string;
    initialDateTo?: Date | string;
    align?: "start" | "center" | "end";
    locale?: Locale;
    className?: string;
}

const getDateAdjustedForTimezone = (
    dateInput: Date | string | undefined,
): Date | undefined => {
    if (!dateInput) return undefined;
    return new Date(dateInput);
};

const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = (props) => {
    const {
        initialDateFrom,
        initialDateTo,
        onUpdate,
        align = "center",
        locale = he,
        className,
        ...rest
    } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const [range, setRange] = React.useState<DateTimeRange>({} as DateTimeRange);

    const openedRangeRef = React.useRef<DateTimeRange>(range);
    const [calendarMonths, setCalendarMonths] = React.useState<[Date, Date]>([
        new Date(),
        addMonths(new Date(), 1),
    ]);

    const resetValues = (empty: boolean = false): void => {
        setRange({
            from: empty ? '' : getDateAdjustedForTimezone(initialDateFrom),
            to: empty ? '' : getDateAdjustedForTimezone(initialDateTo),
        });
        setCalendarMonths(empty ? [] : [new Date(), addMonths(new Date(), 1)]);
    };

    useEffect(() => {
        if (isOpen) {
            openedRangeRef.current = range;
        }
    }, [isOpen, range]);

    useEffect(() => {
        setRange({
            from: getDateAdjustedForTimezone(initialDateFrom),
            to: getDateAdjustedForTimezone(initialDateTo),
        })
    }, [initialDateFrom, initialDateTo]);

    const handleTimeChange = React.useCallback((field: "from" | "to") => (date: Date) => {
        setRange((prev) => ({...prev, [field]: date}));
    }, []);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <div
                className={cn(
                    "w-full h-fit justify-start gap-x-4 font-normal hover:bg-transparent cursor-default flex items-center rounded-md border p-2 text-muted-foreground",
                    className
                )}
            >
                <PopoverTrigger asChild {...rest}>
                    <button className="p-0 border-0 bg-transparent cursor-pointer">
                        <CalendarIcon className="size-4 mx-1"/>
                    </button>
                </PopoverTrigger>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-xs font-semibold">מתאריך:</span>
                        <Badge variant="secondary" className="min-w-54">
                            {range.from ? convertToIsraelDateFormat(range.from) : "בחר תאריך התחלה"}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-xs font-semibold">עד תאריך:</span>
                        <Badge variant="secondary" className="min-w-54">
                            {range.to ? convertToIsraelDateFormat(range.to) : "בחר תאריך סיום"}
                        </Badge>
                    </div>
                </div>
            </div>
            <PopoverContent className="w-auto p-0" align={align} sideOffset={32} alignOffset={-72}>
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Calendar Section */}
                    <div className="space-y-4 p-4">
                        <div>
                            <Calendar
                                mode="range"
                                selected={range}
                                locale={locale}
                                onSelect={(newRange) =>
                                    newRange && setRange(newRange as DateTimeRange)
                                }
                                month={calendarMonths[0]}
                                onMonthChange={(month) =>
                                    setCalendarMonths([month, addMonths(month, 1)])
                                }
                                className="border rounded-md text-muted-foreground"
                            />
                        </div>

                        <DateRangeTimePicker
                            range={range}
                            onChange={handleTimeChange}
                        />
                    </div>

                    <DateRangePresets
                        range={range}
                        setRange={setRange}
                        setCalendarMonths={setCalendarMonths}
                    />
                </div>

                {/* Footer Actions */}
                <div className="flex flex-row-reverse justify-between items-center p-4 border-t">
                    <div className="flex items-center justify-end gap-2 ">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIsOpen(false);
                                resetValues();
                            }}
                        >
                            בטל
                        </Button>
                        <Button
                            onClick={() => {
                                setIsOpen(false);
                                onUpdate?.({range});
                            }}
                        >
                            עדכן
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsOpen(false);
                            resetValues(EMPTY_VALUES)
                            onUpdate?.({range: {from: undefined, to: undefined}});
                        }}
                    >
                        נקה
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default DateTimeRangePicker;