import {createFormHook} from "@tanstack/react-form";
import {fieldContext, formContext} from "@/hooks/use-form-context.ts";
import {TextInputField} from "@/components/ui/form/text-input.tsx";
import {NumberInputField} from "@/components/ui/form/number-input.tsx";
import {RadioGroupInputField} from "@/components/ui/form/radio-group-input.tsx";
import {SelectInputField} from "@/components/ui/form/select-input.tsx";
import {DateRangeInputField} from "@/components/ui/form/date-range-input.tsx";
import {ClassificationInputField} from "@/components/ui/form/classification-input.tsx";
import {MultiSelectInputField} from "@/components/ui/form/multi-select-input.tsx";

export const {useAppForm, withForm, withFieldGroup} = createFormHook({
    fieldComponents: {
        TextInputField,
        NumberInputField,
        RadioGroupInputField,
        SelectInputField,
        MultiSelectInputField,
        DateRangeInputField,
        ClassificationInputField
    },
    formComponents: {},
    fieldContext,
    formContext,
})
