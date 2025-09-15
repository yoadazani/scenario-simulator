import {createColumnHelper} from "@tanstack/react-table";
import {Event} from "@/features/Events/types";
import {convertToIsraelDateFormat} from "@/lib/utils.ts";
import Translation from "@/components/shared/Translation.tsx";


const columnDefHelper = createColumnHelper<Event>();

export const eventsColumnDef = [
    columnDefHelper.accessor("event.id", {
        header: "מזהה",
        cell: ({getValue}) => getValue(),
        size: 300,
        maxSize: 300,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.name', {
        header: "שם האירוע",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 300
    }),
    columnDefHelper.accessor('event.location.latitude', {
        header: "קו אורך",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 250
    }),
    columnDefHelper.accessor('event.location.longitude', {
        header: "קו רוחב",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 250
    }),
    columnDefHelper.accessor('address', {
        header: "כתובת",
        cell: ({getValue}) => getValue() ?? '-',
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('schedulingSendingTime', {
        header: "מועד שליחה לפוקוס",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        enableHiding: false,
        size: 200,
        maxSize: 300
    }),
    columnDefHelper.accessor('sendingStatus', {
        header: "סטטוס שליחה",
        cell: ({getValue}) => <Translation>{getValue()}</Translation>,
        enableHiding: false,
        size: 150,
        maxSize: 250
    }),
    columnDefHelper.accessor('event.startDate', {
        header: "תאריך התחלה",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        size: 150,
        maxSize: 250,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.endDate', {
        header: "תאריך סיום",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        size: 150,
        maxSize: 250,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.responsibleJournal', {
        header: "יומן מנהל האירוע",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 350
    }),
    columnDefHelper.accessor(row => row.event.permittedJournal ?? '', {
        id: 'event_permittedJournal',
        header: "יומנים מורשים לצפייה",
        cell: ({getValue}) => getValue() ?? "-",
        size: 200,
        maxSize: 500,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor(row => row.event.permittedEditingJournalsIds ?? '', {
        id: 'event_permittedEditingJournalsIds',
        header: "יומנים מורשים לעריכה",
        cell: ({getValue}) => getValue() ?? "-",
        size: 200,
        maxSize: 500,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.status', {
        header: "סטטוס",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.generator', {
        header: "מחולל",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.eventType', {
        header: "סוג האירוע",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.isUrbanArea', {
        header: "שטח פתוח",
        cell: ({getValue}) => getValue() ? "כן" : "לא",
        size: 150,
        maxSize: 200,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.damageLevel', {
        header: "רמת נזק",
        cell: ({getValue}) => getValue() ?? '-',
        size: 150,
        maxSize: 200,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.lifeSavingPotential', {
        header: "פוטנצייל הצלת חיים",
        cell: ({getValue}) => getValue() ?? '-',
        size: 200,
        maxSize: 250,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.allocatedStatus', {
        header: "סטטוס ציוות",
        cell: ({getValue}) => getValue() ?? '-',
        size: 150,
        maxSize: 250,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.classification', {
        header: "חשיבות",
        cell: ({getValue}) => getValue() ?? '-',
        size: 150,
        maxSize: 200,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.seriousInjuries', {
        header: "נפגעי חרדה",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 250,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.minorInjuries', {
        header: "פצועים קל",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.moderateInjuries', {
        header: "פצועים בינוני",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 250,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.severeInjuries', {
        header: "פצועים קשה",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 250,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.trappedInjuries', {
        header: "לכודים",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 100,
        meta: {
            visible: false
        }
    }),
    columnDefHelper.accessor('event.fatalInjuries', {
        header: "הרוגים",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 100,
        meta: {
            visible: false
        }
    }),
]