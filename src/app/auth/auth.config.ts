import { Role } from "@prisma/client";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const userLoggedIn = !!auth?.user;
      const isHomeRoute = nextUrl.pathname === "/";
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");
      const authOrHomeRoutes = isHomeRoute || isAuthRoutes;
      const isNewUser = auth?.user?.isNewUser;
      const changePasswordRoute = nextUrl.pathname.startsWith(
        "/settings/change-your-password"
      );

      const isAdminRoutes = nextUrl.pathname.startsWith("/admin");
      const isAdmin = auth?.user?.role === "ADMIN";

      if (userLoggedIn && isHomeRoute) {
        return Response.redirect(new URL("/intranet", nextUrl));
      }

      if (!userLoggedIn && !authOrHomeRoutes) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (userLoggedIn && authOrHomeRoutes) {
        return Response.redirect(new URL("/intranet", nextUrl));
      }

      if (isNewUser && !changePasswordRoute) {
        return Response.redirect(
          new URL("/settings/change-your-password", nextUrl)
        );
      }

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
        session.user.isNewUser = token.isNewUser as boolean;
      }

      return session;
    },
    jwt({ token, user }) {
      if (!user) return token;

      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.isNewUser = user.isNewUser;
      }

      return token;
    },
  },
} as NextAuthConfig;
