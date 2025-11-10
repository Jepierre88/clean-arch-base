import TCompany from "./company.type";
import { TPermission } from "./permission.type";
import TUser from "./user.type";

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

export type SessionCompany = TCompany;

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
  companies: SessionCompany[];
  selectedCompany: SessionCompany | null;
  permissions: SessionPermission | null;
  tokens: SessionTokens;
  metadata: SessionMetadata;
};

export type CreateSessionInput = {
  user: SessionUser;
  companies?: SessionCompany[];
  selectedCompany?: SessionCompany | null;
  permissions?: SessionPermission | null;
  tokens: SessionTokens;
  metadata?: Partial<SessionMetadata>;
  maxAge?: number;
};
