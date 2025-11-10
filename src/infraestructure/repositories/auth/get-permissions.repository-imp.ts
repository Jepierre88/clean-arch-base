import { inject, injectable } from "tsyringe";


import { GetPermissionsRepository, IGetPermissionsParams, IGetPermissionsResponse } from "@/domain/index";

import {GetPermissionsDatasourceService} from "@/infraestructure/index"

@injectable()
export class GetPermissionsRepositoryImp implements GetPermissionsRepository {
  constructor(
    @inject("GetPermissionsDatasourceService")
    private readonly datasource: GetPermissionsDatasourceService
  ) {}

  getPermissions(
    params: IGetPermissionsParams
  ): Promise<IGetPermissionsResponse> {
    return this.datasource.getPermissions(params);
  }
}
