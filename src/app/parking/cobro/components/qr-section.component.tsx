"use client";

import { Controller, useForm } from "react-hook-form";
import { ValidateFeeSchema } from "@/src/shared/schemas/parking/validate-fee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "@/src/shared/components/ui/field";
import { DateTimePicker } from "@/src/shared/components/form/date-time-pricker.component";
import QrScannerInput from "@/src/shared/components/form/qr-scanner-input.component";
import { Badge } from "@/src/shared/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/src/shared/components/ui/card";

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
    <Card className={cn("overflow-hidden pb-0", className)}>
      <CardContent className="flex h-full flex-col py-4">
        <QrFormComponent onValidateFee={onValidateFee} onClear={clearValidateResult} />
      </CardContent>
    </Card>
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
        className="flex flex-col gap-3 overflow-y-auto max-h-min"
        onChange={validateFeeForm.handleSubmit(async (data) => {
          const isValid = await onValidateFee(data);
          if (!isValid) {
            validateFeeForm.reset({ exitTime: new Date(), parkingSessionId: "" });
          }
        })}
      >
        <div className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Badge variant="outline" className="border-primary/40 text-foreground">
                Paso 1
              </Badge>
              <span>Hora de salida</span>
            </div>
          </div>

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

        <div className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Badge variant="outline" className="border-primary/40 text-foreground">
                Paso 2
              </Badge>
              <span>Escanear QR</span>
            </div>
          </div>

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
                    onClear={onClear}
                    placeholder="Escanea el QR con la pistola lectora"
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </div>
      </form>
  );
}
