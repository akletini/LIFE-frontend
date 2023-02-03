import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
const config = useRuntimeConfig();
export default NuxtAuthHandler({
  pages: {
    signIn: "/login?email=&password=",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
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
        },
      },
    }),
  ],
});
