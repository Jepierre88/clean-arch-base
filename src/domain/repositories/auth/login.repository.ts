import { ILoginParams, ILoginResponse } from "@/domain/index";
export abstract class LoginRepository {
    abstract login(params: ILoginParams): Promise<ILoginResponse>;
}