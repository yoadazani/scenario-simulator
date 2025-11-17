import {Fragment, memo, RefObject, useEffect, useMemo, useState} from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ListFilterPlusIcon} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {useAppForm} from "@/hooks/use-form-setup.ts";
import {ColumnDef, ColumnFiltersState, Table} from "@tanstack/react-table";
import {EMPTY_VALUES} from "@/constants";
import {buildDefaultValues, denormalizeId} from "@/utils/filters.ts";
import {FilterValue} from "@/types";

const baseStyle = "w-full border-input focus-visible:border-ring focus-visible:ring-ring/50 transition-all duration-200 ease-in-out hover:border-ring/70 shadow-sm hover:shadow"

const DataTableFilters = <TData, TValue>(props: {
    containerRef: RefObject<HTMLDivElement | null>,
    columns: ColumnDef<TData, TValue>[],
    table: Table<TData>,
    setColumnFilters: (columnFilters: ColumnFiltersState) => void,
    columnFilters: ColumnFiltersState,
    resetColumnFilters: () => void
}) => {

    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [defaultValues, setDefaultValues] = useState(buildDefaultValues(props.columnFilters))

    const columnsMap = useMemo(() => {
        return props.columns.reduce((map, column) => {
            const key = column.meta?.filterGroupKey ?? column.meta?.filterKey;
            if (!key) return map;
            if (!map.has(key as string)) map.set(key as string, []);
            map.get(key as string)!.push(column);
            return map;
        }, new Map<string, ColumnDef<TData, TValue>[]>());
    }, [props.columns]);

    const handleSubmit = ({value}: { value: Record<string, FilterValue> })=> {
        const allFilters: ColumnFiltersState = [];

        Object.entries(value).forEach(([key, val]) => {
            if (typeof val === 'object' && 'range' in val) {
                const {from, to} = val.range;
                allFilters.push({id: `${denormalizeId(key)}_gte`, value: from});
                allFilters.push({id: `${denormalizeId(key)}_lte`, value: to});
            } else {
                allFilters.push({id: `${denormalizeId(key)}`, value: val});
            }
        });

        props.setColumnFilters(allFilters);
    }

    const handleReset = () => {
        props.resetColumnFilters();
        setDefaultValues(buildDefaultValues(props.columnFilters, EMPTY_VALUES))
    }

    const form = useAppForm({
        defaultValues,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (props.containerRef.current) {
            setContainer(props.containerRef.current);
        }
    }, [props.containerRef]);

    useEffect(() => {
        form.reset(defaultValues, {keepDefaultValues: false});
    }, [defaultValues]);

    return <Sheet>
        <SheetTrigger asChild>
            <Button
                variant="outline"
                className="rounded-md border-input hover:bg-accent/50 hover:text-accent-foreground transition-colors duration-200"
            >
                <ListFilterPlusIcon className="size-4.5 text-primary cursor-pointer"/>
                <span className="sr-only">Open filters</span>
            </Button>
        </SheetTrigger>
        <SheetContent container={container} side={"left"} className="absolute">
            <SheetHeader className="border-b border-border text-center">
                <SheetTitle
                    className="text-xl font-semibold text-foreground">
                    חיפוש מתקדם
                </SheetTitle>
                <SheetDescription className="text-muted-foreground px-4 py-2 text-xs">
                    ניתן לסנן את הנתונים לפי מגוון קריטריונים. בחר את הסינונים הרצויים ולחץ על "החל סינון"
                </SheetDescription>
            </SheetHeader>
            <form
                className="overflow-y-auto max-h-[76vh] xl:max-h-[85vh] p-4 space-y-4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await form.handleSubmit();
                }}
            >
                {
                    Array.from(columnsMap).map(([key, columns]) => {
                        return (
                            <Fragment key={key}>
                                {
                                    columns.some(col => col.meta?.filterGroupLabel) &&
                                    <Label
                                        className="mb-2 block text-base font-semibold text-foreground/80 text-center">
                                        {columns[0].meta?.filterGroupLabel}
                                    </Label>
                                }
                                <div className="flex items-center justify-center gap-2">
                                    {columns.map(column => {
                                        return (
                                            <form.AppField
                                                key={column.id}
                                                name={column.id as string}
                                            >
                                                {(field) => {
                                                    if (!column.meta?.filterVariant) return null;
                                                    return <div className="flex flex-col w-full">
                                                        {(() => {
                                                            switch (column.meta.filterVariant) {
                                                                case "text":
                                                                    return (
                                                                        <field.TextInputField
                                                                            className={baseStyle}
                                                                            label={column.meta.filterLabel!}
                                                                        />
                                                                    );

                                                                case "number":
                                                                    return (
                                                                        <field.NumberInputField
                                                                            label={column.meta.filterLabel!}/>
                                                                    );

                                                                case "radio-group":
                                                                    return (
                                                                        <field.RadioGroupInputField
                                                                            label={column.meta.filterLabel!}
                                                                            options={column.meta.filterOptions}
                                                                        />
                                                                    );

                                                                case "classification":
                                                                    return (
                                                                        <field.ClassificationInputField
                                                                            label={column.meta.filterLabel!}
                                                                        />
                                                                    );

                                                                case "select":
                                                                    return (
                                                                        <field.SelectInputField
                                                                            label={column.meta.filterLabel!}
                                                                            className={baseStyle}
                                                                            options={column.meta.filterOptions}
                                                                        />
                                                                    );

                                                                case "multi-select":
                                                                    return (
                                                                        <field.MultiSelectInputField
                                                                            label={column.meta.filterLabel!}
                                                                            className={baseStyle}
                                                                            options={column.meta.filterOptions}
                                                                        />
                                                                    );

                                                                case "datetime-range":
                                                                    return (
                                                                        <field.DateRangeInputField
                                                                            label={column.meta.filterLabel!}
                                                                        />
                                                                    );

                                                                default:
                                                                    return null;
                                                            }
                                                        })()}
                                                    </div>
                                                }}
                                            </form.AppField>
                                        );
                                    })}
                                </div>
                            </Fragment>
                        );
                    })
                }
            </form>
            <SheetFooter className="flex flex-row-reverse gap-x-1 border-t border-border bg-card/80 rounded-b-lg">
                <Button
                    type="button"
                    variant="outline"
                    className="w-1/2"
                    onClick={handleReset}
                >
                    נקה סינון
                </Button>
                <Button
                    type="submit"
                    className="w-1/2"
                    onClick={form.handleSubmit}
                >
                    החל סינון
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
}

export default memo(DataTableFilters) as typeof DataTableFilters