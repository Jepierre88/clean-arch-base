"use server";

import { container } from "@/di/container";

import IActionResponse from "@/src/shared/interfaces/generic/action-response";
import { TPermission } from "@/src/shared/types/auth/permission.type";

import {GetPermissionsUseCase, IGetPermissionsParams} from "@/domain/index";
import { AxiosError } from "axios";
import IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";

export async function getPermissionsAction(
  params: IGetPermissionsParams
): Promise<IActionResponse<TPermission>> {
  try {
    const useCase = container.resolve(GetPermissionsUseCase);
    const response = await useCase.execute(params);

    if (!response.success || !response.data) {
      return {
        success: false,
        error: response.message || "No se pudieron obtener los permisos",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const errorMessage = (error as AxiosError<IErrorResponse>).response?.data.message || "No se pudieron obtener los permisos";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
