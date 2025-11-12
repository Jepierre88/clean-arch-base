import { Separator } from "@/src/shared/components/ui/separator"
import Title from "@/src/shared/components/ui/title";
import ManualIncomeForomComponent from "./components/manual-income-form.component";

export default function ManualControlPage() {
  return (
    <div className="flex w-full h-full gap-4 justify-between">
      <article className="flex flex-col gap-4 flex-1">
        <Title>Ingreso manual</Title>
        <ManualIncomeForomComponent/>
      </article>
      <Separator orientation="vertical" className="h-full"/>
      <article className="flex flex-col gap-4 flex-1">
        <Title>Salida manual</Title>
      </article>
    </div>
  );
}
