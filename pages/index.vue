<template>
  <div>
    <h3 class="text-center text-4xl py-4 font-bold mb-4">LIFE</h3>
    <div class="grid lg:grid-cols-2 gap-3">
      <HomeTodoPanel></HomeTodoPanel>
      <HomeChorePanel></HomeChorePanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import User from "~~/models/user/user";
import TokenContainer from "~~/models/user/tokenContainer";
import UserService from "~~/services/user/UserService";
import DateUtils from "../utils/DateUtils";

const userService: UserService = new UserService();
const dateUtils: DateUtils = new DateUtils();
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data } = await useFetch("/api/auth/token", { headers });
const token = data.value;
let userByEmail, tokenContainer;
if (!token) {
  // user is already logged in
  const currentUserId = localStorage.getItem("currentUserId");
  const currentUser = await userService.getUserById(Number(currentUserId));
  useUserStore().update(currentUser);
} else {
  const sessionUser: any = token.user;
  const currentJwt = localStorage.getItem("accessToken");
  if (currentJwt !== "undefined" && currentJwt !== null) {
    userByEmail = await userService.getUserByEmail(sessionUser.email);
  }
  tokenContainer = new TokenContainer(
    String(token.accessToken),
    dateUtils.getCurrentDateTime(new Date(Date.now())),
    String(token.refreshToken) || null
  );
  if (userByEmail === undefined) {
    // New user
    const user = new User();
    user.email = sessionUser?.email || "";
    user.name = sessionUser?.name || "";
    user.imageUrl = sessionUser?.image || null;
    user.tokenContainer = tokenContainer;
    user.password = "";
    user.authProvider =
      sessionUser?.image && sessionUser.image.includes("google")
        ? User.AuthProvider.GOOGLE
        : User.AuthProvider.CREDENTIALS;

    const addedUser = await userService.register(user);
    debugger;
    localStorage.setItem("currentUserId", String(addedUser.id));
    localStorage.setItem("accessToken", addedUser.jwtToken);
  } else {
    // if the user logs in but already exists and the local storage is empty
    if (tokenContainer?.refreshToken !== null) {
      userByEmail.tokenContainer = tokenContainer;
      await userService.updateUser(userByEmail);
    }
    localStorage.setItem("currentUserId", String(userByEmail.id));
  }
}
</script>

<style scoped></style>
