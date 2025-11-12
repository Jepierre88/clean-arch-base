import { IGenerateManualIncomeEntity, ManualControlRepository } from "@/domain/index";
import { AxiosServerInstance } from "../axios-server.intance";
import IEmptyResponse from "@/src/shared/interfaces/generic/empty-response";
import { injectable } from "tsyringe";

@injectable()
export class ManualControlDatasourceService extends AxiosServerInstance implements ManualControlRepository {
    generateManualIncome(params: IGenerateManualIncomeEntity): Promise<IEmptyResponse> {
        return this.api.post<IEmptyResponse>("/parking-sessions/manual-entry", params).then(response => response.data);
    }
}