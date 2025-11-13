import { inject, injectable } from "tsyringe";

import { IGenerateManualIncomeParamsEntity, ManualControlRepository } from "@/domain/index";
import { ManualControlDatasourceService } from "@/infraestructure/index";
import IEmptyResponse from "@/src/shared/interfaces/generic/empty-response";

@injectable()
export class ManualControlRepositoryImp implements ManualControlRepository {

    constructor(@inject("ManualControlDatasourceService") private manualControlDatasourceService: ManualControlDatasourceService){}

    generateManualIncome(params: IGenerateManualIncomeParamsEntity): Promise<IEmptyResponse> {
        return this.manualControlDatasourceService.generateManualIncome(params)
    }

}