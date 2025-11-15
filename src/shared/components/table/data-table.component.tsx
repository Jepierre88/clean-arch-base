"use client";

import { ReactNode, isValidElement } from "react";
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

export type DataTableColumn<T extends object> = {
  /** Unique identifier for the column; falls back to the accessor key */
  id?: string;
  /** Property key used for the default cell renderer */
  accessorKey?: keyof T;
  /** Function that returns the value to display when no custom cell renderer is provided */
  accessorFn?: (row: T) => ReactNode;
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

export type DataTableProps<T extends object> = {
  data: T[];
  columns: DataTableColumn<T>[];
  caption?: ReactNode;
  emptyMessage?: ReactNode;
  loadingMessage?: ReactNode;
  isLoading?: boolean;
  getRowKey?: (row: T, index: number) => string | number;
  className?: string;
};

export function DataTable<T extends object>({
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
    const key =
      getRowKey?.(row, index) ?? (row as { id?: string | number })?.id ?? index;
    return key;
  };

  const showEmptyState = !isLoading && data.length === 0;

  const ensureRenderableValue = (value: unknown): ReactNode => {
    if (value === null || value === undefined) return null;
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "boolean") return value ? "Sí" : "No";
    if (value instanceof Date) return value.toLocaleString();
    if (isValidElement(value as ReactNode)) return value as ReactNode;

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

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
                let cellContent: ReactNode = null;

                if (column.cell) {
                  cellContent = column.cell(row, rowIndex);
                } else if (column.accessorFn) {
                  cellContent = column.accessorFn(row);
                } else if (column.accessorKey) {
                  const key = String(column.accessorKey);
                  cellContent = ensureRenderableValue((row as Record<string, unknown>)[key]);
                }

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
