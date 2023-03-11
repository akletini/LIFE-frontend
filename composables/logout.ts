import User from "~~/models/user/user";

export async function logout(currentUser?: User) {
  const { signOut } = useSession();
  const userService = await useUserStore().getService();
  if (currentUser === undefined) {
    const currentUserId = localStorage.getItem("currentUserId");
    if (currentUserId !== "undefined") {
      currentUser = await userService.getUserById(Number(currentUserId));
    }
  }
  currentUser = currentUser ? currentUser : new User();
  await userService.logout(currentUser);
  localStorage.clear();
  signOut();
}
