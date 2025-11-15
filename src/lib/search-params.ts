import { z, ZodTypeAny } from "zod";

import { IPageProps } from "@/src/shared/interfaces/generic/page-props.interface";

type SearchParamsInput = IPageProps["searchParams"];

type NormalizedSearchParams = Record<string, string | undefined>;

const normalizeSearchParams = (
  searchParams?: SearchParamsInput
): NormalizedSearchParams => {
  if (!searchParams) {
    return {};
  }

  return Object.entries(searchParams).reduce<NormalizedSearchParams>(
    (acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value[0] : value;
      return acc;
    },
    {}
  );
};

export const buildSearchParams = <TSchema extends ZodTypeAny>(
  schema: TSchema,
  searchParams?: SearchParamsInput,
  overrides?: Record<string, unknown>
): z.output<TSchema> => {
  const normalized = normalizeSearchParams(searchParams);
  return schema.parse({
    ...normalized,
    ...overrides,
  });
};

export { normalizeSearchParams };
