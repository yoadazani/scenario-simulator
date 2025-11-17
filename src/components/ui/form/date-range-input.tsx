import {useFieldContext} from "@/hooks/use-form-context.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {cn} from "@/utils";
import DateTimeRangePicker, {DateTimeRange} from "@/components/ui/date-range-picker.tsx";

export const DateRangeInputField = (props: { label: string, className?: string }) => {
    const {label, className} = props
    const field = useFieldContext<{range: DateTimeRange}>()

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                htmlFor={field.name}
                className="block font-medium text-foreground/60 text-sm"
            >
                {label}
            </FieldLabel>
            <DateTimeRangePicker
                className={cn("w-full border-input focus-visible:border-ring focus-visible:ring-ring/50",
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    "transition-all duration-200 ease-in-out",
                    "hover:border-ring/70",
                    "shadow-sm hover:shadow", className)}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onUpdate={(values) => field.handleChange(values)}
                initialDateFrom={field.state.value?.range.from}
                initialDateTo={field.state.value?.range.to}
                aria-invalid={isInvalid}
                align={"end"}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors}/>}
        </Field>
    )
}