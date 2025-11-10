import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import TUser from "@/src/shared/types/auth/user.type";


export interface ILoginResponse extends IGeneralResponse<TUser> {}