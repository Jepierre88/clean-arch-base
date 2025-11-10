// src/lib/axios-client.ts
"use client";

import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";
import { ENVIRONMENT } from "../shared/constants/environment";

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

    try {
      const session = await getSession();
      const token = session?.user?.tokens?.access_token;

      // Axios v1 headers is a plain object; ensure we don’t override if already present
      const headersObj = (config.headers ?? {}) as Record<string, unknown>;
      const hasAuthHeader =
        typeof (headersObj["Authorization"]) === "string" && (headersObj["Authorization"] as string).length > 0;
      if (token && !hasAuthHeader) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Error obteniendo la sesión:", error);
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
