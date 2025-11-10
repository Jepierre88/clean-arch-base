import { inject, injectable } from "tsyringe";

import {
  ISetCompanyParams,
  ISetCompanyResponse,
  SetCompanyRepository,
} from "@/domain/index";

@injectable()
export class SetCompanyUseCase {
  constructor(
    @inject("SetCompanyRepository")
    private readonly setCompanyRepository: SetCompanyRepository
  ) {}

  execute(params: ISetCompanyParams): Promise<ISetCompanyResponse> {
    return this.setCompanyRepository.setCompany(params);
  }
}
