import { Card, CardContent } from "@/src/shared/components/ui/card";
import { QrDetailSectionComponent } from "./components/parking-detail-section.component";
import { QrSectionComponent } from "./components/qr-section.component";

export default function Page() {
  return (
    <section className="grid grid-cols-2 gap-8 h-full max-h-full">
      <div className="col-span-1 flex flex-col gap-4">
        <Card className="h-full flex-1 overflow-visible">
          <CardContent className="px-0 pb-2 pt-6 sm:px-4">
            <QrSectionComponent />
          </CardContent>
        </Card>

        <Card className="h-full flex-1 p-12"></Card>
      </div>
      <QrDetailSectionComponent />
    </section>
  );
}
