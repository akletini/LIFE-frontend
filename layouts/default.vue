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
        <header class="shadow-sm bg-gray-700 min-w-full">
          <nav class="p-3 flex justify-between px-6">
            <div>
              <div v-if="!isSidebarOpen">
                <NuxtLink to="/" class="font-bold text-green-600 text-xl"
                  >LIFE App</NuxtLink
                >
              </div>

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
            </div>
            <a href="/">User profile</a>
          </nav>
        </header>
        <div class="px-6 py-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const deviceType = useDevice();

let isSidebarOpen = ref(true);
let resizeValue = ref(deviceType.isMobileOrTablet ? 25 : 20);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function onMouseDown(e) {
  e.preventDefault();
  document.addEventListener("mousemove", onMouseMove);
}
function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
}
function onMouseMove(e) {
  const percentage = (e.pageX / window.innerWidth) * 100;

  if (percentage >= 15 && percentage <= 25) {
    resizeValue.value = percentage.toFixed(2);
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
  width: 6px;
  background: #fff;
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
  background-color: rgb(31, 31, 107);
  box-shadow: 0 1px 4px 1px rgb(31, 31, 107);
}
</style>
