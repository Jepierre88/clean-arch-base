import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import { EServices } from "@/src/shared/enums/common/services.enum";

export abstract class CommonRepository {
  abstract get<T = unknown>(service: EServices): Promise<IGeneralResponse<T>>;
}
