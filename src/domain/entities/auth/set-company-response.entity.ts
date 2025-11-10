import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import TCompany from "@/src/shared/types/auth/company.type";

export interface ISetCompanyResponse
  extends IGeneralResponse<{
    access_token: string;
    refresh_token: string;
    company: TCompany;
  }> {}
