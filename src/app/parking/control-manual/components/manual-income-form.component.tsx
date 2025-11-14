"use client";

import { getRateProfileAction } from "@/src/app/global-actions/get-common.action";
import { IGenerateManualIncomeParamsEntity } from "@/src/domain";
import { DateTimePicker } from "@/src/shared/components/form/date-time-pricker.component";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { useCommonContext } from "@/src/shared/context/common.context";
import {
  ManualIncomeForm,
  ManualIncomeSchema,
} from "@/src/shared/schemas/parking/manual-income.schema";
import { TRateProfile } from "@/src/shared/types/common/rate-profile.type";
import { TVehicleType } from "@/src/shared/types/common/vehicle-types.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus, CarFront, Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { generateManualIncomeAction } from "../actions/generate-manual-income.action";

export default function ManualIncomeFormComponent() {
  const { vehicleTypes } = useCommonContext();

  const onManualIncomeSubmit = async (params: ManualIncomeForm): Promise<boolean> => {
    const data: IGenerateManualIncomeParamsEntity = {
      ...params,
      entryTime: params.entryTime.toISOString(),
    }
    const response = await generateManualIncomeAction(data);
    if(!response.success) {
      toast.error("Error generando ingreso manual: " + response.error);
      return false;
    };

    toast.success("Ingreso manual generado correctamente");
    return true;
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-2 py-6">
      <IncomeForm vehicleTypes={vehicleTypes} onSubmit={onManualIncomeSubmit} />
    </section>
  );
}

const fieldContainerClasses =
  "rounded-lg border border-border bg-card/80 p-4 shadow-sm transition-colors focus-within:border-primary data-[invalid=true]:border-destructive";

const fieldLabelClasses =
  "text-xs font-medium text-muted-foreground";

const IncomeForm = ({
  vehicleTypes,
  onSubmit,
}: {
  vehicleTypes: TVehicleType[];
  onSubmit: (params: ManualIncomeForm) => Promise<boolean>;
}) => {
  const [rateProfiles, setRateProfiles] = useState<TRateProfile[]>([]);

  const incomeForm = useForm<ManualIncomeForm>({
    resolver: zodResolver(ManualIncomeSchema) as Resolver<ManualIncomeForm>,
    mode: "onChange",
    defaultValues: {
      entryTime: new Date(),
      licensePlate: "",
      vehicleTypeId: "",
      rateProfileId: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { isSubmitting, isValid },
  } = incomeForm;

  const vehicleTypeChanged = async (vehicleTypeId: string) => {
    resetField("rateProfileId", { defaultValue: "" });
    setRateProfiles([]);
    if (!vehicleTypeId) return;

    const profiles = await getRateProfileAction(vehicleTypeId);
    if (profiles.success) {
      setRateProfiles(profiles.data?.data || []);
    } else {
      toast.error("Error cargando perfiles de tarifa: " + profiles.error);
    }
  };

  const handleFormSubmit = handleSubmit((data: ManualIncomeForm) => {
    const isSuccess = onSubmit(data);
    isSuccess.then((result) => {
      if (result) {
        reset({
          entryTime: new Date(),
          licensePlate: "",
          vehicleTypeId: "",
          rateProfileId: "",
        });
        setRateProfiles([]);
      }
    });
  });

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="text-[11px] font-medium text-muted-foreground"
            >
              Control manual
            </Badge>
            {rateProfiles.length > 0 && (
              <Badge className="bg-muted text-[11px] font-medium text-muted-foreground">
                {rateProfiles.length} perfiles
              </Badge>
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-foreground">Registrar ingreso manual</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Registra entradas manuales manteniendo consistencia con el módulo de cobro.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border border-border/70 bg-muted/30 px-4 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CarFront className="h-5 w-5" />
              </span>
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-muted-foreground">Sesión manual</p>
                <p className="text-sm text-foreground/80">
                  Completa los datos para registrar un ingreso respaldado por el sistema.
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-foreground font-medium">
                <CalendarPlus className="h-3.5 w-3.5" />
                <span>Registro en tiempo real</span>
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="licensePlate"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className={`${fieldContainerClasses} md:col-span-2`}
                >
                  <FieldLabel htmlFor="licensePlate" className={fieldLabelClasses}>
                    Placa
                  </FieldLabel>
                  <Input
                    {...field}
                    id="licensePlate"
                    placeholder="QJJ15G"
                    className="mt-2 h-12 rounded-md border border-border bg-background px-3 text-lg font-semibold uppercase tracking-widest text-foreground focus-visible:ring-0"
                    maxLength={6}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="vehicleTypeId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldContainerClasses}>
                  <FieldLabel htmlFor="vehicleTypeId" className={fieldLabelClasses}>
                    Tipo de vehículo
                  </FieldLabel>

                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      vehicleTypeChanged(value);
                    }}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-md border border-border bg-background/80 text-left text-sm font-medium">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes?.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="entryTime"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldContainerClasses}>
                  <FieldLabel htmlFor="entryTime" className={fieldLabelClasses}>
                    Fecha y hora de ingreso
                  </FieldLabel>

                  <DateTimePicker
                    date={field.value as Date | undefined}
                    setDate={(value) => field.onChange(value)}
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="rateProfileId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldContainerClasses}>
                  <FieldLabel htmlFor="rateProfileId" className={fieldLabelClasses}>
                    Perfil de tarifa
                  </FieldLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    disabled={rateProfiles.length === 0}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-md border border-border bg-background/80 text-left text-sm font-medium disabled:opacity-50">
                      <SelectValue placeholder="Seleccionar perfil de tarifa" />
                    </SelectTrigger>
                    <SelectContent>
                      {rateProfiles?.map((profile) => (
                        <SelectItem key={profile.value} value={profile.value}>
                          {profile.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-border bg-muted/10 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            El registro quedará auditado en el historial de control manual.
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !isValid}
            className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-sm"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Procesando
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Generar ingreso manual
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
