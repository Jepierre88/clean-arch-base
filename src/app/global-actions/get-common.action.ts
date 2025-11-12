'use server'

import { container } from "@/di/container";

import IActionResponse from "@/src/shared/interfaces/generic/action-response";
import IGeneralResponse from "@/src/shared/interfaces/generic/general-response.interface";
import { CommonUsecase } from "@/domain/index";
import { EServices } from "@/src/shared/enums/common/services.enum";
import { AxiosError } from "axios";
import IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";

export async function getCommonAction<T = unknown>(
  service: EServices
): Promise<IActionResponse<IGeneralResponse<T>>> {
  try {
    const usecase = container.resolve(CommonUsecase);
    const response = await usecase.get<T>(service);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: (error as AxiosError<IErrorResponse>).response?.data.message || "Error inesperado"};
  }
}
