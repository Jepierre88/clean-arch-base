import { LoginRepository } from "@/src/domain/repositories/auth/login.repository";
import { AxiosServerInstance } from "../axios-server.intance";
import { ILoginParams } from "@/src/domain/entities/auth/login-params.entity";
import { ILoginResponse } from "@/src/domain/entities/auth/login-response.entity";
import { injectable } from "tsyringe";

@injectable()
export class LoginDatasourceService
  extends AxiosServerInstance
  implements LoginRepository
{
  async login(params: ILoginParams): Promise<ILoginResponse> {
    return this.api.post<ILoginResponse>("/auth/login", params)
      .then((response) => response.data)
    ;
  }
}
