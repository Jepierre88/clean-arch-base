// lib/api/server.ts
import axios, { AxiosError } from "axios";
import { ENVIRONMENT } from "../shared/constants/environment";
import { auth, signOut } from "./auth";
import { redirect } from "next/navigation";

let apiServer: ReturnType<typeof axios.create> | null = null;

export function getServerApi(queryParams?: Record<string, unknown>) {
  if (apiServer) return apiServer;

  apiServer = axios.create({
    baseURL: ENVIRONMENT.API_URL,
    headers: { "Content-Type": "application/json" },
  });

  // Interceptor: auth (token de sesión en server)
  apiServer.interceptors.request.use(async (config) => {
    const session = await auth();
    const token = session?.sessionToken;

    if (token) {
      const headers = (config.headers = config.headers ?? {});
      const hasAuthHeader =
        (typeof (headers as { has?: (key: string) => boolean }).has === "function" &&
          (headers as { has: (key: string) => boolean }).has("Authorization")) ||
        (typeof (headers as { get?: (key: string) => string | undefined }).get === "function" &&
          Boolean((headers as { get: (key: string) => string | undefined }).get("Authorization"))) ||
        (headers && "Authorization" in (headers as Record<string, unknown>));

      if (!hasAuthHeader) {
        if (typeof (headers as { set?: (key: string, value: string) => void }).set === "function") {
          (headers as { set: (key: string, value: string) => void }).set(
            "Authorization",
            `Bearer ${token}`
          );
        } else {
          (config.headers as Record<string, unknown>)["Authorization"] = `Bearer ${token}`;
        }
      }
    }

    // Si la petición es GET y me pasaron queryParams desde el handler
    if (config.method?.toLowerCase() === "get" && queryParams) {
      config.params = {
        ...queryParams, // params del request actual
        ...config.params, // los que pases manualmente en el .get()
      };
    }

    return config;
  });

    apiServer.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const status = error.response?.status;
            const requestUrl = error.config?.url ?? "";

            // 🧠 Si la URL contiene /auth/login, no ejecutar el interceptor de error
            if (requestUrl.includes("/auth/login")) {
                return Promise.reject(error);
            }

            // 🔐 Si hay un 401, cerrar sesión automáticamente
            if (status === 401) {
                try {
                    await signOut();
                } catch (signOutError) {
                    console.error("Error al cerrar sesión tras 401", signOutError);
                }
            }

            return Promise.reject(error);
        }
    );


  return apiServer;
}
