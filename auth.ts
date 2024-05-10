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

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.AUTH_SPOTIFY_ID}:${process.env.AUTH_SPOTIFY_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    });
    const refreshedToken = await response.json();
    if (!response.ok) throw refreshedToken;

    console.log("Token refreshed successfully");

    return {
      ...token,
      access_token: refreshedToken.access_token,
      expires_at: Date.now() + refreshedToken.expires_in * 1000,
      refresh_token: refreshedToken.refresh_token || token.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    throw new Error("RefreshAccessTokenError");
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
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user,
        };
      }

      if (token.expires_at && Date.now() < token.expires_at) {
        console.log("Token still valid, returning existing token");
        return token;
      }

      console.log("Token expired, trying to refresh");

      if (!token.refresh_token) {
        throw new Error("Missing refresh token");
      }

      try {
        const refreshedToken = await refreshAccessToken(token);
        console.log("Token refreshed successfully, returning updated token");
        return refreshedToken;
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" as const };
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
