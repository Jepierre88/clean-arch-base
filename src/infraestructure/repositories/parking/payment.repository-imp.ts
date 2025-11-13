import { inject, injectable } from "tsyringe";
import { IValidateAmmountParamsEntity, IValidateAmmountResponseEntity, PaymentRepository } from "@/domain/index"
import { PaymentDatasourceService } from "@/infraestructure/index";

@injectable()
export class PaymentRepositoryImp implements PaymentRepository {

    constructor(
        @inject("PaymentDatasourceService")
        private paymentDatasourceService: PaymentDatasourceService
    ){}

    async validateFee(params: IValidateAmmountParamsEntity): Promise<IValidateAmmountResponseEntity> {
        return this.paymentDatasourceService.validateFee(params);
    }
}