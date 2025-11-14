import { inject, injectable } from "tsyringe";

import { ILoginParams, ILoginResponse, LoginRepository } from "@/domain/index"

import { LoginDatasourceService } from "@/infraestructure/index"

@injectable()
export class LoginRepositoryImp implements LoginRepository {
    constructor(
        @inject("LoginDatasourceService") private loginDatasourceService: LoginDatasourceService
    ) {}

    async login(params: ILoginParams): Promise<ILoginResponse> {
        return this.loginDatasourceService.login(params);
    }
}