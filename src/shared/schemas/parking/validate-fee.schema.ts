import z from "zod";

export const ValidateFeeSchema = z.object({
  parkingSessionId: z.uuid({
    error:"Código QR inválido"
  }).or(z.literal("")),
    exitTime: z.coerce.date({
      error: "La fecha y hora de salida son inválidas",
    }),
});

export type ValidateFeeForm = z.infer<typeof ValidateFeeSchema>;