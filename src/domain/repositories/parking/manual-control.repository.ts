import { IGenerateManualIncomeParamsEntity, IGenerateManualIncomeResponse } from "@/domain/index";

export abstract class ManualControlRepository {
    abstract generateManualIncome(params:IGenerateManualIncomeParamsEntity): Promise<IGenerateManualIncomeResponse>
}