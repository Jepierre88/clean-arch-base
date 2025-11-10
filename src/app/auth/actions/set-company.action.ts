"use server";

import { container } from "@/di/container";


import IActionResponse from "@/src/shared/interfaces/generic/action-response";
import { ISetCompanyParams, ISetCompanyResponse, SetCompanyUseCase } from "@/domain/index";
import IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";
import { AxiosError } from "axios";

export async function setCompanyAction(
  params: ISetCompanyParams
): Promise<IActionResponse<ISetCompanyResponse["data"]>> {
  try {
    const useCase = container.resolve(SetCompanyUseCase);
    const response = await useCase.execute(params);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as AxiosError<IErrorResponse>).response?.data.message ?? "Error inesperado",
    };
  }
}
