import { inject, injectable } from "tsyringe";
import { IValidateAmountParamsEntity, IValidateAmountResponseEntity, PaymentRepository } from "@/domain/index"
import { PaymentDatasourceService } from "@/infraestructure/index";

@injectable()
export class PaymentRepositoryImp implements PaymentRepository {

    constructor(
        @inject("PaymentDatasourceService")
        private paymentDatasourceService: PaymentDatasourceService
    ){}

    async validateFee(params: IValidateAmountParamsEntity): Promise<IValidateAmountResponseEntity> {
        return this.paymentDatasourceService.validateFee(params);
    }
}