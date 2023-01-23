<template>
  <div>
    <div class="flex min-h-screen">
      <Transition name="slide">
        <Sidebar v-if="isSidebarOpen" @linkClicked="toggleSidebar" />
      </Transition>
      <div
        class="divider"
        v-if="isSidebarOpen"
        @linkClicked="toggleSidebar"
      ></div>

      <!-- output page content -->
      <div class="flex-1 text-gray-200">
        <header class="shadow-sm bg-gray-700">
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
let isSidebarOpen = ref(true);

function toggleSidebar(event) {
  isSidebarOpen.value = !isSidebarOpen.value;
}

</script>

<style scoped>
/* Sidebar Transition */
.slide-enter-active {
  transition: 0.1s ease-in;
}
.slide-leave-active {
  transition: 0.08s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  width: 0;
}

.divider {
  width: 0.1rem;
  background: #fff;
  resize: horizontal;
  cursor: ew-resize;
}
</style>
