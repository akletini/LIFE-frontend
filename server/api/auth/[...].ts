import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
const config = useRuntimeConfig();
export default NuxtAuthHandler({
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
    error: "/login",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    }),
  ],
});
