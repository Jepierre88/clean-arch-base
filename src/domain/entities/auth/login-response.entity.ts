import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import TUser from "@/src/shared/types/auth/user.type";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ILoginResponse extends IGeneralResponse<TUser> {}