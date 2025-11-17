import {useFieldContext} from "@/hooks/use-form-context.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {cn} from "@/utils";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Options} from "@/types";

export const RadioGroupInputField = (props: { label: string, className?: string, options?: Options[] }) => {
    const {label, className, options = []} = props
    const field = useFieldContext<string | undefined>()

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                htmlFor={field.name}
                className="block font-medium text-foreground/60 text-sm"
            >
                {label}
            </FieldLabel>
            <RadioGroup
                className={cn("flex flex-row-reverse gap-4", className)}
                onValueChange={(e) => field.handleChange(e)}
                value={`${field.state.value}`}
                onBlur={field.handleBlur}
                name={field.name}
                id={field.name}
                aria-invalid={isInvalid}
            >
                {options.map(option => {
                    return <div
                        key={option.value}
                        className="flex items-center space-x-2"
                        onDoubleClick={() => {
                            if (field.state.value === `${option.value}`) {
                                field.handleChange(undefined);
                            }
                        }}
                    >
                        <RadioGroupItem
                            value={`${option.value}`}
                            id={`${option.value}`}
                        />
                        <Label
                            htmlFor={`${option.value}`}
                        >
                            {option.label}
                        </Label>
                    </div>
                })}
            </RadioGroup>
            {isInvalid && <FieldError errors={field.state.meta.errors}/>}
        </Field>
    )
}