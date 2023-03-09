<template>
  <div>
    <div class="flex min-h-screen" @mouseup="onMouseUp">
      <Transition name="slide">
        <Sidebar
          v-if="isSidebarOpen"
          @linkClicked="toggleSidebar"
          :style="{
            width: resizeValue + '%',
          }"
        />
      </Transition>
      <div
        class="resizer flex"
        v-if="isSidebarOpen"
        @linkClicked="toggleSidebar"
        @mousedown="onMouseDown"
        :style="{
          left: resizeValue + '%',
        }"
      ></div>

      <!-- output page content -->
      <div
        class="flex-1 text-gray-200"
        :style="{
          width: 100 - resizeValue + '%',
        }"
      >
        <!-- Nav bar-->
        <header class="shadow-sm bg-gray-700 min-w-full">
          <nav class="p-3 flex justify-between px-6 z-50">
            <div class="flex items-center">
              <button type="button" value="Open sidebar" @click="toggleSidebar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
              <p class="w-4"></p>
              <div v-if="!isSidebarOpen">
                <NuxtLink
                  to="/"
                  class="font-bold text-green-600 text-xl shadow-xl"
                  >LIFE App</NuxtLink
                >
              </div>
            </div>
            <div>
              <div class="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    @click="toggleUserInfo()"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      :src="currentUser?.imageUrl"
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div
          class="justify-between z-50 my-1 lg:absolute lg:right-1 w-auto bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
          id="dropdown-user"
          v-if="userInfoVisible"
        >
          <div class="px-4 py-3">
            <p class="text-sm text-gray-900 dark:text-white">
              {{ currentUser.name }}
            </p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-300">
              {{ currentUser.email }}
            </p>
          </div>
          <ul class="py-1">
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Settings</a
              >
            </li>
            <li>
              <a
                class="block px-4 py-2 text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-gray-50"
                role="menuitem"
                @click="() => signOut()"
                >Sign out</a
              >
            </li>
          </ul>
        </div>
        <div class="px-6 py-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import User from "~~/models/user/user";
import UserService from "~~/services/user/UserService";
const deviceType = useDevice();
const { signOut } = useSession();
const userService: UserService = new UserService();
const currentUserId = localStorage.getItem("currentUserId");
let currentUser = new User();
if (currentUserId !== "undefined") {
  currentUser = await userService.getUserById(Number(currentUserId));
}

let isSidebarOpen = ref(true);
let resizeValue = ref(deviceType.isMobileOrTablet ? 25 : 15);

const userInfoVisible = ref(false);

function toggleUserInfo() {
  userInfoVisible.value = !userInfoVisible.value;
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function onMouseDown(e: any) {
  e.preventDefault();
  document.addEventListener("mousemove", onMouseMove);
}
function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
}
function onMouseMove(e: any) {
  const percentage = (e.pageX / window.innerWidth) * 100;

  if (percentage >= 15 && percentage <= 25) {
    resizeValue.value = Number(percentage.toFixed(2));
  }
}
</script>

<style scoped>
/* Sidebar Transition */
.slide-enter-active {
  transition: 0.2s ease-in;
}
.slide-leave-active {
  transition: opacity 0;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  width: 0;
}

.resizable-pane {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
}

.resizer {
  height: calc(100%);
  width: 3px;
  background: #eee;
  transform: translateX(-3px);
  position: absolute;
  cursor: ew-resize;
}

.resizer::before {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  min-height: 100%;
  background-color: #eee;
  transition: background-color 250ms, box-shadow 250ms;
}

.resizer:hover::before {
  background-color: rgb(61, 68, 74);
  box-shadow: 0 1px 4px 1px rgb(61, 68, 74);
}
</style>
