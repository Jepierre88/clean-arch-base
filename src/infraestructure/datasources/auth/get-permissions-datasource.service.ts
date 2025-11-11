import { injectable } from "tsyringe";

import { AxiosServerInstance } from "@/infraestructure/index";

import { IGetPermissionsParams, IGetPermissionsResponse } from "@/domain/index";


@injectable()
export class GetPermissionsDatasourceService
  extends AxiosServerInstance
{
  async getPermissions(
    params: IGetPermissionsParams
  ): Promise<IGetPermissionsResponse> {
    return await this.api
      .get<IGetPermissionsResponse>("/auth/permissions", {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      })
      .then((response) => response.data)
  }
}
