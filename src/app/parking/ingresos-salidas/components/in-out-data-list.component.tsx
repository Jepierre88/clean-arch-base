"use client";

import * as React from "react";

import { IInOutEntity } from "@/domain/index";
import { DataTable } from "@/src/shared/components/table/data-table.component";
import { Paginator } from "@/src/shared/components/table/paginator.component";
import { createInOutColumns } from "./table/columns.component";

interface Props {
  items: IInOutEntity[];
  total: number;
  totalPages: number;
  pageSize: number;
}

export default function InOutDataListComponent({
  items,
  total,
  totalPages,
  pageSize,
}: Props) {
  const columns = React.useMemo(() => createInOutColumns(), []);
  const safeTotalPages = Math.max(1, totalPages || Math.ceil(total / pageSize) || 1);

  return (
    <section className="space-y-6">
      <DataTable
        data={items}
        columns={columns}
        caption={`${total} registros`}
        getRowKey={(row) => row.id}
        emptyMessage="Sin registros para mostrar"
      />

      <Paginator totalPages={safeTotalPages} />
    </section>
  );
}
