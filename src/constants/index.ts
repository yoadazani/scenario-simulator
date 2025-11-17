export const SENDING_STATUS = [
    {value: "Sent", label: "נשלח"},
    {value: "Pending", label: "ממתין"},
    {value: "Failed", label: "נכשל"},
    {value: "On_Hold", label: "מושהה"}
]

export const TABLE_ROW_COLOR = {
    "Sent": "bg-green-100",
    "Pending": "bg-yellow-100",
    "Failed": "bg-red-100",
    "On_Hold": "bg-muted"
}

export const TABLE_PAGE_SIZES = [10, 50, 100, 200, 300, 500]

export const EMPTY_VALUES = true