import NextAuth, { DefaultSession } from "next-auth";
import Spotify from "next-auth/providers/spotify";

declare module "next-auth" {
  interface Session extends DefaultSession {
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
    user?: DefaultSession["user"];
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
      const isLoggedIn = !!auth?.user; // !! is used here to convert the potentially truthy/falsy value of auth?.user to a strict boolean representation
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect authenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },

    async jwt({ token, account, user }) {
      if (account) {
        console.log("New authentication, creating new token");
        return {
          ...token,
          access_token: account.access_token,
          expires_at: Math.floor(
            Date.now() / 1000 + (account.expires_in || 3600)
          ),
          refresh_token: account.refresh_token,
          user,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        console.log("token still valid, returning existing token");
        return token;
      } else {
        console.log("token expired, trying to refresh");
        if (!token.refresh_token) throw new Error("Missing refresh token");

        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                client_id: process.env.AUTH_SPOTIFY_ID!,
                client_secret: process.env.AUTH_SPOTIFY_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refresh_token,
              }),
              method: "POST",
            }
          );

          const tokens = await response.json();
          if (!response.ok) throw tokens;

          console.log("token refreshed successfully, returning updated token");

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(
              Date.now() / 1000 + (tokens.expires_in || 3600)
            ),
            refresh_token: tokens.refresh_token || token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
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
