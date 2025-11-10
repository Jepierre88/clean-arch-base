import z from "zod";

export const LoginSchema = z.object({
  email: z.email({message: "El correo electrónico no es válido"}),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});