"use client";

import { Button } from "@/src/components/ui/button";
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
import { Check } from "lucide-react";

export default function ManualIncomeForomComponent() {
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
                <SelectItem value="MOTO">MOTO</SelectItem>
                <SelectItem value="CARRo">Carro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Fecha de ingreso</Label>
            <Input type="date" className="w-full"/>
          </div>
        </form>

        <CardFooter className="flex justify-end mt-4 p-0">
          <Button><Check/> Generar ingreso manual</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
