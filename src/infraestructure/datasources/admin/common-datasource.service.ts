import { injectable } from "tsyringe";
import { AxiosServerInstance } from "@/infraestructure/index";
import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import { EServices } from "@/src/shared/enums/common/services.enum";

@injectable()
export class CommonDatasourceService extends AxiosServerInstance {
  async get<T = unknown>(service: EServices): Promise<IGeneralResponse<T>> {
    return this.api.get(`/common/${service}`).then((res) => res.data);
  }
}
