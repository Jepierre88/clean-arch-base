import { injectable } from "tsyringe";
import { IValidateAmmountParamsEntity, IValidateAmmountResponseEntity, PaymentRepository } from "@/domain/index"
import { AxiosServerInstance } from "../axios-server.intance";
@injectable()
export class PaymentDatasourceService extends AxiosServerInstance implements PaymentRepository{
    async validateFee(params: IValidateAmmountParamsEntity): Promise<IValidateAmmountResponseEntity> {
        const { parkingSessionId, exitDate } = params;
        return this.api.post<IValidateAmmountResponseEntity>(`/parking-sessions/${parkingSessionId}/calculate-fee`, { exitDate }).then(response => response.data);
    }
}