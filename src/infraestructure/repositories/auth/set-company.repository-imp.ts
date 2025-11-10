import { inject, injectable } from "tsyringe";

import { ISetCompanyParams, ISetCompanyResponse, SetCompanyRepository } from "@/domain/index"

import { SetCompanyDatasourceService } from "@/infraestructure/index"

@injectable()
export class SetCompanyRepositoryImp implements SetCompanyRepository {
  constructor(
    @inject("SetCompanyDatasourceService")
    private readonly datasource: SetCompanyDatasourceService
  ) {}

  setCompany(params: ISetCompanyParams): Promise<ISetCompanyResponse> {
    return this.datasource.setCompany(params);
  }
}
