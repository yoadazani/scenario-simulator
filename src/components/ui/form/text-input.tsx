import {useFieldContext} from "@/hooks/use-form-context.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {cn} from "@/utils";
import {Input} from "@/components/ui/input.tsx";

export const TextInputField = (props: { label: string, className?: string }) => {
    const {label, className} = props
    const field = useFieldContext<string>()

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                htmlFor={field.name}
                className="block font-medium text-foreground/60 text-sm"
            >
                {label}
            </FieldLabel>
            <Input
                type="text"
                className={cn(className)}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors}/>}
        </Field>
    )
}