
import {container} from "@/di/container";
import { ELoginCodes } from "@/src/shared/enums/auth/login-codes.enum";
import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ENVIRONMENT } from "../shared/constants/environment";
import TUser from "../shared/types/auth/user.type";
import TCompany from "../shared/types/auth/company.type";
import { TPermission } from "../shared/types/auth/permission.type";
import { LoginUseCase } from "@/domain/index";
import "next-auth";
import "next-auth/jwt";



declare module "next-auth" {
  interface Session {
    user: TUser & DefaultSession["user"];
    expires: string;
    error: string;
    companies: TCompany[];
    selectedCompany: TCompany | null;
    sessionToken: string;
    refreshToken?: string;
    permissions: TPermission;
  }
  type User = TUser
}
declare module "next-auth/jwt" {
  interface JWT {
    user: TUser & DefaultSession["user"];
    expires: string;
    error: string;
    companies: TCompany[];
    selectedCompany: TCompany | null;
    sessionToken: string;
    refreshToken?: string;
    permissions: TPermission;
  }
}

class CredentialsError extends CredentialsSignin {
  code = ELoginCodes.CredentialsError;
}

class ServerError extends CredentialsSignin {
  code = ELoginCodes.ServerError;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { 
          label: "Password",
          type: "password" 
        },
      },
      authorize: async (credentials) => {

        const loginUseCase = container.resolve(LoginUseCase)

        const loginResponse = await loginUseCase.execute({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        return loginResponse.success ? loginResponse.data : null;

      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    signOut: "/auth/login",
  },
  session: { strategy: "jwt" },
  secret: ENVIRONMENT.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Primer login
      if (account && user) {
        token.companies = user.companies;
        token.accessToken = user.tokens.access_token;
        token.refreshToken = user.tokens.refresh_token;
        token.selectedCompany = user.companies?.[0] || null;
        token.permissions = user.permissions;
        token.user = {
          companies: user.companies,
          email: user.email,
          permissions: user.permissions,
          id: user.id as string,
          name: user.name,
          tokens: user.tokens,
        };
      }

      if (trigger === "update" && session) {
        if (session.accessToken) token.accessToken = session.accessToken;
        if (session.refreshToken) token.refreshToken = session.refreshToken;
        if (session.selectedCompany)
          token.selectedCompany = session.selectedCompany;
        if (session.companies) token.companies = session.companies;
        if (session.permissions) token.permissions = session.permissions;
      }

      return token;
    },

    async session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      session.selectedCompany = token.selectedCompany || null;
      session.companies = token.companies || [];
      session.permissions = token.permissions;

      // Reconstruimos el user desde el JWT (ya que NextAuth lo deja "incompleto")
      session.user = {
        id: token.sub || "", // <- el "sub" es el ID del usuario
        email: session.user?.email || "",
        name: session.user?.name || "",
        emailVerified: null, // <- si lo usas, actualízalo correctamente
        companies: token.companies || [],
        permissions: token.permissions,
        tokens: {
          access_token: token.accessToken as string,
          refresh_token: token.refreshToken as string,
        },
      };

      return session;
    },
    authorized({ auth }) {
      return !!auth?.sessionToken;
    },
  },

  trustHost: ENVIRONMENT.AUTH_TRUST_HOST || false,
});
