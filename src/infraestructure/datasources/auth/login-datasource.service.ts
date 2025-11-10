import { LoginRepository } from "@/src/domain/repositories/auth/login.repository";
import { AxiosServerInstance } from "../axios-server.intance";
import { ILoginParams } from "@/src/domain/entities/auth/login-params.entity";
import { ILoginResponse } from "@/src/domain/entities/auth/login-response.entity";
import { injectable } from "tsyringe";
import TCompany from "@/src/shared/types/auth/company.type";

@injectable()
export class LoginDatasourceService extends AxiosServerInstance implements LoginRepository {
    async login(params: ILoginParams): Promise<ILoginResponse> {
        const response = await this.api.post<ILoginResponse>("/auth/login", params);

        return response.data;
    }
}