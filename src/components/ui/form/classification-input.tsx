import {useFieldContext} from "@/hooks/use-form-context.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {ClassificationInput} from "@/components/ui/classification-input.tsx";

export const ClassificationInputField = (props: { label: string }) => {
    const {label} = props;
    const field = useFieldContext<number | undefined>();

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                htmlFor={field.name}
                className="block font-medium text-foreground/60 text-sm"
            >
                {label}
            </FieldLabel>
            <ClassificationInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                aria-invalid={isInvalid}
                onBlur={field.handleBlur}
                onUpdate={(value) => field.handleChange(value !== -1 ? value : undefined)}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors}/>}
        </Field>
    );
};