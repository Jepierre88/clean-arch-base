import { ISetCompanyParams, ISetCompanyResponse } from "@/domain/index";

export abstract class SetCompanyRepository {
  abstract setCompany(params: ISetCompanyParams): Promise<ISetCompanyResponse>;
}
