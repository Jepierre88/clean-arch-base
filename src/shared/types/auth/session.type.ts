import { TPermission } from "./permission.type";
import TUser from "./user.type";
import { TApplication } from "./application.type";

export type SessionTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type SessionUser = Partial<TUser> & {
  id: string;
  email?: string | null;
  name?: string | null;
  [key: string]: unknown;
};
export type SessionPermission = Partial<TPermission> & {
  code?: string;
  [key: string]: unknown;
};

export type SessionMetadata = {
  maxAge: number;
  issuedAt: number;
  expiresAt: number;
  [key: string]: unknown;
};

export type SessionPayload = {
  user: SessionUser;
  permissions: SessionPermission | null;
  tokens: SessionTokens;
  role?: { id: string; name: string } | null;
  applications?: TApplication[];
  metadata: SessionMetadata;
};

export type CreateSessionInput = {
  user: SessionUser;
  permissions?: SessionPermission | null;
  tokens: SessionTokens;
  role?: { id: string; name: string } | null;
  applications?: TApplication[];
  metadata?: Partial<SessionMetadata>;
  maxAge?: number;
};
