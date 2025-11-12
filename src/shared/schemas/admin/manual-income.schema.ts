import { z } from "zod";

export const ManualIncomeSchema = z.object({
  licensePlate: z
    .string()
    .min(1, "La placa es obligatoria")
    .max(6, "La placa debe tener como máximo 6 caracteres"),
  vehivleTypeId: z.string().uuid().or(z.literal("")),
  entryTime: z.coerce.date(),
});

export type ManualIncomeForm = z.infer<typeof ManualIncomeSchema>;
