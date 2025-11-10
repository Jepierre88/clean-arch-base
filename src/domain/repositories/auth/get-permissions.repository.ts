import {IGetPermissionsResponse, IGetPermissionsParams} from "@/domain/index"

export abstract class GetPermissionsRepository {
  abstract getPermissions(
    params: IGetPermissionsParams
  ): Promise<IGetPermissionsResponse>;
}
