import { IPageProps } from "@/src/shared/interfaces/generic/page-props.interface";
import InOutDataFetchComponent from "./components/in-out-data-fetch.component";
import { SetupHeaderFilters } from "@/src/shared/components/layout/setup-header-filters.component";
import { InOutOverviewCard } from "./components/overview-card.component";

export default async function InOutPage({
  searchParams,
}: {
  searchParams: Promise<IPageProps["searchParams"]>;
}) {
  const resolvedSearchParams = await searchParams;


  return (
    <div className="space-y-6">
      <SetupHeaderFilters showDatePicker={false} showSearch={true} />
      <InOutOverviewCard/>
      <InOutDataFetchComponent searchParams={resolvedSearchParams} />
    </div>
  );
}