import { QrSectionComponent } from "./components/qr-section.component";

export default function Page() {
  return (
    <section>
      <article className="bg-muted p-12 rounded-xl">
        <QrSectionComponent/>
      </article>
    </section>
  );
}