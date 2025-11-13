import z from "zod";

export const ValidateFeeSchema = z.object({
  parkingSessionId: z.uuid().or(z.literal("")),
    exitTime: z.coerce.date(),
});

export type ValidateFeeForm = z.infer<typeof ValidateFeeSchema>;