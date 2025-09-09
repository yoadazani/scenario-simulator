import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { memo } from "react";

interface DataTableEmptyMessageProps {
  colSpan: number;
}

const DataTableEmptyMessage = ({ colSpan }: DataTableEmptyMessageProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-2 w-full">
        אין תוצאות.
      </TableCell>
    </TableRow>
  );
};

export default memo(DataTableEmptyMessage);