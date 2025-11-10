import { injectable } from "tsyringe";

import { AxiosServerInstance } from "@/infraestructure/index";

import { ISetCompanyParams, ISetCompanyResponse } from "@/domain/index";
@injectable()
export class SetCompanyDatasourceService
  extends AxiosServerInstance
{
  async setCompany(params: ISetCompanyParams): Promise<ISetCompanyResponse> {
    return await this.api
      .post<ISetCompanyResponse>("/auth/set-company", params)
      .then((response) => {
        console.log("SetCompanyDatasourceService response:", response.data);
        return response.data;
      })

  }
}
