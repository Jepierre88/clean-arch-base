import { ChronoSeparator } from "@chrono/chrono-separator.component";
import ChronoTitle from "@chrono/chrono-title.component";
import ManualIncomeFormComponent from "./components/manual-income-form.component";
import { SetupHeaderFilters } from "@/src/shared/components/layout/setup-header-filters.component";

export default function ManualControlPage() {
  return (
    <div className="flex h-full w-full min-h-0 gap-6">
      <SetupHeaderFilters showDatePicker={false} showSearch={false} />
      <div className="flex flex-1 min-w-0">
        <ManualIncomeFormComponent />
      </div>
      <ChronoSeparator orientation="vertical" className="h-full" />
      <div className="flex flex-1 min-w-0">
        <ChronoTitle>Salida manual</ChronoTitle>
      </div>
    </div>
  );
}
