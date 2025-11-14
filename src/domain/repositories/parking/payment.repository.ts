import { IValidateAmountParamsEntity, IValidateAmountResponseEntity } from "@/domain/index"

export abstract class PaymentRepository {

    abstract validateFee(params: IValidateAmountParamsEntity): Promise<IValidateAmountResponseEntity>;

}