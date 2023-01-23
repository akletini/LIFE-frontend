<template>
  <div class="w-64 bg-gray-700 border-r border-gray-200 resize-x">
    <div class="py-4 text-center mb-8">
      <NuxtLink to="/" class="font-bold text-green-600 text-xl"
        >LIFE App</NuxtLink
      >
    </div>
    <div class="mb-10">
      <NuxtLink to="/"><h3 class="sidebar-entry-root">Home</h3></NuxtLink>
    </div>
    <div class="mb-10">
      <NuxtLink to="/todos"><h3 class="sidebar-entry-root">Todos</h3></NuxtLink>
    </div>
    <div class="mb-10">
      <NuxtLink to="/docs"><h3 class="sidebar-entry-root">Docs</h3></NuxtLink>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.router-link-exact-active {
  color: #16a34a; /* green-600 */
}
</style>
