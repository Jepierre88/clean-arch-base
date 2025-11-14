"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { loginAction } from "@/src/app/auth/actions/login.action";
import { ILoginParams } from "@/domain/index";
import { Button } from "@/src/shared/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/src/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/components/ui/form";
import { Input } from "@/src/shared/components/ui/input";
import { Separator } from "@/src/shared/components/ui/separator";
import { LoginSchema } from "@/src/shared/schemas/auth/login.schema";

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from") ?? undefined;

  const form = useForm<ILoginParams>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const [isShownPassword, setIsShownPassword] = useState(false);
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<ILoginParams> = async (data) => {
    const loadingToast = toast.loading("Iniciando sesión...");

    try {
      const response = await loginAction({
        identifier: data.identifier,
        password: data.password,
      });

      if (!response.success || !response.data) {
        toast.error(response.error ?? "No se pudo iniciar sesión", {
          id: loadingToast,
        });
        return;
      }
      // If the login was requested because router redirected with a `from` param, respect it
      if (fromPath) {
        toast.success("Sesión iniciada correctamente", { id: loadingToast });
        router.replace(fromPath);
        return;
      }

      // If backend returned applications, redirect to first application's path
      const apps = (response.data.applications ?? []) as { path?: string }[];
      if (apps.length > 0 && apps[0].path) {
        toast.success("Sesión iniciada correctamente", { id: loadingToast });
        // Normalize the path and redirect
        const appPath = apps[0].path.startsWith("/") ? apps[0].path : `/${apps[0].path}`;
        router.replace(appPath);
        return;
      }

      // Fallback: redirect to /parking
      toast.success("Sesión iniciada correctamente", { id: loadingToast });
      router.replace("/parking");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo iniciar sesión"), {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="flex w-full max-w-lg flex-1 items-center justify-center px-2 py-4 sm:px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Inicia sesión en CHRONOPARK</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al panel de administración.
          </CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="link"
              onClick={() =>
                toast.info("Contacta al administrador de ChronoPark para crear o recuperar tu acceso.")
              }
            >
              ¿Necesitas ayuda?
            </Button>
          </CardAction>
        </CardHeader>
  <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="username"
                        inputMode="email"
                        placeholder="nombre@empresa.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          autoComplete="current-password"
                          placeholder="Ingresa tu contraseña"
                          type={isShownPassword ? "text" : "password"}
                          className="pr-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setIsShownPassword((prev) => !prev)}
                          aria-label={isShownPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          aria-pressed={isShownPassword}
                        >
                          {isShownPassword ? <EyeOff className="size-4" /> : <EyeIcon className="size-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                Iniciar sesión
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-center text-center">
          <Separator className="w-full bg-border/60" />
          <p className="text-sm text-muted-foreground">
            ¿No tienes acceso? Comunícate con tu administrador para solicitar una cuenta.
          </p>
          <Button variant="link" asChild>
            <Link href="mailto:soporte@chronopark.com">Escríbenos a soporte@chronopark.com</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
