import { QrDetailSectionComponent } from "./components/parking-detail-section.component";
import { QrSectionComponent } from "./components/qr-section.component";
import { PaymentSectionComponent } from "./components/payment-section.component";

export default function Page() {
  return (
    <section className="grid grid-cols-2 gap-8 h-full max-h-full content-center">
      <div className="col-span-1 flex flex-col gap-4 justify-center">
        <QrSectionComponent />

        <PaymentSectionComponent />
      </div>
      <QrDetailSectionComponent />
    </section>
  );
}
