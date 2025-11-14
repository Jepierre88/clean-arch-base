"use client";

import { Controller, useForm } from "react-hook-form";
import { ValidateFeeSchema } from "@/src/shared/schemas/parking/validate-fee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
} from "@/src/shared/components/ui/field";
import { DateTimePicker } from "@/src/shared/components/form/date-time-pricker.component";
import QrScannerInput from "@/src/shared/components/form/qr-scanner-input.component";
import { Badge } from "@/src/shared/components/ui/badge";
import { CalendarClock, QrCode, Sparkles } from "lucide-react";

import { IValidateAmountParamsEntity } from "@/src/domain";
import { usePaymentContext } from "@/src/shared/context/payment.context";

export function QrSectionComponent() {
  const { validateFee, clearValidateResult } = usePaymentContext();

  const onValidateFee = async (data: IValidateAmountParamsEntity) => {
    clearValidateResult();
    if (!data.parkingSessionId) return;
    await validateFee(data);
  };

  return <QrFormComponent onValidateFee={onValidateFee} />;
}

function QrFormComponent({
  onValidateFee,
}: {
  onValidateFee: (data: IValidateAmountParamsEntity) => Promise<void>;
}) {
  const validateFeeForm = useForm({
    resolver: zodResolver(ValidateFeeSchema),
    defaultValues: {
      exitTime: new Date(),
      parkingSessionId: "",
    },
  });

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border/70 bg-card/95 px-6 py-5 shadow-sm">
        <div className="flex gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-foreground">
            <Sparkles className="h-5 w-5 text-foreground" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Procesa el cobro en dos pasos
            </p>
            <p className="text-xs text-muted-foreground">
              Define la hora real de salida y luego permite que la pistola lectora capture el ticket para validar automáticamente.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-primary-foreground" />
            <span>Ajusta la hora exacta en la que el vehículo abandona el parqueadero.</span>
          </div>
          <div className="flex items-center gap-2">
            <QrCode className="h-4 w-4 text-primary-foreground" />
            <span>Escanea el QR del ticket y validamos el valor del cobro al instante.</span>
          </div>
        </div>
      </section>

      <form
        className="flex flex-col gap-5"
        onChange={validateFeeForm.handleSubmit(async (data) => {
          await onValidateFee(data);
        })}
      >
        <div className="rounded-2xl border border-border/70 bg-card/90 px-5 py-4 shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Badge variant="outline" className="border-primary/40 text-foreground">
                Paso 1
              </Badge>
              <span>Hora de salida</span>
            </div>
            <span className="text-[11px] text-muted-foreground">Requerido</span>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Selecciona la hora y fecha exactas según el control manual o el registro de la barrera.
          </p>

          <div className="mt-3">
            <Controller
              control={validateFeeForm.control}
              name="exitTime"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <DateTimePicker
                    {...field}
                    date={field.value as Date | undefined}
                    setDate={(value) => field.onChange(value)}
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/90 px-5 py-4 shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Badge variant="outline" className="border-primary/40 text-foreground">
                Paso 2
              </Badge>
              <span>Escanear QR</span>
            </div>
            <span className="text-[11px] text-muted-foreground">Lectura automática</span>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Usa la pistola lectora para capturar el código del ticket. En cuanto se detecte, calcularemos el valor a pagar.
          </p>

          <div className="mt-3">
            <Controller
              control={validateFeeForm.control}
              name="parkingSessionId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <QrScannerInput
                    {...field}
                    id="parkingSessionId"
                    value={field.value ?? ""}
                    placeholder="Escanea el QR con la pistola lectora"
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
