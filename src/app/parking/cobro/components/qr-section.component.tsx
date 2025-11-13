"use client";

import { Controller, useForm } from "react-hook-form";
import { ValidateFeeSchema } from "@/src/shared/schemas/parking/validate-fee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/shared/components/ui/input";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { DateTimePicker } from "@/src/shared/components/form/date-time-pricker.component";
import Title from "@/src/shared/components/ui/title";
import { IValidateAmmountParamsEntity } from "@/src/domain";
import { usePaymentContext } from "@/src/shared/context/payment.context";

export function QrSectionComponent() {
  const { validateFee, clearValidateResult } = usePaymentContext();

  const onValidateFee = async (data: IValidateAmmountParamsEntity) => {
    clearValidateResult();
    if (!data.parkingSessionId) return;
    await validateFee(data);
  };

  return (
      <QrFormComponent onValidateFee={onValidateFee} />
  );
}

function QrFormComponent({
  onValidateFee,
}: {
  onValidateFee: (data: IValidateAmmountParamsEntity) => Promise<void>;
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
    className="flex flex-col gap-4 mt-8"
      onChange={validateFeeForm.handleSubmit(async (data) => {
        await onValidateFee(data);
      })}
    >
      <Controller
        control={validateFeeForm.control}
        name="parkingSessionId"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="parkingSessionId">Leer QR</FieldLabel>
            <Input
              {...field}
              placeholder="Escanea el QR de ingreso con la lectora de QR"
            ></Input>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={validateFeeForm.control}
        name="exitTime"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="exitTime">Hora de salida</FieldLabel>
            <DateTimePicker
              {...field}
              date={field.value as Date | undefined}
              setDate={(value) => field.onChange(value)}
            ></DateTimePicker>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
