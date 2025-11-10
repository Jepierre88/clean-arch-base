// src/lib/axios-client.ts
"use client";

import axios, { AxiosInstance } from "axios";
import { ENVIRONMENT } from "../shared/constants/environment";
import { getClientSession } from "./session-client";

// Declaración global para singleton en HMR
declare global {
  // For HMR-safe singleton in the browser
  var _axiosClient: AxiosInstance | undefined;
}

function createAxiosClient() {
  const instance = axios.create({
    baseURL: ENVIRONMENT.API_URL,
    headers: { "Content-Type": "application/json" },
  });

  // Interceptor: Auth
  instance.interceptors.request.use(async (config) => {
    if (typeof window === "undefined") return config;

    const session = await getClientSession();
    const token = session?.tokens?.accessToken;

    if (token) {
      if (config.headers && typeof (config.headers as { set?: unknown }).set === "function") {
        (config.headers as { set: (key: string, value: string) => void }).set(
          "Authorization",
          `Bearer ${token}`
        );
      } else {
        const headers = (config.headers = config.headers ?? {});
        (headers as Record<string, unknown>)["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  });

  // Interceptor: Agregar query params de la URL actual si es GET
  instance.interceptors.request.use((config) => {
    if (typeof window === "undefined") return config;
    if (config.method?.toLowerCase() !== "get") return config;

    const currentUrl = new URL(window.location.href);
    const currentParams = Object.fromEntries(currentUrl.searchParams.entries());

    // 🔑 Combinar params de la ruta actual con los que ya envíe el dev
    config.params = {
      ...currentParams, // primero los de la ruta actual
      ...config.params, // luego los que pases manualmente → estos tienen prioridad
    };

    return config;
  });

  return instance;
}

const w = globalThis as unknown as { _axiosClient?: AxiosInstance };
const api: AxiosInstance = w._axiosClient ?? createAxiosClient();

// Singleton para HMR
if (process.env.NODE_ENV !== "production") {
  w._axiosClient = api;
}

export default api;
