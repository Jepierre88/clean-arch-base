import { inject, injectable } from "tsyringe";
import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import { EServices } from "@/src/shared/enums/common/services.enum";
import { CommonRepository } from "@/domain/index";

@injectable()
export class CommonUsecase implements CommonRepository {
  constructor(
    @inject("CommonRepository")
    private readonly commonRepository: CommonRepository
  ) {}

  get<T = unknown>(service: EServices): Promise<IGeneralResponse<T>> {
    return this.commonRepository.get<T>(service);
  }
}
