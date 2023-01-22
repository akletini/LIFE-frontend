<template>
  <div>
    <div class="flex min-h-screen">
      <div
        class="w-64 bg-gray-700 border-r border-gray-200"
        v-if="isSidebarOpen"
        @linkClicked="toggleSidebar"
      >
        <div class="py-4 text-center mb-8">
          <NuxtLink to="/" class="font-bold" style="color: #49bc4f"
            >LIFE App</NuxtLink
          >
        </div>

        <div class="mb-10">
          <h3
            class="mx6 mb-2 text-xs text-white uppercase tracking-widest text-center"
          >
            <NuxtLink to="/">Home</NuxtLink>
          </h3>
        </div>
        <div class="mb-10">
          <h3
            class="mb-2 text-xs text-white uppercase tracking-widest text-center"
          >
            <NuxtLink to="/todos">Todos</NuxtLink>
          </h3>
        </div>
        <h3
          class="mb-2 text-xs text-white uppercase tracking-widest text-center"
        >
          <div class="mb-10"><NuxtLink to="/docs">Docs</NuxtLink></div>
        </h3>
      </div>

      <!-- output page content -->
      <div class="flex-1 text-gray-200">
        <header class="shadow-sm bg-gray-700">
          <nav class="container mx-auto p-3 flex justify-between">
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
var isSidebarOpen = ref(true);

function toggleSidebar(event) {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
.router-link-exact-active {
  color: #49bc4f;
}
</style>
