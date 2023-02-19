<template>
  <main>
    <ContentDoc />
  </main>
</template>

<script></script>

<style scoped>
main {
  @apply pt-7 px-4;
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
  padding: 30px;
}

ul.a {
  list-style-type: circle;
}

ul.b {
  list-style-type: square;
}
</style>
