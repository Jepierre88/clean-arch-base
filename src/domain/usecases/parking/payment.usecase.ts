import { inject, injectable } from "tsyringe";

import { IValidateAmountParamsEntity, IValidateAmountResponseEntity, PaymentRepository } from "@/domain/index"

@injectable()
export class PaymentUsecase implements PaymentRepository{
    constructor(
        @inject("PaymentRepository") private paymentRepository: PaymentRepository
    ) {}

    validateFee(params: IValidateAmountParamsEntity): Promise<IValidateAmountResponseEntity> {
        return this.paymentRepository.validateFee(params);
    }
}