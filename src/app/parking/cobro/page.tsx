import { Card, CardContent, CardDescription, CardHeader } from "@/src/shared/components/ui/card";
import { QrDetailSectionComponent } from "./components/parking-detail-section.component";
import { QrSectionComponent } from "./components/qr-section.component";
import Title from "@/src/shared/components/ui/title";

export default function Page() {
  return (
    <section className="grid grid-cols-2 gap-8 h-full">
      <Card className="rounded-xl col-span-1 h-full flex">
        <CardContent>
          <CardHeader>
              <Title className="text-xl" type="h2">
                Datos del vehículo
              </Title>
              <CardDescription>
                Valida el valor a pagar por el tiempo de estacionamiento del
                vehículo en el estacionamiento.
              </CardDescription>
          </CardHeader>
        <QrSectionComponent />
        </CardContent>
      </Card>
      <Card className="rounded-xl col-span-1 h-full">
        <CardContent className="flex flex-col">

          
          <CardHeader>
            <Title type="h2">Detalles de la sesión de parqueo</Title>
          </CardHeader>
        <QrDetailSectionComponent />
        </CardContent>
      </Card>
      <Card className="p-12 rounded-xl col-span-2 h-full"></Card>
    </section>
  );
}
