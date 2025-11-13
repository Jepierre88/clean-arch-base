"use client";

import { getRateProfileAction } from "@/src/app/global-actions/get-common.action";
import { Button } from "@/src/components/ui/button";
import { IGenerateManualIncomeParamsEntity } from "@/src/domain";
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
} from "@/src/shared/schemas/parking/manual-income.schema";
import { TRateProfile } from "@/src/shared/types/common/rate-profile.type";
import { TVehicleType } from "@/src/shared/types/common/vehicle-types.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    <Card className="w-full md:w-2/3 mx-auto my-auto">
      <CardContent>
        <CardHeader>
          {/* <CardDescription>
            <p>Genera ingresos manuales con total facilidad</p>
          </CardDescription> */}
        </CardHeader>

        <IncomeForm
          vehicleTypes={vehicleTypes}
          onSubmit={onManualIncomeSubmit}
        />
      </CardContent>
    </Card>
  );
}

const IncomeForm = ({
  vehicleTypes,
  onSubmit,
}: {
  vehicleTypes: TVehicleType[];
  onSubmit: (params: ManualIncomeForm) => Promise<boolean>;
}) => {
  const [rateProfiles, setRateProfiles] = useState<TRateProfile[]>([]);

  const incomeForm = useForm({
    resolver: zodResolver(ManualIncomeSchema),
    defaultValues: {
      entryTime: new Date(),
      licensePlate: "",
        vehicleTypeId: "",
        rateProfileId: "",
    },
  });

  const vehicleTypeChanged = async (vehicleTypeId: string) => {
    incomeForm.resetField("rateProfileId")
    if (!vehicleTypeId) return;

    const profiles = await getRateProfileAction(vehicleTypeId);
    if (profiles.success) {
      setRateProfiles(profiles.data?.data || []);
    } else {
      toast.error("Error cargando perfiles de tarifa: " + profiles.error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={incomeForm.handleSubmit((data) => {
        const isSuccess = onSubmit(data);
        isSuccess.then((result) => { if(result) incomeForm.reset()});
      })}
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="vehicleTypeId"
        control={incomeForm.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="vehicleTypeId">Tipo de vehículo</FieldLabel>

            <Select
              onValueChange={(value) => {
                field.onChange(value);
                vehicleTypeChanged(value);
              }}
              value={field.value}
            >
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

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              date={field.value as Date | undefined}
              setDate={(value) => field.onChange(value)}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller 
        name="rateProfileId"
        control={incomeForm.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="rateProfileId">Perfil de tarifa</FieldLabel>
            <Select
              onValueChange={(value) => field.onChange(value)}
              disabled={rateProfiles.length === 0}
              value={field.value ?? ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar perfil de tarifa" />
              </SelectTrigger>
              <SelectContent>
                {rateProfiles?.map((profile) => (
                  <SelectItem key={profile.value} value={profile.value}>{profile.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={incomeForm.formState.isSubmitting || !incomeForm.formState.isValid}>
        <Check /> Generar ingreso manual
      </Button>
    </form>
  );
};
