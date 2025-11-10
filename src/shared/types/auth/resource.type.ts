import IIdName from "../../interfaces/generic/id-name.interface";
import { TAction } from "./action.type";
import { TSubResource } from "./sub-resources.type";

export type TResource   = {
  icon: string;
  path: string;
  subresources: TSubResource[];
  actions: TAction  [];
} & IIdName