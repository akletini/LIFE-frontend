<template>
  <main>
    <h1>Navigation:</h1>
    <nav>
      <MDNavLayout :navigation-tree="navigation" />
    </nav>
    <ContentDoc />
  </main>
</template>

<script setup>
const { data: navigation } = await useAsyncData("navigation", () => {
  return fetchContentNavigation();
});
</script>

<style scoped>
main {
  @apply pt-7 px-4;
}

main :deep(code) {
  @apply font-extrabold italic;
}

main :deep(h1) {
  @apply text-green-600 font-bold text-2xl mb-6;
}

main :deep(h2) {
  @apply text-green-600 font-bold text-xl mt-4;
}

main :deep(ul) {
  @apply mb-4;
  list-style-type: circle;
  padding: 2px;
}

ul.a {
  list-style-type: circle;
}

ul.b {
  list-style-type: square;
}
</style>
