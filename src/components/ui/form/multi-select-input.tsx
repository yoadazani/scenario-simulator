import {useFieldContext} from "@/hooks/use-form-context.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {Options} from "@/types";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select"
import {MouseEvent, useEffect, useMemo, useRef, useState} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";
import {cn} from "@/utils";
import {X} from "lucide-react";

export const MultiSelectInputField = (props: {
    label: string;
    className?: string;
    options?: Options[];
}) => {
    const {label, className, options = []} = props;
    const field = useFieldContext<string>();
    const [search, setSearch] = useState("")
    const [items, setItems] = useState<Options[]>(options)

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    const filteredOptions = useMemo(() => {
        return items.filter(opt => opt.label.includes(search))
    }, [options, search, items])

    const handleClear = (e: MouseEvent) => {
        e.stopPropagation();
        field.handleChange("")
    };

    const reorderItems = (selected: string[], items: Options[] ) => {
        setItems(prev => {
            const remaining = prev.filter(i => !selected?.includes(i.value as string))
            const selectedItems = items.filter(i => selected?.includes(i.value as string))
            return [...selectedItems, ...remaining]
        });

        if (virtualizer.scrollOffset > 0) {
            virtualizer.scrollToOffset(0, {behavior: "smooth"})
        }
    }

    const scrollRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
        count: filteredOptions.length,
        estimateSize: () => 32,
        getScrollElement: () => scrollRef.current
    })

    const virtualItems = virtualizer.getVirtualItems()

    useEffect(() => {
        reorderItems(field.state.value?.split(','), options)
    }, []);

    useEffect(() => {
        if (scrollRef.current) virtualizer.measure()
    }, [scrollRef.current]);

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                htmlFor={field.name}
                className="block font-medium text-foreground/60 text-sm"
            >
                {label}
            </FieldLabel>
            <div className="relative">
                <MultiSelect
                    initialItems={options}
                    values={field.state.value !== '' ? field.state.value?.split(",") : []}
                    onValuesChange={(values) => {
                        reorderItems(values, options)
                        field.handleChange(values.join(","))
                    }}
                >
                    <MultiSelectTrigger
                        name={field.name}
                        id={field.name}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className={cn(className)}
                    >
                        <MultiSelectValue clickToRemove={false} overflowBehavior="cutoff"/>
                    </MultiSelectTrigger>
                    <MultiSelectContent dir="rtl" shouldFilter={false} value={search} onValueChange={setSearch}>
                        <div ref={scrollRef} className="max-h-[350px] w-full overflow-y-auto">
                            <MultiSelectGroup className="relative" style={{height: `${virtualizer.getTotalSize()}px`}}>
                                {virtualItems.map((vItem) => {
                                    const item = filteredOptions[vItem.index]
                                    return <MultiSelectItem
                                        key={vItem.key}
                                        value={`${item.value}`}
                                        className="w-full flex flex-row-reverse items-center justify-between absolute top-0 left-0"
                                        style={{
                                            transform: `translateY(${vItem.start}px)`,
                                            height: `${vItem.size}px`
                                        }}
                                    >
                                        {item.label}
                                    </MultiSelectItem>
                                })}
                            </MultiSelectGroup>
                        </div>
                    </MultiSelectContent>
                </MultiSelect>
                {field.state.value && (
                    <div
                        className="pl-2 ml-1 border-l-1 transition-opacity absolute left-8 top-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto">
                        <X
                            className="size-4 opacity-25 border-muted-foreground hover:opacity-75 "
                            onClick={handleClear}
                        />
                    </div>
                )}
            </div>

            {isInvalid && <FieldError errors={field.state.meta.errors}/>}
        </Field>
    );
};
