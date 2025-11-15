"use client";

import * as React from "react";

import { IInOutEntity } from "@/domain/index";
import { DataTable } from "@/src/shared/components/table/data-table.component";
import { Paginator } from "@/src/shared/components/table/paginator.component";
import { Car, Layers, ListOrdered, Clock } from "lucide-react";

import { createInOutColumns } from "./table/columns.component";
import { cn } from "@/src/lib/utils";

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
  const vehicleTypes = React.useMemo(
    () => new Set(items.map((item) => item.vehicleType.name)).size,
    [items]
  );
  const rates = React.useMemo(
    () => new Set(items.map((item) => item.rateProfile.name)).size,
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
        <DataTable
          data={items}
          columns={columns}
          caption={`${total} registros`}
          getRowKey={(row) => row.id}
          emptyMessage="Sin registros para mostrar"
        />
      </div>

      <div className="rounded-2xl border border-dashed border-border/60 bg-muted/40 p-4">
        <Paginator
          totalPages={safeTotalPages}
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
