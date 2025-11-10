import IIdName from "../../interfaces/generic/id-name.interface";
import { TResource } from "./resource.type";

export type TApplication = {
  path: string;
  isActive: boolean;
  resources:TResource[];
} & IIdName