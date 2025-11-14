import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/src/shared/components/ui/card";
import { QrDetailSectionComponent } from "./components/parking-detail-section.component";
import { QrSectionComponent } from "./components/qr-section.component";
import Title from "@/src/shared/components/ui/title";

export default function Page() {
  return (
    <section className="grid grid-cols-2 gap-8 h-full max-h-full">
      <div className="col-span-1 flex flex-col gap-4">
        <Card className="rounded-xl h-full flex flex-1">
          <CardContent>
            <QrSectionComponent />
          </CardContent>
        </Card>

        <Card className="p-12 rounded-xl col-span-2 h-full flex-1"></Card>
      </div>
      <QrDetailSectionComponent />
    </section>
  );
}
