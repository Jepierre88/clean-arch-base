import TCompany from "./company.type";
import { TPermission } from "./permission.type";
import TToken from "./token.type";;

export default interface TUser {
    id: string;
    tokens: TToken;
    companies: TCompany[];
        permissions: TPermission;
    
}
