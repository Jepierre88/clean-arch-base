import { injectable } from "tsyringe";
import { IValidateAmountParamsEntity, IValidateAmountResponseEntity, PaymentRepository } from "@/domain/index";
import { AxiosServerInstance } from "../axios-server.intance";
@injectable()
export class PaymentDatasourceService extends AxiosServerInstance implements PaymentRepository {
    async validateFee(params: IValidateAmountParamsEntity): Promise<IValidateAmountResponseEntity> {
        const { parkingSessionId, plate, exitDate } = params;

        const identifier = parkingSessionId || plate;
        if (!identifier) {
            throw new Error("Se requiere QR o placa para validar la tarifa");
        }

        return this.api
            .post<IValidateAmountResponseEntity>(`/parking-sessions/${identifier}/calculate-fee`, { exitDate })
            .then(response => response.data);
    }
}