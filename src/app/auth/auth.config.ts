import { Role } from "@prisma/client";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAdminRoutes = nextUrl.pathname.startsWith("/admin");
      const isAdmin = auth?.user?.role === "ADMIN";

      if (isAdminRoutes && !isAdmin) {
        return false;
      }

      return true;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.role = token.role as Role;
      }

      return session;
    },
    jwt({ token, user }) {
      if (!user) return token;

      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
  },
} as NextAuthConfig;
