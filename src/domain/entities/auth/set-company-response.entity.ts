import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import TCompany from "@/src/shared/types/auth/company.type";

export interface ISetCompanyResponse
  extends IGeneralResponse<{
    accessToken: string;
    refreshToken: string;
    company: TCompany;
  }> {}
