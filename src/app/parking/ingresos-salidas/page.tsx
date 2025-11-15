import { IPageProps } from "@/src/shared/interfaces/generic/page-props.interface";
import InOutDataFetchComponent from "./components/in-out-data-fetch.component";

export default async function InOutPage({
  searchParams,
}: {
  searchParams: Promise<IPageProps["searchParams"]>;
}) {
  return <InOutDataFetchComponent searchParams={await searchParams} />;
}