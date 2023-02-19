<script setup>
defineProps({
  navigationTree: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ul class="navigation">
    <li v-for="(item, index) in navigationTree" :key="index">
      <NuxtLink :to="item._path">
        {{ item.title }}
      </NuxtLink>
      <MDNavLayout
        v-if="item.children"
        :navigation-tree="item.children"
        class="sub-navigation"
      />
    </li>
  </ul>
</template>

<style scoped>
.navigation li {
  margin-left: 0.8rem;
}

.navigation ul.a {
  list-style-type: circle;
}
</style>
