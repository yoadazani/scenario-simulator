import {createColumnHelper} from "@tanstack/react-table";
import {Event} from "@/features/Events/types";
import {convertToIsraelDateFormat} from "@/lib/utils.ts";
import Translation from "@/components/shared/Translation.tsx";


const columnDefHelper = createColumnHelper<Event>();

export const eventsColumnDef = [
    columnDefHelper.accessor("event.id", {
        id: "event_id",
        header: "מזהה",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.name', {
        id: "event_name",
        header: "שם האירוע",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('event.location.latitude', {
        id: "event_location_latitude",
        header: "קו אורך",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('event.location.longitude', {
        id: 'event_location_longitude',
        header: "קו רוחב",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('address', {
        id: "address",
        header: "כתובת",
        cell: ({getValue}) => getValue() ?? '-',
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('schedulingSendingTime', {
        id: 'schedulingSendingTime',
        header: "מועד שליחה לפוקוס",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('sendingStatus', {
        id: 'sendingStatus',
        header: "סטטוס שליחה",
        cell: ({getValue}) => <Translation>{getValue()}</Translation>,
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('event.responsibleJournal', {
        id: 'event_responsibleJournal',
        header: "יומן מנהל האירוע",
        cell: ({getValue}) => getValue(),
        enableHiding: false,
        size: 200,
        maxSize: 500
    }),
    columnDefHelper.accessor('event.startDate', {
        id: 'event_startDate',
        header: "תאריך התחלה",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.endDate', {
        id: 'event_endDate',
        header: "תאריך סיום",
        cell: ({getValue}) => convertToIsraelDateFormat(getValue()),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor(row => row.event.permittedJournal ?? '', {
        id: 'event_permittedJournal',
        header: "יומנים מורשים לצפייה",
        cell: ({getValue}) => getValue() ?? "-",
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor(row => row.event.permittedEditingJournalsIds ?? '', {
        id: 'event_permittedEditingJournalsIds',
        header: "יומנים מורשים לעריכה",
        cell: ({getValue}) => getValue() ?? "-",
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.status', {
        id: 'event_status',
        header: "סטטוס",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.generator', {
        id: 'event_generator',
        header: "מחולל",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.eventType', {
        id: 'event_eventType',
        header: "סוג האירוע",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.isUrbanArea', {
        id: 'event_isUrbanArea',
        header: "שטח פתוח",
        cell: ({getValue}) => getValue() ? "כן" : "לא",
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.damageLevel', {
        id: 'event_damageLevel',
        header: "רמת נזק",
        cell: ({getValue}) => getValue() ?? '-',
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.lifeSavingPotential', {
        id: 'event_lifeSavingPotential',
        header: "פוטנצייל הצלת חיים",
        cell: ({getValue}) => getValue() ?? '-',
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.allocatedStatus', {
        id: 'event_allocatedStatus',
        header: "סטטוס ציוות",
        cell: ({getValue}) => getValue() ?? '-',
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.classification', {
        id: 'event_classification',
        header: "חשיבות",
        cell: ({getValue}) => getValue() ?? '-',
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.seriousInjuries', {
        id: 'event_seriousInjuries',
        header: "נפגעי חרדה",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.minorInjuries', {
        id: 'event_minorInjuries',
        header: "פצועים קל",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.moderateInjuries', {
        id: 'event_moderateInjuries',
        header: "פצועים בינוני",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.severeInjuries', {
        id: 'event_severeInjuries',
        header: "פצועים קשה",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.trappedInjuries', {
        id: 'event_trappedInjuries',
        header: "לכודים",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
    columnDefHelper.accessor('event.fatalInjuries', {
        id: 'event_fatalInjuries',
        header: "הרוגים",
        cell: ({getValue}) => getValue(),
        size: 200,
        maxSize: 500,
    }),
]