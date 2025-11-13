import { inject, injectable } from "tsyringe";

import { IValidateAmmountParamsEntity, IValidateAmmountResponseEntity, PaymentRepository } from "@/domain/index"

@injectable()
export class PaymentUsecase implements PaymentRepository{
    constructor(
        @inject("PaymentRepository") private paymentRepository: PaymentRepository
    ) {}

    validateFee(params: IValidateAmmountParamsEntity): Promise<IValidateAmmountResponseEntity> {
        return this.paymentRepository.validateFee(params);
    }
}