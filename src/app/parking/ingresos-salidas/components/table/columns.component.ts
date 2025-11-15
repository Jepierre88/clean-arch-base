import { IInOutEntity } from "@/domain/index";
import { DataTableColumn } from "@/src/shared/components/table/data-table.component";

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export const createInOutColumns = (): DataTableColumn<IInOutEntity>[] => [
  {
    id: "license-plate",
    header: "Placa",
    accessorFn: (row) => row.vehicle.licensePlate,
  },
  {
    id: "vehicle-type",
    header: "Tipo de vehículo",
    accessorFn: (row) => row.vehicleType.name,
  },
  {
    id: "rate-profile",
    header: "Perfil tarifario",
    accessorFn: (row) => row.rateProfile.name,
  },
  {
    id: "entry-time",
    header: "Entrada",
    accessorFn: (row) => formatDateTime(row.entryTime),
  },
  {
    id: "exit-time",
    header: "Salida",
    accessorFn: (row) => formatDateTime(row.exitTime),
  },
];
