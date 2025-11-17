import {MouseEvent, useEffect, useMemo, useRef, useState} from "react";
import {useFieldContext} from "@/hooks/use-form-context.ts";
import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {cn} from "@/utils";
import {Check, ChevronsUpDown, X} from "lucide-react";
import {Options} from "@/types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useVirtualizer} from "@tanstack/react-virtual"

export const SelectInputField = (props: {
    label: string,
    className?: string,
    options?: Options[]
}) => {
    const {label, className, options = []} = props
    const [search, setSearch] = useState("")
    const [items, setItems] = useState<Options[]>(options)

    const field = useFieldContext<string>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    const filteredOptions = useMemo(() => {
        return items.filter(opt =>
            opt.label.includes(search)
        )
    }, [options, search, items])

    const handleClear = (e: MouseEvent) => {
        e.stopPropagation();
        field.handleChange("")
    };

    const reorderItems = (selected: string, items: Options[]) => {
        setItems(prev => {
            const remaining = prev.filter(i => i.value != selected)
            const selectedItem = items.find(i => i.value == selected)
            if (!selectedItem) return prev
            return [selectedItem, ...remaining]
        })
        virtualizer.scrollToIndex(0, {behavior: "smooth"})
    }

    const scrollRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
        count: filteredOptions.length,
        estimateSize: () => 32,
        getScrollElement: () => scrollRef.current
    })

    const virtualItems = virtualizer.getVirtualItems()

    useEffect(() => {
        reorderItems(field.state.value, options)
    }, []);

    useEffect(() => {
        if (scrollRef.current) virtualizer.measure()
    }, [scrollRef]);

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                htmlFor={field.name}
                className="block font-medium text-foreground/60 text-sm"
            >
                {label}
            </FieldLabel>
            <div className="relative">
                <Popover modal={true}>
                    <PopoverTrigger
                        asChild
                        value={field.state.value}
                        name={field.name}
                        id={field.name}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className={cn(className)}
                    >
                        <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                        >
                            <span className="truncate pl-8">
                                {field.state.value && options.find((option) => option.value == field.state.value)?.label}
                            </span>
                            <ChevronsUpDown className="opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 min-w-[350px]" dir="rtl">
                        <Command shouldFilter={false}>
                            <CommandInput
                                placeholder="חיפוש..."
                                className="h-9"
                                value={search}
                                onValueChange={setSearch}
                            />
                            <CommandList
                                ref={scrollRef}
                                className="max-h-[350px] w-full overflow-y-auto"
                            >
                                <CommandEmpty>לא נמצאו נתונים</CommandEmpty>
                                <CommandGroup className="relative" style={{height: `${virtualizer.getTotalSize()}px`}}>
                                    {virtualItems.map((vItem) => {
                                        const item = filteredOptions[vItem.index]
                                        return <CommandItem
                                            key={vItem.key}
                                            value={`${item.value} ${item.label}`}
                                            className="w-full flex items-center justify-between absolute top-0 left-0"
                                            onSelect={() => {
                                                reorderItems(`${item.value}`, options)
                                                field.handleChange(item.value as string)
                                            }}
                                            style={{
                                                transform: `translateY(${vItem.start}px)`,
                                                height: `${vItem.size}px`
                                            }}
                                        >
                                            <span className="w-full pl-2 truncate">{item.label}</span>
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    field.state.value === item.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    })}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
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
    )
}