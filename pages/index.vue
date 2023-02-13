import UserService from '../services/UserService';
<template>
  <div>
    <h2>Index</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet
      viverra quam, non vulputate massa pellentesque ut. Ut id massa tempor,
      suscipit nunc ac, rutrum metus. Etiam rhoncus ligula eget hendrerit
      interdum. Nunc id facilisis libero. Donec volutpat sapien eu tempus
      laoreet. Etiam ex velit, rhoncus ac dignissim sit amet, ultrices mattis
      lacus. Mauris purus purus, fermentum eget viverra eget, tempus sit amet
      velit. Fusce in aliquet ipsum. Vestibulum ante ipsum primis in faucibus
      orci luctus et ultrices posuere cubilia curae; Maecenas non efficitur
      lorem, sed efficitur orci. Phasellus nec odio magna. Cras eget tellus nec
      ipsum elementum luctus. Nunc aliquet nulla ut nisi auctor mattis.
      Pellentesque feugiat tellus ac faucibus lobortis. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Etiam laoreet viverra quam, non
      vulputate massa pellentesque ut. Ut id massa tempor, suscipit nunc ac,
      rutrum metus. Etiam rhoncus ligula eget hendrerit interdum. Nunc id
      facilisis libero. Donec volutpat sapien eu tempus laoreet. Etiam ex velit,
      rhoncus ac dignissim sit amet, ultrices mattis lacus. Mauris purus purus,
      fermentum eget viverra eget, tempus sit amet velit. Fusce in aliquet
      ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia curae; Maecenas non efficitur lorem, sed efficitur orci.
      Phasellus nec odio magna. Cras eget tellus nec ipsum elementum luctus.
      Nunc aliquet nulla ut nisi auctor mattis. Pellentesque feugiat tellus ac
      faucibus lobortis.
    </p>
  </div>
</template>

<script setup lang="ts">
import User from "~~/models/user";
import TokenContainer from "~~/models/tokenContainer";
import UserService from "~~/services/UserService";
import DateUtils from "../utils/DateUtils";

const userService: UserService = new UserService();
const dateUtils: DateUtils = new DateUtils();
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data } = await useFetch("/api/auth/token", { headers });
const token = data.value;
let userByEmail;
debugger;
if (!token) {
  // user is already logged in
  const currentUserId = localStorage.getItem("currentUserId");
  const currentUser = await userService.getUserById(Number(currentUserId));
  useUserStore().update(currentUser);
} else {
  const sessionUser: any = token.user;
  userByEmail = await userService.getUserByEmail(sessionUser.email);
  if (userByEmail === undefined) {
    // New user
    const tokenContainer: TokenContainer = new TokenContainer(
      String(token.accessToken),
      dateUtils.getCurrentDateTime(new Date(Date.now())),
      String(token.refreshToken) || null
    );

    const user: User = new User();
    user.email = sessionUser?.email || "";
    user.name = sessionUser?.name || "";
    user.tokenContainer = tokenContainer;
    // Change logic here
    user.password = "";
    user.authProvider =
      sessionUser?.image && sessionUser.image.includes("google")
        ? User.AuthProvider.GOOGLE
        : User.AuthProvider.CREDENTIALS;

    const addedUser = await userService.addUser(user);
    localStorage.setItem("currentUserId", String(addedUser.id));
  } else {
    // if the user logs in but already exists and the local storage is empty
    localStorage.setItem("currentUserId", String(userByEmail.id));
  }
}
</script>

<style scoped></style>
