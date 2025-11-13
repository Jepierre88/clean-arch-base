import { IValidateAmmountParamsEntity, IValidateAmmountResponseEntity } from "@/domain/index"

export abstract class PaymentRepository {

    abstract validateFee(params: IValidateAmmountParamsEntity): Promise<IValidateAmmountResponseEntity>;

}