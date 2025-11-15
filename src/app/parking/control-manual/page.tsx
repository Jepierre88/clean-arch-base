import { Separator } from "@/src/shared/components/ui/separator"
import Title from "@/src/shared/components/ui/title";
import ManualIncomeFormComponent from "./components/manual-income-form.component";
import { SetupHeaderFilters } from "@/src/shared/components/layout/setup-header-filters.component";

export default function ManualControlPage() {
  return (
    <div className="flex h-full w-full min-h-0 gap-6">
      <SetupHeaderFilters showDatePicker={false} showSearch={false} />
      <div className="flex flex-1 min-w-0">
        <ManualIncomeFormComponent />
      </div>
      <Separator orientation="vertical" className="h-full" />
      <div className="flex flex-1 min-w-0">
        <Title>Salida manual</Title>
      </div>
    </div>
  );
}
