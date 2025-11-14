import IIdName from "../../interfaces/generic/id-name.interface";
import { TAction } from "./action.type";

export type TSubResource = {
  path: string;
  icon: string;
  action: TAction
} & IIdName