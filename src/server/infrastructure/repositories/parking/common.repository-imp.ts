import { inject, injectable } from "tsyringe";
import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import { EServices } from "@/src/shared/enums/common/services.enum";
import { CommonRepository } from "@/src/domain/repositories/parking/common.repository";
import { CommonDatasourceService } from "@/server/infrastructure/index";
import { TRateProfile } from "@/src/shared/types/common/rate-profile.type";

@injectable()
export class CommonRepositoryImp implements CommonRepository {
  constructor(
    @inject("CommonDatasourceService")
    private readonly ds: CommonDatasourceService
  ) {}

  get<T = unknown>(service: EServices): Promise<IGeneralResponse<T>> {
    return this.ds.get<T>(service);
  }

  getRateProfiles(vehicleTypeId: string): Promise<IGeneralResponse<TRateProfile, false>> {
    return this.ds.getRateProfiles(vehicleTypeId);
  }
}
