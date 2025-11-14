import { Separator } from "@/src/shared/components/ui/separator"
import Title from "@/src/shared/components/ui/title";
import ManualIncomeFormComponent from "./components/manual-income-form.component";

export default function ManualControlPage() {
  return (
    <div className="flex h-full w-full min-h-0 gap-6">
      <div className="flex flex-1 min-w-0">
        <ManualIncomeFormComponent />
      </div>
      <Separator orientation="vertical" className="h-full" />
      <article className="flex flex-1 min-w-0 flex-col gap-4 rounded-2xl border border-border/60 bg-card/80 p-4">
        <Title>Salida manual</Title>
      </article>
    </div>
  );
}
