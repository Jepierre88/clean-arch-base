"use client";

import * as React from "react";

import { IInOutEntity } from "@/domain/index";
import { ChronoDataTable } from "@chrono/chrono-data-table.component";
import { ChronoPaginator } from "@chrono/chrono-paginator.component";
import { Car, Layers, ListOrdered, Clock } from "lucide-react";

import { createInOutColumns } from "./table/columns.component";
import { cn } from "@/src/lib/utils";
import { UseDialogContext } from "@/src/shared/context/dialog.context";
import { InOutDetailDialogContent } from "./in-out-detail-dialog-content";

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
  const { openDialog } = UseDialogContext();

  const handleViewDetail = React.useCallback(
    (item: IInOutEntity) => {
      openDialog({
        title: `Detalle de ${item.vehicle.licensePlate}`,
        description: "Información detallada del movimiento seleccionado",
        content: <InOutDetailDialogContent item={item} />,
      });
    },
    [openDialog]
  );

  const columns = React.useMemo(() => createInOutColumns(handleViewDetail), [handleViewDetail]);
  const safeTotalPages = Math.max(1, totalPages || Math.ceil(total / pageSize) || 1);
  const vehicleTypes = React.useMemo(
    () => new Set(items.map((item) => item.vehicleType.name)).size,
    [items]
  );
  const latestEntry = React.useMemo(() => {
    if (!items.length) return "Sin registros";
    const sorted = [...items].sort(
      (a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime()
    );
    return intlDateTime.format(new Date(sorted[0].entryTime));
  }, [items]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={ListOrdered}
          label="Registros totales"
          helper={`${safeTotalPages} páginas · ${pageSize} por página`}
          value={total.toLocaleString()}
        />
        <StatsCard
          icon={Car}
          label="Vehículos distintos"
          helper="Matrículas únicas en la vista"
          value={new Set(items.map((item) => item.vehicle.licensePlate)).size.toString()}
        />
        <StatsCard
          icon={Layers}
          label="Tipos de vehículo"
          helper="Perfiles de acceso detectados"
          value={vehicleTypes.toString()}
        />
        <StatsCard
          icon={Clock}
          label="Último registro"
          helper="Hora de la entrada más reciente"
          value={latestEntry}
        />
      </div>

      <div className="rounded-3xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur">
        <ChronoDataTable
          data={items}
          columns={columns}
          caption={`${total} registros`}
          getRowKey={(row) => row.id}
          emptyMessage="Sin registros para mostrar"
        />
      </div>

      <div className="rounded-2xl border border-dashed border-border/60 bg-muted/40 p-4">
        <ChronoPaginator
          totalPages={safeTotalPages}
          className="flex-col gap-4 p-0 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between"
        />
      </div>
    </section>
  );
}

interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  helper?: string;
}

const intlDateTime = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

function StatsCard({ icon: Icon, label, value, helper }: StatsCardProps) {
  return (
    <article className="rounded-2xl border border-border/60 bg-background p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className={cn("text-2xl font-semibold", value === "Sin registros" && "text-muted-foreground")}>{
            value
          }</p>
          {helper ? (
            <p className="text-xs text-muted-foreground">{helper}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
