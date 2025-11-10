import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import TCompany from "@/src/shared/types/auth/company.type";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ISetCompanyResponse
  extends IGeneralResponse<{
    accessToken: string;
    refreshToken: string;
    company: TCompany;
  }> {}
