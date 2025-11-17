import TimePicker from "./time-picker";
import {DateTimeRange} from "./date-range-picker";
import {memo} from "react";

interface TimePickerSectionProps {
    range: DateTimeRange;
    onChange: (field: "from" | "to") => (date: Date) => void;
}

const DateRangeTimePicker = (props: TimePickerSectionProps) => {
    const {range, onChange} = props;
    return (
        <div className="flex items-center gap-4 text-center">
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-xs font-medium">
                    שעת סיום
                </label>
                <TimePicker
                    value={range.to}
                    onChange={onChange("to")}
                />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-xs font-medium">
                    שעת התחלה
                </label>
                <TimePicker
                    value={range.from}
                    onChange={onChange("from")}
                />
            </div>
        </div>
    );
};

export default memo(DateRangeTimePicker)