"use client"
import { IInOutEntity } from "@/domain/index";
import { DataTableColumn } from "@/src/shared/components/table/data-table.component";
import { Button } from "@/src/shared/components/ui/button";

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

type ViewDetailHandler = (item: IInOutEntity) => void;

export const createInOutColumns = (
  onViewDetail?: ViewDetailHandler
): DataTableColumn<IInOutEntity>[] => [
  {
    id: "license-plate",
    header: "Placa",
    accessorFn: (row: IInOutEntity) => row.vehicle.licensePlate,
  },
  {
    id: "vehicle-type",
    header: "Tipo de vehículo",
    accessorFn: (row: IInOutEntity) => {
      console.log(row);
      return row.vehicleType.name;
    },
  },
  {
    id: "rate-profile",
    header: "Perfil tarifario",
    accessorFn: (row: IInOutEntity) => row.rateProfile.name,
  },
  {
    id: "entry-time",
    header: "Entrada",
    accessorFn: (row: IInOutEntity) => formatDateTime(row.entryTime),
  },
  {
    id: "exit-time",
    header: "Salida",
    accessorFn: (row: IInOutEntity) => formatDateTime(row.exitTime),
  },
  {
    id: "actions",
    header: "Acciones",
    align: "right",
    headerClassName: "text-right",
    cellClassName: "text-right",
    cell: (row: IInOutEntity) => (
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-xs font-semibold"
        onClick={() => onViewDetail?.(row)}
      >
        Ver detalle
      </Button>
    ),
  },
];
