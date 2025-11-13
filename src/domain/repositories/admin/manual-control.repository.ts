import { IGenerateManualIncomeParamsEntity } from "@/domain/index";
import IEmptyResponse from "@/src/shared/interfaces/generic/empty-response";

export abstract class ManualControlRepository {
    abstract generateManualIncome(params:IGenerateManualIncomeParamsEntity): Promise<IEmptyResponse>
}