import { QrDetailSectionComponent } from "./components/parking-detail-section.component";
import { QrSectionComponent } from "./components/qr-section.component";

export default function Page() {
  return (
    <section className="grid grid-cols-2 gap-8 h-full">
      <article className="bg-muted p-12 rounded-xl col-span-1 h-full flex flex-col">
        <QrSectionComponent/>
      </article>
      <article className="bg-muted p-12 rounded-xl col-span-1 h-full flex flex-col">
        <QrDetailSectionComponent/>
      </article>
      <article className="bg-muted p-12 rounded-xl col-span-2 h-full flex flex-col"></article>
    </section>
  );
}