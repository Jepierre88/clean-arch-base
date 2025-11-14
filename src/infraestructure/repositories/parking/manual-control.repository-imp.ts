import { inject, injectable } from "tsyringe";

import { IGenerateManualIncomeParamsEntity, IGenerateManualIncomeResponse, ManualControlRepository } from "@/domain/index";
import { ManualControlDatasourceService } from "@/infraestructure/index";

@injectable()
export class ManualControlRepositoryImp implements ManualControlRepository {

    constructor(@inject("ManualControlDatasourceService") private manualControlDatasourceService: ManualControlDatasourceService){}

    generateManualIncome(params: IGenerateManualIncomeParamsEntity): Promise<IGenerateManualIncomeResponse> {
        return this.manualControlDatasourceService.generateManualIncome(params)
    }

}