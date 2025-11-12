"use client";

import { Button } from "@/src/components/ui/button";
import { IGenerateManualIncomeEntity } from "@/src/domain";
import { DateTimePicker } from "@/src/shared/components/form/date-time-pricker.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/src/shared/components/ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
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
} from "@/src/shared/schemas/admin/manual-income.schema";
import { TVehicleType } from "@/src/shared/types/common/vehicle-types.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ManualIncomeFormComponent() {
  const { vehicleTypes } = useCommonContext();


  const onManualIncomeSubmit = (params: ManualIncomeForm) => {
    console.log(params)
  };

  return (
    <Card className="w-full md:w-2/3 mx-auto my-auto">
      <CardContent>
        <CardHeader>
          {/* <CardDescription>
            <p>Genera ingresos manuales con total facilidad</p>
          </CardDescription> */}
        </CardHeader>

        <IncomeForm vehicleTypes={vehicleTypes} onSubmit={onManualIncomeSubmit}/>
      </CardContent>
    </Card>
  );
}


const IncomeForm = ({vehicleTypes, onSubmit}: {
  vehicleTypes: TVehicleType[],
  onSubmit: (params: ManualIncomeForm)=>void
}) => {
    const incomeForm = useForm({
    resolver: zodResolver(ManualIncomeSchema),
    defaultValues: {
      entryTime: new Date(),
      licensePlate: "",
      vehivleTypeId: "",
    },
  });
  return (
     <form
          className="flex flex-col gap-4"
          onSubmit={incomeForm.handleSubmit(onSubmit)}
        >
          <Controller
            control={incomeForm.control}
            name="licensePlate"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="licensePlate">Placa</FieldLabel>
                <Input
                  {...field}
                  placeholder="QJJ15G"
                  className="uppercase"
                  maxLength={6}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="vehivleTypeId"
            control={incomeForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="vehivleTypeId">Tipo de vehículo</FieldLabel>

                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="entryTime"
            control={incomeForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="entryTime">Fecha y hora de ingreso</FieldLabel>

                <DateTimePicker
                  date={field.value as Date | undefined} // 👈 forzamos el tipo correcto
                  setDate={(value) => field.onChange(value)}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit">
            <Check /> Generar ingreso manual
          </Button>
        </form>
  )
}