import IIdName from "../../interfaces/generic/id-name.interface";
import { TApplication } from "./application.type";
import TCompany from "./company.type";

export type TPermission = {
  company : TCompany;
  role: IIdName,
  applications: TApplication[]
}