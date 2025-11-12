"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginParams } from "@/domain/index";
import { LoginSchema } from "@/src/shared/schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Button } from "@/src/shared/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/src/shared/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/src/shared/components/ui/form";
import { Input } from "@/src/shared/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import setCompanyClientService from "@/src/shared/services/data/auth/set-company-client.service";
import { EyeIcon, EyeOff } from "lucide-react";
import { loginAction } from "@/src/app/auth/actions/login.action";

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

  const form = useForm<ILoginParams>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const [isShownPassword, setIsShownPassword] = useState(false);

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
      // If backend returned applications, redirect to first application's path
      const apps = (response.data.applications ?? []) as { path?: string }[];
      if (apps.length > 0 && apps[0].path) {
        toast.success("Sesión iniciada correctamente", { id: loadingToast });
        // Normalize the path and redirect
        const appPath = apps[0].path.startsWith("/") ? apps[0].path : `/${apps[0].path}`;
        router.replace(appPath);
        return;
      }

      // Fallback: redirect to /admin
      toast.success("Sesión iniciada correctamente", { id: loadingToast });
      router.replace("/admin");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo iniciar sesión"), {
        id: loadingToast,
      });
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto my-auto">
      <CardHeader>
        <CardTitle>Inicia sesión en CHRONOPARK</CardTitle>
        <CardDescription>Ingresa tu correo electrónico y contraseña.</CardDescription>
        <CardAction>
          <Button variant="link">Registrarse</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Correo electrónico"
                        {...field}
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
                          placeholder="Contraseña"
                          type={isShownPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-1/2 -translate-y-1/2"
                          type="button"
                          onClick={() => setIsShownPassword(!isShownPassword)}
                        >
                          {isShownPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end gap-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Iniciar sesión
                </Button>
              </div>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}
