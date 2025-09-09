import {createColumnHelper} from "@tanstack/react-table";
import {Event} from "@/features/Events/types";
import {convertToIsraelDateFormat} from "@/lib/utils.ts";
import Translation from "@/components/shared/Translation.tsx";

const columnHelper = createColumnHelper<Event>()

export const eventsColumnDef = [
    columnHelper.accessor('event.id', {
        header: "מזהה",
        cell: ({getValue}) => getValue(),
        size: 300,
        maxSize: 300
    }),
    columnHelper.accessor('event.name', {
        header: "שם האירוע",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 300
    }),
    columnHelper.accessor('event.location.latitude', {
        header: "קו אורך",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 250
    }),
    columnHelper.accessor('event.location.longitude', {
        header: "קו רוחב",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 250
    }),
    columnHelper.accessor('address', {
        header: "כתובת",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500
    }),
    columnHelper.accessor('schedulingSendingTime', {
        header: "מועד שליחה לפוקוס",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        size: 200,
        maxSize: 300
    }),
    columnHelper.accessor('sendingStatus', {
        header: "סטטוס שליחה",
        cell: ({getValue}) => <Translation>{getValue()}</Translation>,
        size: 150,
        maxSize: 250
    }),
    columnHelper.accessor('event.startDate', {
        header: "תאריך התחלה",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        size: 150,
        maxSize: 250
    }),
    columnHelper.accessor('event.endDate', {
        header: "תאריך סיום",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        size: 150,
        maxSize: 250
    }),
    columnHelper.accessor('event.responsibleJournal', {
        header: "יומן מנהל האירוע",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 350
    }),
    columnHelper.accessor('event.permittedJournal', {
        header: "יומנים מורשים לצפייה",
        cell: ({getValue}) => getValue() ?? "-",
        size: 200,
        maxSize: 500
    }),
    columnHelper.accessor('event.permittedEditingJournalsIds', {
        header: "יומנים מורשים לעריכה",
        cell: ({getValue}) => getValue() ?? "-",
        size: 200,
        maxSize: 500
    }),
    columnHelper.accessor('event.status', {
        header: "סטטוס",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200
    }),
    columnHelper.accessor('event.generator', {
        header: "מחולל",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200
    }),
    columnHelper.accessor('event.eventType', {
        header: "סוג האירוע",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200
    }),
    columnHelper.accessor('event.isUrbanArea', {
        header: "שטח פתוח",
        cell: ({getValue}) => getValue() ? "כן" : "לא",
        size: 150,
        maxSize: 200
    }),
    columnHelper.accessor('event.damageLevel', {
        header: "רמת נזק",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200
    }),
    columnHelper.accessor('event.lifeSavingPotential', {
        header: "פוטנצייל הצלת חיים",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 250
    }),
    columnHelper.accessor('event.allocatedStatus', {
        header: "סטטוס ציוות",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 250
    }),
    columnHelper.accessor('event.classification', {
        header: "חשיבות",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200
    }),
    columnHelper.accessor('event.seriousInjuries', {
        header: "נפגעי חרדה",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 250
    }),
    columnHelper.accessor('event.minorInjuries', {
        header: "פצועים קל",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 200
    }),
    columnHelper.accessor('event.moderateInjuries', {
        header: "פצועים בינוני",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 250
    }),
    columnHelper.accessor('event.severeInjuries', {
        header: "פצועים קשה",
        cell: ({getValue}) => getValue(),
        size: 150,
        maxSize: 250
    }),
    columnHelper.accessor('event.trappedInjuries', {
        header: "לכודים",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 100
    }),
    columnHelper.accessor('event.fatalInjuries', {
        header: "הרוגים",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 100
    }),
]