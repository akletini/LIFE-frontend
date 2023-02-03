export default defineEventHandler((event) => {
  const signIn = async () => {
    const { signIn } = useSession();
    const router = useRouter();

    const { error, url } = await signIn("google", { redirect: false });
    if (error) {
      // router.push("/login");
    }
  };
});
