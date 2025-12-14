"use client";

import { Controller, useForm } from "react-hook-form";
import { ValidateFeeSchema } from "@/src/shared/schemas/parking/validate-fee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "@/src/shared/components/ui/field";
import { DateTimePicker } from "@/src/shared/components/form/date-time-pricker.component";
import QrScannerInput from "@/src/shared/components/form/qr-scanner-input.component";
import { Badge } from "@/src/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/shared/components/ui/card";

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
      <CardContent className="flex h-full flex-col">
      <CardHeader className="px-0">
        <CardTitle className="text-lg font-semibold">Validar tarifa</CardTitle>
        <CardDescription>Escanea el QR para validar la tarifa de parqueo</CardDescription>
      </CardHeader>
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
            <Badge variant="outline" className="border-primary/40 text-foreground">
              Paso 1
            </Badge>
            <span>Hora de salida</span>
          </div>
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

        <div className="flex flex-1 flex-col gap-3 rounded-xl py-2">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <Badge variant="outline" className="border-primary/40 text-foreground">
              Paso 2
            </Badge>
            <span>Escanear QR</span>
          </div>

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
                  placeholder="Escanea el código"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </form>
  );
}
