import type { SessionMeta } from "@/src/lib/session-manager";
import type {
  CreateSessionInput,
  SessionPayload,
  SessionTokens,
  SessionCompany,
  SessionPermission,
  SessionMetadata,
} from "@/src/shared/types/auth/session.type";

const EMPTY_COMPANIES: SessionCompany[] = [];

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

export function normalizeCompanies(companies?: unknown): SessionCompany[] {
  if (!Array.isArray(companies)) {
    return EMPTY_COMPANIES;
  }

  return companies as SessionCompany[];
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
  const companies = normalizeCompanies(payload.companies);
  const selectedCompany = payload.selectedCompany ?? companies[0] ?? null;
  const metadata: SessionMetadata = {
    ...(payload.metadata ?? {}),
    maxAge: meta.maxAge,
    issuedAt: meta.issuedAt,
    expiresAt: meta.expiresAt,
  };

  return {
    ...payload,
    tokens: normalizeTokens(payload.tokens),
    companies,
    selectedCompany,
    permissions: normalizePermissions(payload.permissions),
    metadata,
  };
}

export function buildSessionPayload(
  input: CreateSessionInput,
  meta: SessionMeta
): SessionPayload {
  const companies = normalizeCompanies(input.companies ?? input.user?.companies);

  return ensureSessionPayload(
    {
      user: input.user,
      companies,
      selectedCompany: input.selectedCompany ?? companies[0] ?? null,
      permissions: input.permissions ?? normalizePermissions(input.user?.permissions),
      tokens: normalizeTokens(input.tokens),
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
