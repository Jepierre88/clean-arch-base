import { IValueLabel } from "../../interfaces/generic/value-label";

export type TRateProfile = {
  description: string;
  priority: number;
} & IValueLabel<string>