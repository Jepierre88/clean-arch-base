"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginParams } from "@/domain/index";
import { LoginSchema } from "@/src/shared/schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { getSession, signIn, SignInResponse, useSession } from "next-auth/react";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem, // 👈 IMPORTANTE
} from "@/src/shared/components/ui/select";
import { ELoginCodes } from "@/src/shared/enums/auth/login-codes.enum";
import { EyeIcon, EyeOff } from "lucide-react";
import { setCompanyAction } from "@/src/app/auth/actions/set-company.action";
import { getPermissionsAction } from "@/src/app/auth/actions/get-permissions.action";
import TCompany from "@/src/shared/types/auth/company.type";
import { TPermission } from "@/src/shared/types/auth/permission.type";

type CompanyOption = {
  id: string;
  name: string;
};

type SelectionResult = {
  accessToken: string;
  refreshToken: string;
  company: TCompany;
  permissions: TPermission;
};

const COMPANY_SELECTOR_STEP = "company" as const;

type ToastId = string | number;
type Step = "login" | typeof COMPANY_SELECTOR_STEP;

const getCompanyDisplayName = (company: TCompany): string =>
  company.name || company.shortName || company.branding?.logo || company.id;

const mapCompanyToOption = (company: TCompany): CompanyOption => ({
  id: company.id,
  name: getCompanyDisplayName(company),
});

const buildCompanyOptions = (companies: TCompany[]): CompanyOption[] =>
  companies.map(mapCompanyToOption);

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
  const { update } = useSession();

  const form = useForm<ILoginParams>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const [step, setStep] = useState<Step>("login");
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [settingCompany, setSettingCompany] = useState(false);
  const [isShownPassword, setIsShownPassword] = useState(false)

  const resetCompanySelectionState = () => {
    setCompanies([]);
    setSelectedCompanyId("");
    setStep("login");
  };

  const applySelectionToUserSession = async (selection: SelectionResult) => {
    await update({
      selectedCompany: selection.company,
      accessToken: selection.accessToken,
      refreshToken: selection.refreshToken,
      permissions: selection.permissions,
    });
  };

  const selectCompanyAndFetchPermissions = async (
    companyId: string
  ): Promise<SelectionResult> => {
    const setCompanyResponse = await setCompanyAction({ companyId });

    if (!setCompanyResponse.success || !setCompanyResponse.data) {
      throw new Error(
        setCompanyResponse.error || "No se pudo establecer la compañía"
      );
    }

    const { access_token, refresh_token, company } = setCompanyResponse.data;

    const permissionsResponse = await getPermissionsAction({
      token: access_token,
    });

    if (!permissionsResponse.success || !permissionsResponse.data) {
      throw new Error(
        permissionsResponse.error || "No se pudieron obtener los permisos"
      );
    }

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      company,
      permissions: permissionsResponse.data,
    };
  };

  const completeLoginWithSingleCompany = async (
    companyId: string,
    toastId: ToastId
  ) => {
    const selection = await selectCompanyAndFetchPermissions(companyId);
    await applySelectionToUserSession(selection);
    resetCompanySelectionState();

    toast.success(
      `Sesión iniciada con ${getCompanyDisplayName(selection.company)}`,
      { id: toastId }
    );
    router.replace("/admin");
  };

  const showCompanySelectionStep = (
    companyList: TCompany[],
    toastId: ToastId
  ) => {
    setCompanies(buildCompanyOptions(companyList));
    setSelectedCompanyId("");
    setStep(COMPANY_SELECTOR_STEP);

    toast.info(
      "Tu usuario tiene múltiples compañías. Selecciona una para continuar.",
      { id: toastId }
    );
  };

  const continueLoginWithCompanies = async (
    companyList: TCompany[],
    toastId: ToastId
  ) => {
    if (companyList.length === 0) {
      resetCompanySelectionState();
      toast.error("No se encontraron compañías asociadas a tu usuario.", {
        id: toastId,
      });
      return;
    }

    if (companyList.length === 1) {
      await completeLoginWithSingleCompany(companyList[0].id, toastId);
      return;
    }

    showCompanySelectionStep(companyList, toastId);
  };

  const onSubmit: SubmitHandler<ILoginParams> = async (data) => {
    const loadingToast = toast.loading("Iniciando sesión...");

    try {
      const response = (await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      })) as SignInResponse | undefined;
      if (!response || response.error) {
        toast.error(
          response?.code === ELoginCodes.CredentialsError
            ? "Credenciales incorrectas"
            : "Error desconocido",
          { id: loadingToast }
        );
        return;
      }

      const companiesFromSession =
        (await getSession())?.user?.companies ?? [];

  await continueLoginWithCompanies(companiesFromSession, loadingToast);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo iniciar sesión"), {
        id: loadingToast,
      });
    }
  };

  const confirmCompany = async () => {
    if (!selectedCompanyId) {
      toast.message("Selecciona una compañía para continuar");
      return;
    }
    setSettingCompany(true);
    const selectingToast = toast.loading("Aplicando compañía...");
    try {
      const selection = await selectCompanyAndFetchPermissions(
        selectedCompanyId
      );
      await applySelectionToUserSession(selection);
      resetCompanySelectionState();

      toast.success(
        `Sesión iniciada con ${getCompanyDisplayName(selection.company)}`,
        { id: selectingToast }
      );
      router.replace("/admin");
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "No se pudo establecer la compañía. Intenta de nuevo."
        ),
        { id: selectingToast }
      );
    } finally {
      setSettingCompany(false);
    }
  };

  const isLoginStep = step === "login";

  return (
    <Card className="w-full max-w-sm mx-auto my-auto">
      <CardHeader>
        <CardTitle>
          {isLoginStep
            ? "Inicia sesión en CHRONOPARK"
            : "Selecciona tu compañía"}
        </CardTitle>
        <CardDescription>
          {isLoginStep
            ? "Ingresa tu correo electrónico y contraseña."
            : "Tu usuario tiene múltiples compañías. Elige con cuál iniciar la sesión."}
        </CardDescription>
        {isLoginStep && (
          <CardAction>
            <Button variant="link">Registrarse</Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        {isLoginStep ? (
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
                        <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2" type="button" onClick={() => setIsShownPassword(!isShownPassword)}>
                          {
                            isShownPassword ? <EyeOff className="h-4 w-4"/> : <EyeIcon className="h-4 w-4"/>
                          }
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
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Compañía</label>
              <Select
                value={selectedCompanyId}
                onValueChange={setSelectedCompanyId}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona una compañía" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setStep("login")}
                disabled={settingCompany}
              >
                Volver
              </Button>
              <Button
                onClick={confirmCompany}
                disabled={settingCompany || !selectedCompanyId}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {settingCompany ? "Aplicando..." : "Continuar"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
