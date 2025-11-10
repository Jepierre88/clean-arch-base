"use client";

import type { SessionPayload } from "@/src/shared/types/auth/session.type";

let cachedSession: SessionPayload | null = null;
let lastFetch = 0;
let pendingFetch: Promise<SessionPayload | null> | null = null;
const CACHE_TTL = 30 * 1000; // 30 seconds

const SESSION_ENDPOINT = "/api/session";

function shouldReuseCache(): boolean {
  if (!cachedSession) {
    return false;
  }

  return Date.now() - lastFetch < CACHE_TTL;
}

function setCache(session: SessionPayload | null) {
  cachedSession = session;
  lastFetch = Date.now();
}

export function clearSessionCache() {
  cachedSession = null;
  lastFetch = 0;
  pendingFetch = null;
}

async function fetchSessionFromServer(): Promise<SessionPayload | null> {
  try {
    const response = await fetch(SESSION_ENDPOINT, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as SessionPayload | null;
    return data ?? null;
  } catch (error) {
    console.error("No se pudo obtener la sesión del servidor", error);
    return null;
  }
}

export async function getClientSession(forceRefresh = false): Promise<SessionPayload | null> {
  if (!forceRefresh && shouldReuseCache()) {
    return cachedSession;
  }

  if (!forceRefresh && pendingFetch) {
    return pendingFetch;
  }

  const fetchPromise = fetchSessionFromServer().then((session) => {
    setCache(session);
    pendingFetch = null;
    return session;
  });

  pendingFetch = fetchPromise;
  return fetchPromise;
}
