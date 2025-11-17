import {useFieldContext} from "@/hooks/use-form-context.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {cn} from "@/utils";
import {NumberInput} from "@/components/ui/number-input.tsx";

export const NumberInputField = (props: { label: string, className?: string }) => {
    const {label, className} = props
    const field = useFieldContext<number | undefined>()

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                htmlFor={field.name}
                className="block font-medium text-foreground/60 text-sm"
            >
                {label}
            </FieldLabel>
            <NumberInput
                id={field.name}
                className={cn(className)}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
                onChange={e => field.handleChange(e.target.valueAsNumber)}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors}/>}
        </Field>
    )
}