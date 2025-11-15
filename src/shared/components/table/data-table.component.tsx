"use client";

import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";

const alignmentClassMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

type Alignment = keyof typeof alignmentClassMap;

export type DataTableColumn<T extends Record<string, unknown>> = {
  /** Unique identifier for the column; falls back to the accessor key */
  id?: string;
  /** Property key used for the default cell renderer */
  accessorKey?: keyof T;
  /** Column header content */
  header: ReactNode;
  /** Optional custom cell renderer that receives the current row */
  cell?: (row: T, rowIndex: number) => ReactNode;
  /** Horizontal alignment for both header and cells */
  align?: Alignment;
  /** Additional class names for the header cell */
  headerClassName?: string;
  /** Additional class names for the body cell */
  cellClassName?: string;
};

export type DataTableProps<T extends Record<string, unknown>> = {
  data: T[];
  columns: DataTableColumn<T>[];
  caption?: ReactNode;
  emptyMessage?: ReactNode;
  loadingMessage?: ReactNode;
  isLoading?: boolean;
  getRowKey?: (row: T, index: number) => string | number;
  className?: string;
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  caption,
  emptyMessage = "Sin resultados",
  loadingMessage = "Cargando datos…",
  isLoading = false,
  getRowKey,
  className,
}: DataTableProps<T>) {
  const resolveRowKey = (row: T, index: number) => {
    const key = getRowKey?.(row, index) ?? (row as { id?: string | number })?.id ?? index;
    return key;
  };

  const showEmptyState = !isLoading && data.length === 0;

  return (
    <Table className={className}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column, columnIndex) => (
            <TableHead
              key={column.id ?? String(column.accessorKey ?? columnIndex)}
              className={cn(
                alignmentClassMap[column.align ?? "left"],
                column.headerClassName
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-sm text-muted-foreground">
              {loadingMessage}
            </TableCell>
          </TableRow>
        )}

        {showEmptyState && (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-sm text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          data.map((row, rowIndex) => (
            <TableRow key={resolveRowKey(row, rowIndex)}>
              {columns.map((column, columnIndex) => {
                const alignmentClass = alignmentClassMap[column.align ?? "left"];
                const cellContent = column.cell
                  ? column.cell(row, rowIndex)
                  : column.accessorKey
                  ? ((row[column.accessorKey] as ReactNode) ?? null)
                  : null;

                return (
                  <TableCell
                    key={`${column.id ?? String(column.accessorKey ?? columnIndex)}-${rowIndex}`}
                    className={cn(alignmentClass, column.cellClassName)}
                  >
                    {cellContent}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
