import { inject, injectable } from "tsyringe";

import { GetPermissionsRepository, IGetPermissionsParams, IGetPermissionsResponse } from "@/domain/index";


@injectable()
export class GetPermissionsUseCase {
  constructor(
    @inject("GetPermissionsRepository")
    private readonly repository: GetPermissionsRepository
  ) {}

  execute(params: IGetPermissionsParams): Promise<IGetPermissionsResponse> {
    return this.repository.getPermissions(params);
  }
}
