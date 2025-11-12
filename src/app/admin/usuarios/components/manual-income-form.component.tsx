"use client";

import { Button } from "@/src/components/ui/button";
import { DateTimePicker } from "@/src/shared/components/form/date-time-pricker.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/shared/components/ui/select";
import { useCommonContext } from "@/src/shared/context/common.context";
import { Check } from "lucide-react";
import { useState } from "react";

export default function ManualIncomeForomComponent() {

  const [date, setDate] = useState<Date>(new Date());
  const {vehicleTypes} = useCommonContext()
  
  return (
    <Card className="w-full md:w-2/3 mx-auto my-auto">
      <CardContent>
        <CardHeader>
          {/* <CardDescription>
            <p>Genera ingresos manuales con total facilidad</p>
          </CardDescription> */}
        </CardHeader>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Placa</Label>
            <Input placeholder="QJJ15G" className="uppercase" maxLength={6}/>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tipo de vehiculo</Label>
            <Select>
              <SelectTrigger className="w-full">Ingresar el tipo de vehículo</SelectTrigger>
              <SelectContent>
                {vehicleTypes && vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Fecha de ingreso</Label> 
            <DateTimePicker date={date} setDate={setDate} />
          </div>
        </form>

        <CardFooter className="flex justify-end mt-4 p-0">
          <Button><Check/> Generar ingreso manual</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
