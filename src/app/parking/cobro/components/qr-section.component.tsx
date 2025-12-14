"use client";

import { Controller, useForm } from "react-hook-form";
import { ValidateFeeSchema } from "@/src/shared/schemas/parking/validate-fee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChronoField, ChronoFieldError } from "@chrono/chrono-field.component";
import { ChronoDateTimePicker } from "@chrono/chrono-date-time-picker.component";
import ChronoQrScannerInput from "@chrono/chrono-qr-scanner-input.component";
import { ChronoBadge } from "@chrono/chrono-badge.component";
import {
  ChronoCard,
  ChronoCardContent,
  ChronoCardDescription,
  ChronoCardHeader,
  ChronoCardTitle,
} from "@chrono/chrono-card.component";

import { IValidateAmountParamsEntity } from "@/src/domain";
import { usePaymentContext } from "@/src/shared/context/payment.context";
import { cn } from "@/src/lib/utils";

type QrSectionProps = {
  className?: string;
};

export function QrSectionComponent({ className }: QrSectionProps) {
  const { validateFee, clearValidateResult } = usePaymentContext();

  const onValidateFee = async (data: IValidateAmountParamsEntity) => {
    clearValidateResult();
    if (!data.parkingSessionId) return false;
    const success = await validateFee(data);
    return success;
  };

  return (
    <ChronoCard className={cn("overflow-hidden pb-0", className)}>
      <ChronoCardContent className="flex h-full flex-col">
      <ChronoCardHeader className="px-0">
        <ChronoCardTitle className="text-lg font-semibold">Validar tarifa</ChronoCardTitle>
        <ChronoCardDescription>Escanea el QR para validar la tarifa de parqueo</ChronoCardDescription>
      </ChronoCardHeader>
        <QrFormComponent onValidateFee={onValidateFee} onClear={clearValidateResult} />
      </ChronoCardContent>
    </ChronoCard>
  );
}

function QrFormComponent({
  onValidateFee,
  onClear
}: {
  onValidateFee: (data: IValidateAmountParamsEntity) => Promise<boolean>;
  onClear: () => void;
}) {
  const validateFeeForm = useForm({
    resolver: zodResolver(ValidateFeeSchema),
    defaultValues: {
      exitTime: new Date(),
      parkingSessionId: "",
    },
  });

  return (
      <form
        className="flex flex-col gap-2 my-4 overflow-y-auto sm:flex-row"
        onChange={validateFeeForm.handleSubmit(async (data) => {
          const isValid = await onValidateFee(data);
          if (!isValid) {
            validateFeeForm.reset({ exitTime: new Date(), parkingSessionId: "" });
          }
        })}
      >
        <div className="flex flex-1 flex-col gap-3 rounded-xl justify-center">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <ChronoBadge variant="outline" className="border-primary/40 text-foreground">
              Paso 1
            </ChronoBadge>
            <span>Hora de salida</span>
          </div>
          <Controller
            control={validateFeeForm.control}
            name="exitTime"
            render={({ field, fieldState }) => (
              <ChronoField data-invalid={fieldState.invalid}>
                <ChronoDateTimePicker
                  {...field}
                  date={field.value as Date | undefined}
                  setDate={(value) => field.onChange(value)}
                />

                {fieldState.invalid && <ChronoFieldError errors={[fieldState.error]} />}
              </ChronoField>
            )}
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 rounded-xl py-2">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <ChronoBadge variant="outline" className="border-primary/40 text-foreground">
              Paso 2
            </ChronoBadge>
            <span>Escanear QR</span>
          </div>

          <Controller
            control={validateFeeForm.control}
            name="parkingSessionId"
            render={({ field, fieldState }) => (
              <ChronoField data-invalid={fieldState.invalid}>
                <ChronoQrScannerInput
                  {...field}
                  id="parkingSessionId"
                  value={field.value ?? ""}
                  onClear={onClear}
                  placeholder="Escanea el código"
                />

                {fieldState.invalid && <ChronoFieldError errors={[fieldState.error]} />}
              </ChronoField>
            )}
          />
        </div>
      </form>
  );
}
