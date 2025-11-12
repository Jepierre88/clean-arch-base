import { inject, injectable } from "tsyringe";

import { IGenerateManualIncomeEntity, ManualControlRepository } from "@/domain/index";
import { ManualControlDatasourceService } from "@/infraestructure/index";
import IEmptyResponse from "@/src/shared/interfaces/generic/empty-response";

@injectable()
export class ManualControlRepositoryImp implements ManualControlRepository {

    constructor(@inject("ManualControlDatasourceService") private manualControlDatasourceService: ManualControlDatasourceService){}

    generateManualIncome(params: IGenerateManualIncomeEntity): Promise<IEmptyResponse> {
        return this.manualControlDatasourceService.generateManualIncome(params)
    }

}