import z from "zod";

export const LoginSchema = z.object({
  identifier: z.string().min(1, "El identificador es obligatorio"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});