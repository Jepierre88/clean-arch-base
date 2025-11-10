"use server";

import { AxiosError } from "axios";

import { container } from "@/di/container";
import {
  GetPermissionsUseCase,
  ISetCompanyParams,
  ISetCompanyResponse,
  SetCompanyUseCase,
} from "@/domain/index";
import type IActionResponse from "@/src/shared/interfaces/generic/action-response";
import type IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";
import type TCompany from "@/src/shared/types/auth/company.type";
import type { TPermission } from "@/src/shared/types/auth/permission.type";
import type { SessionTokens } from "@/src/shared/types/auth/session.type";
import { updateSession } from "@/src/lib/session";

type SetCompanyActionResult = {
  company: TCompany;
  tokens: SessionTokens;
  permissions: TPermission;
};

function mapTokens(data: ISetCompanyResponse["data"]): SessionTokens {
  const source = (data ?? {}) as Record<string, unknown>;

  return {
    accessToken:
      (source.accessToken as string | undefined) ??
      (source["access_token"] as string | undefined) ??
      "",
    refreshToken:
      (source.refreshToken as string | undefined) ??
      (source["refresh_token"] as string | undefined) ??
      undefined,
  };
}

export async function setCompanyAction(
  params: ISetCompanyParams
): Promise<IActionResponse<SetCompanyActionResult>> {
  try {
    const setCompanyUseCase = container.resolve(SetCompanyUseCase);
    const response = await setCompanyUseCase.execute(params);

    if (!response.success || !response.data) {
      return {
        success: false,
        error: response.message || "No se pudo establecer la compañía",
      };
    }

    const tokens = mapTokens(response.data);
    const company = (response.data as Record<string, unknown>).company as TCompany;

    if (!company) {
      return {
        success: false,
        error: "La compañía seleccionada no es válida",
      };
    }

    const permissionsUseCase = container.resolve(GetPermissionsUseCase);
    const permissionsResponse = await permissionsUseCase.execute({
      token: tokens.accessToken,
    });

    if (!permissionsResponse.success || !permissionsResponse.data) {
      return {
        success: false,
        error:
          permissionsResponse.message ||
          "No se pudieron obtener los permisos de la compañía",
      };
    }

    const updatedSession = await updateSession((current) => ({
      ...current,
      tokens,
      selectedCompany: company,
      permissions: permissionsResponse.data,
    }));

    if (!updatedSession) {
      return {
        success: false,
        error: "No existe una sesión activa para actualizar",
      };
    }

    return {
      success: true,
      data: {
        company,
        tokens,
        permissions: permissionsResponse.data,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Error inesperado";

    return {
      success: false,
      error: message,
    };
  }
}
