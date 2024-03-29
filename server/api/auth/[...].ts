import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
const config = useRuntimeConfig();
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any, provider: any) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      provider: provider,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
export default NuxtAuthHandler({
  secret: config.nextSecret,
  pages: {
    signIn: "/login?email=&password=",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      let provider = "";
      if (account && user) {
        provider = account.provider;
        const expiresAt = account.expires_at || 1;
        return {
          accessToken: account.access_token,
          provider: account.provider,
          accessTokenExpires: Date.now() + expiresAt * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      const accessTokenExpires = Number(token.accessTokenExpires);
      if (Date.now() < accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token, provider);
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/tasks",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
