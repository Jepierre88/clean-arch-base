import { IGenerateManualIncomeEntity } from "@/domain/index";
import IEmptyResponse from "@/src/shared/interfaces/generic/empty-response";

export abstract class ManualControlRepository {
    abstract generateManualIncome(params:IGenerateManualIncomeEntity): Promise<IEmptyResponse>
}