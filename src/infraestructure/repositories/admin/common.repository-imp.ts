import { inject, injectable } from "tsyringe";
import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import { EServices } from "@/src/shared/enums/common/services.enum";
import { CommonRepository } from "@/domain/repositories/admin/common.repository";
import { CommonDatasourceService } from "@/infraestructure/index";

@injectable()
export class CommonRepositoryImp implements CommonRepository {
  constructor(
    @inject("CommonDatasourceService")
    private readonly ds: CommonDatasourceService
  ) {}

  get<T = unknown>(service: EServices): Promise<IGeneralResponse<T>> {
    return this.ds.get<T>(service);
  }
}
