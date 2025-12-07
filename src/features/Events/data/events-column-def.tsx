import {
    AccessorFnColumnDef,
    AccessorKeyColumnDef,
    createColumnHelper,
    DisplayColumnDef,
    RowData,
} from "@tanstack/react-table";
import {Event} from "@/features/Events/types";
import {convertToIsraelDateFormat} from "@/utils";
import Translation from "@/components/shared/Translation.tsx";
import DataTableCell from "@/components/shared/DataTable/DataTableCell.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {SENDING_STATUS, TABLE_ROW_COLOR} from "@/constants";
import {Options} from '@/types'
import {Checkbox} from "@/components/ui/checkbox";

const columnDefHelper = createColumnHelper<Event>();

export const eventsColumnDef = (enums: Record<string, Options[]>): (
    | DisplayColumnDef<Event, keyof RowData>
    | AccessorKeyColumnDef<Event, keyof RowData>
    | AccessorFnColumnDef<Event, keyof RowData>
    )[] => [
    columnDefHelper.display({
        id: "select",
        header: ({table}) => (
            <DataTableCell>
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate"}
                    onCheckedChange={e => table.toggleAllPageRowsSelected(!!e)}
                    aria-label="Select all"
                />
            </DataTableCell>
        ),
        cell: ({row}) => {
            return <DataTableCell>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={e =>  row.toggleSelected(!!e)}
                    aria-label="Select row"
                />
            </DataTableCell>
        },
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 40,
        meta: {
            enableColumnOrdering: false
        },
    }),
    columnDefHelper.accessor("id", {
        id: "id",
        header: "מזהה",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.name', {
        id: "event_name",
        header: "שם האירוע",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        enableHiding: false,
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.location.latitude', {
        id: "event_location_latitude",
        header: "קו אורך",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        enableHiding: false,
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "location",
            filterKey: "event_location_latitude",
            filterLabel: "קו אורך",
            filterVariant: "number"
        }
    }),
    columnDefHelper.accessor('event.location.longitude', {
        id: 'event_location_longitude',
        header: "קו רוחב",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        enableHiding: false,
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "location",
            filterKey: "event_location_longitude",
            filterLabel: "קו רוחב",
            filterVariant: "number"
        }
    }),
    columnDefHelper.accessor('address', {
        id: "address",
        header: "כתובת",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue() ?? "-"}</span>
            </DataTableCell>
        },
        enableHiding: false,
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('schedulingSendingTime', {
        id: 'schedulingSendingTime',
        header: "מועד שליחה לפוקוס",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{convertToIsraelDateFormat(getValue())}</span>
            </DataTableCell>
        },
        enableHiding: false,
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "schedulingSendingTime",
            filterLabel: "מועד שליחה לפוקוס",
            filterVariant: "datetime-range"
        }
    }),
    columnDefHelper.accessor('sendingStatus', {
        id: 'sendingStatus',
        header: "סטטוס שליחה",
        cell: ({getValue}) => {
            return <DataTableCell>
                <Badge className={`${TABLE_ROW_COLOR[getValue()]} text-zinc-700 px-3 py-1`}>
                    <Translation>{getValue()}</Translation>
                </Badge>
            </DataTableCell>
        },
        enableHiding: false,
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "sendingStatus",
            filterLabel: "סטטוס שליחה",
            filterVariant: "select",
            filterOptions: SENDING_STATUS
        }
    }),
    columnDefHelper.accessor('event.responsibleJournal', {
        id: 'event_responsibleJournal',
        header: "יומן מנהל האירוע",
        cell: ({getValue}) => {
            const textValue = enums.ResponsibleJournal.find((status) => status.value == getValue())?.label
            return <DataTableCell className="space-x-2">
                {textValue ?
                    <Badge variant="outline" className="p-1">{textValue}</Badge> :
                    <span>-</span>
                }
            </DataTableCell>;
        },
        enableHiding: false,
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_responsibleJournal",
            filterLabel: "יומן מנהל האירוע",
            filterVariant: "select",
            filterOptions: enums.ResponsibleJournal
        }
    }),
    columnDefHelper.accessor(row => row.event.permittedJournal ?? '', {
        id: 'event_permittedJournal',
        header: "יומנים מורשים לצפייה",
        cell: ({getValue}) => {
            const permittedJournalLabels = (getValue() as string)
                .split(',')
                .map(v => enums.ResponsibleJournal.find(s => s.value == v.trim())?.label)
                .filter(Boolean);

            const displayText = permittedJournalLabels[0]

            const amount = permittedJournalLabels.length - 1

            return <DataTableCell className="space-x-2">
                <Badge variant="outline" className="p-1">{displayText}</Badge>
                {amount > 0 && (
                    <Badge
                        className="h-5 min-w-5 rounded-full py-1 px-2 font-mono tabular-nums"
                        variant="default"
                    >
                        +{amount}
                    </Badge>
                )}
            </DataTableCell>;
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_permittedJournal",
            filterLabel: "יומנים מורשים לצפייה",
            filterVariant: "multi-select",
            filterOptions: enums.ResponsibleJournal
        }
    }),
    columnDefHelper.accessor(row => row.event.permittedEditingJournalsIds ?? '', {
        id: 'event_permittedEditingJournalsIds',
        header: "יומנים מורשים לעריכה",
        cell: ({getValue}) => {
            const permittedEditingJournals = (getValue() as string)
                .split(',')
                .map(v => enums.ResponsibleJournal.find(s => s.value == v.trim())?.label)
                .filter(Boolean);

            const displayText = permittedEditingJournals[0]

            const amount = permittedEditingJournals.length - 1

            return <DataTableCell className="space-x-2">
                <Badge variant="outline" className="p-1">{displayText}</Badge>
                {amount > 0 && (
                    <Badge
                        className="h-5 min-w-5 rounded-full py-1 px-2 font-mono tabular-nums"
                        variant="default"
                    >
                        +{amount}
                    </Badge>
                )}
            </DataTableCell>;
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_permittedEditingJournalsIds",
            filterLabel: "יומנים מורשים לעריכה",
            filterVariant: "multi-select",
            filterOptions: enums.ResponsibleJournal
        }
    }),
    columnDefHelper.accessor('event.startDate', {
        id: 'event_startDate',
        header: "תאריך התחלה",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{convertToIsraelDateFormat(getValue())}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_startDate",
            filterLabel: "תאריך התחלה",
            filterVariant: "datetime-range"
        }
    }),
    columnDefHelper.accessor('event.endDate', {
        id: 'event_endDate',
        header: "תאריך סיום",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{convertToIsraelDateFormat(getValue())}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_endDate",
            filterLabel: "תאריך סיום",
            filterVariant: "datetime-range"
        }
    }),
    columnDefHelper.accessor('event.status', {
        id: 'event_status',
        header: "סטטוס",
        cell: ({getValue}) => {
            const textValue = enums.StatusTypes.find((status) => status.value == getValue())?.label
            return <DataTableCell>
                <span>{textValue ?? '-'}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_status",
            filterLabel: "סטטוס",
            filterVariant: "select",
            filterOptions: enums.StatusTypes
        }
    }),
    columnDefHelper.accessor('event.generator', {
        id: 'event_generator',
        header: "מחולל",
        cell: ({getValue}) => {
            const textValue = enums.EventsGeneratorTypes.find((status) => status.value == getValue())?.label
            return <DataTableCell>
                <span>{textValue ?? '-'}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_generator",
            filterLabel: "מחולל",
            filterVariant: "select",
            filterOptions: enums.EventsGeneratorTypes
        }
    }),
    columnDefHelper.accessor('event.eventType', {
        id: 'event_eventType',
        header: "סוג האירוע",
        cell: ({getValue}) => {
            const textValue = enums.EventTypes.find((status) => status.value == getValue())?.label
            return <DataTableCell>
                <span>{textValue ?? '-'}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_eventType",
            filterLabel: "סוג האירוע",
            filterVariant: "select",
            filterOptions: enums.EventTypes
        }
    }),
    columnDefHelper.accessor('event.damageLevel', {
        id: 'event_damageLevel',
        header: "רמת נזק",
        cell: ({getValue}) => {
            const textValue = enums.EventsDamageLevels.find((status) => status.value == getValue())?.label
            return <DataTableCell>
                <span>{textValue ?? '-'}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_damageLevel",
            filterLabel: "רמת נזק",
            filterVariant: "select",
            filterOptions: enums.EventsDamageLevels
        }
    }),
    columnDefHelper.accessor('event.lifeSavingPotential', {
        id: 'event_lifeSavingPotential',
        header: "פוטנצייל הצלת חיים",
        cell: ({getValue}) => {
            const textValue = enums.EventsLifeSavingPotential.find((status) => status.value == getValue())?.label
            return <DataTableCell>
                <span>{textValue ?? '-'}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_lifeSavingPotential",
            filterLabel: "פוטנצייל הצלת חיים",
            filterVariant: "select",
            filterOptions: enums.EventsLifeSavingPotential
        }
    }),
    columnDefHelper.accessor('event.allocatedStatus', {
        id: 'event_allocatedStatus',
        header: "סטטוס ציוות",
        cell: ({getValue}) => {
            const textValue = enums.EventsDynamicStatus.find((status) => status.value == getValue())?.label
            return <DataTableCell>
                <span>{textValue ?? '-'}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_allocatedStatus",
            filterLabel: "סטטוס ציוות",
            filterVariant: "select",
            filterOptions: enums.EventsDynamicStatus
        }
    }),
    columnDefHelper.accessor('event.isUrbanArea', {
        id: 'event_isUrbanArea',
        header: "שטח פתוח",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue() ? "כן" : "לא"}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_isUrbanArea",
            filterLabel: "שטח פתוח",
            filterVariant: "radio-group",
            filterOptions: [
                {value: "true", label: "כן"},
                {value: "false", label: "לא"}
            ]
        }
    }),
    columnDefHelper.accessor('event.classification', {
        id: 'event_classification',
        header: "חשיבות",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue() ?? "-"}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterKey: "event_classification",
            filterLabel: "חשיבות",
            filterVariant: "classification"
        }
    }),
    columnDefHelper.accessor('event.seriousInjuries', {
        id: 'event_seriousInjuries',
        header: "נפגעי חרדה",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "injuries",
            filterGroupLabel: "נפגעים",
            filterKey: "event_seriousInjuries",
            filterLabel: "חרדה",
            filterVariant: "number"
        }
    }),
    columnDefHelper.accessor('event.minorInjuries', {
        id: 'event_minorInjuries',
        header: "פצועים קל",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "injuries",
            filterGroupLabel: "נפגעים",
            filterKey: "event_minorInjuries",
            filterLabel: "קל",
            filterVariant: "number"
        }
    }),
    columnDefHelper.accessor('event.moderateInjuries', {
        id: 'event_moderateInjuries',
        header: "בינוני",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "injuries",
            filterGroupLabel: "נפגעים",
            filterKey: "event_moderateInjuries",
            filterLabel: "בינוני",
            filterVariant: "number"
        }
    }),
    columnDefHelper.accessor('event.severeInjuries', {
        id: 'event_severeInjuries',
        header: "פצועים קשה",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "injuries",
            filterGroupLabel: "נפגעים",
            filterKey: "event_severeInjuries",
            filterLabel: "קשה",
            filterVariant: "number"
        }
    }),
    columnDefHelper.accessor('event.trappedInjuries', {
        id: 'event_trappedInjuries',
        header: "לכודים",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "injuries",
            filterGroupLabel: "נפגעים",
            filterKey: "event_trappedInjuries",
            filterLabel: "לכודים",
            filterVariant: "number"
        }
    }),
    columnDefHelper.accessor('event.fatalInjuries', {
        id: 'event_fatalInjuries',
        header: "הרוגים",
        cell: ({getValue}) => {
            return <DataTableCell>
                <span>{getValue()}</span>
            </DataTableCell>
        },
        size: 200,
        maxSize: 500,
        meta: {
            filterGroupKey: "injuries",
            filterGroupLabel: "נפגעים",
            filterKey: "event_fatalInjuries",
            filterLabel: "הרוגים",
            filterVariant: "number"
        }
    }),
]