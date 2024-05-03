import NextAuth, { DefaultSession } from "next-auth";
import Spotify from "next-auth/providers/spotify";

declare module "next-auth" {
  interface Session extends DefaultSession {
    access_token?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=user-read-private user-read-email user-top-read user-read-recently-played user-library-read`,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect authenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },

    jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.access_token = token.access_token as string;
      }

      return session;
    },
  },
});
