import { IGenerateManualIncomeParamsEntity, IGenerateManualIncomeResponse, ManualControlRepository } from "@/domain/index";
import IEmptyResponse from "@/src/shared/interfaces/generic/empty-response";
import { inject, injectable } from "tsyringe";

@injectable()
export class ManualControlUseCase implements ManualControlRepository {
    constructor(@inject("ManualControlRepository") private manualControlRepository: ManualControlRepository){}

    generateManualIncome(params: IGenerateManualIncomeParamsEntity): Promise<IGenerateManualIncomeResponse> {
        return this.manualControlRepository.generateManualIncome(params)
    }
}