"use server";

import { AxiosError } from "axios";

import { container } from "@/di/container";
import { LoginUseCase } from "@/domain/index";
import type { ILoginParams } from "@/domain/entities/auth/login-params.entity";
import type TCompany from "@/src/shared/types/auth/company.type";
import type { TPermission } from "@/src/shared/types/auth/permission.type";
import type IActionResponse from "@/src/shared/interfaces/generic/action-response";
import type TUser from "@/src/shared/types/auth/user.type";
import type { SessionTokens, SessionUser } from "@/src/shared/types/auth/session.type";
import type IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";
import { createSession } from "@/src/lib/session";

export type LoginActionResult = {
  user: SessionUser;
  companies: TCompany[];
  permissions: TPermission | null;
};

function mapTokens(tokens: TUser["tokens"] | undefined): SessionTokens {
  const source = (tokens ?? {}) as Record<string, unknown>;

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

export async function loginAction(
  params: ILoginParams
): Promise<IActionResponse<LoginActionResult>> {
  try {
    const useCase = container.resolve(LoginUseCase);
    const response = await useCase.execute(params);
    
    if (!response.success || !response.data) {
      return {
        success: false,
        error: response.message || "No se pudo iniciar sesión",
      };
    }

    const user = response.data;
    const { tokens: rawTokens, ...restUser } = user;
    const tokens = mapTokens(rawTokens);
    const companies = Array.isArray(user.companies) ? user.companies : [];
    const permissions = (user as { permissions?: TPermission }).permissions ?? null;

    const sessionUser: SessionUser = {
      ...restUser,
    };

    await createSession({
      user: sessionUser,
      companies,
      selectedCompany: null,
      permissions: null,
      tokens,
    });

    return {
      success: true,
      data: {
        user: sessionUser,
        companies,
        permissions,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    console.error("Error en loginAction:", axiosError);
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      "No se pudo iniciar sesión";

    return {
      success: false,
      error: message,
    };
  }
}
