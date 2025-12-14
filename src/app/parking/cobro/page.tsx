import { QrDetailSectionComponent } from "./components/parking-detail-section.component";
import { QrSectionComponent } from "./components/qr-section.component";
import { PaymentSectionComponent } from "./components/payment-section.component";

export default function Page() {
  return (
    <section className="grid h-full max-h-full min-h-0 grid-cols-2 gap-8 overflow-hidden">
      <div className="flex h-full min-h-0 flex-col gap-4">
        <QrSectionComponent className="h-min min-h-0" />

        <PaymentSectionComponent className="flex-1" />
      </div>
      <QrDetailSectionComponent className="min-h-0" />
    </section>
  );
}
