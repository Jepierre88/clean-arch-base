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
import { validateFeeAction } from "../actions/validate-fee.action";
import { IValidateAmmountParamsEntity } from "@/src/domain";

export function QrSectionComponent() {
  const validateFeeForm = useForm({
    resolver: zodResolver(ValidateFeeSchema),
    defaultValues: {
      exitTime: new Date(),
      parkingSessionId: "",
    },
  });

  const onValidateFee = async (data: IValidateAmmountParamsEntity) => {
    const response = await validateFeeAction(data);
    console.log(response);
  }

  return (
    <header>
      <Title className="text-xl" type="h2">Datos del vehículo</Title>
      <form onChange={validateFeeForm.handleSubmit(onValidateFee)}>
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
    </header>
  );
}
