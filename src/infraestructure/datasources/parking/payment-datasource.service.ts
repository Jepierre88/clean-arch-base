import { injectable } from "tsyringe";
import { IValidateAmountParamsEntity, IValidateAmountResponseEntity, PaymentRepository } from "@/domain/index";
import { AxiosServerInstance } from "../axios-server.intance";
@injectable()
export class PaymentDatasourceService extends AxiosServerInstance implements PaymentRepository {
    async validateFee(params: IValidateAmountParamsEntity): Promise<IValidateAmountResponseEntity> {
        const { parkingSessionId, exitDate } = params;
        return this.api.post<IValidateAmountResponseEntity>(`/parking-sessions/${parkingSessionId}/calculate-fee`, { exitDate }).then(response => response.data);
    }
}