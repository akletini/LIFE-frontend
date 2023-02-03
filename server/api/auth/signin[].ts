const mySignInHandler = async () => {
  const { status, signIn } = useSession();
  console.log("Start");

  const { error, url } = await signIn("google");
  console.log("signed in? " + status.value);
  return navigateTo("/", { external: true });
};

export default mySignInHandler;
