import type { SessionMeta } from "@/src/lib/session-manager";
import type {
  CreateSessionInput,
  SessionPayload,
  SessionTokens,
  SessionPermission,
  SessionMetadata,
} from "@/src/shared/types/auth/session.type";
import type { TApplication } from "@/src/shared/types/auth/application.type";

export function normalizeTokens(
  tokens: SessionTokens | Record<string, unknown> | undefined
): SessionTokens {
  const candidate = (tokens ?? {}) as Record<string, unknown>;

  const accessToken =
    (candidate["accessToken"] as string | undefined) ??
    (candidate["access_token"] as string | undefined) ??
    "";

  const refreshToken =
    (candidate["refreshToken"] as string | undefined) ??
    (candidate["refresh_token"] as string | undefined) ??
    undefined;

  return {
    accessToken,
    refreshToken,
  };
}

export function normalizeApplications(apps?: unknown): TApplication[] {
  if (!Array.isArray(apps)) return [];
  return apps as TApplication[];
}

export function normalizePermissions(
  permissions: unknown
): SessionPermission | null {
  return (permissions as SessionPermission) ?? null;
}

export function ensureSessionPayload(
  payload: SessionPayload,
  meta: SessionMeta
): SessionPayload {
  const metadata: SessionMetadata = {
    ...(payload.metadata ?? {}),
    maxAge: meta.maxAge,
    issuedAt: meta.issuedAt,
    expiresAt: meta.expiresAt,
  };

  return {
    ...payload,
    tokens: normalizeTokens(payload.tokens),
    permissions: normalizePermissions(payload.permissions),
    applications: normalizeApplications(payload.applications),
    metadata,
  };
}

export function buildSessionPayload(
  input: CreateSessionInput,
  meta: SessionMeta
): SessionPayload {
  const applications = normalizeApplications(input.applications ?? input.user?.applications);

  return ensureSessionPayload(
    {
      user: input.user,
      permissions: input.permissions ?? normalizePermissions(input.user?.permissions),
      tokens: normalizeTokens(input.tokens),
      role: input.role ?? (input.user?.role as { id: string; name: string } | null) ?? null,
      applications,
      metadata: {
        ...(input.metadata ?? {}),
        maxAge: meta.maxAge,
        issuedAt: meta.issuedAt,
        expiresAt: meta.expiresAt,
      },
    },
    meta
  );
}
