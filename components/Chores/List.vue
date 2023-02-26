<template>
  <ul class="todo-entry py-4" v-for="chore in choreRef" :key="chore.id">
    <li
      class="flex items-center text-lg justify-center sm:justify-start px-8 sm:col-span-4"
    >
      <NuxtLink to="/">{{ chore.title }}</NuxtLink>
    </li>
    <li
      class="row-start-2 row-end-2 col-start-1 col-end-1 text-center flex items-center justify-center lg:row-span-1 lg:row-start-1 lg-row-end-1 lg:col-start-5 lg:col-end-5"
    >
      <NuxtLink to="/"><span class="rounded-lg py-2 px-3"> </span></NuxtLink>
    </li>
    <li
      class="flex items-center justify-center row-start-3 row-end-3 sm:row-start-2 sm:row-end-2 sm:col-start-2 sm:col-end-2 lg:row-span-1 lg:row-start-1 lg-row-end-1 lg:col-start-6 lg:col-end-6"
    >
      <span
        class="flex items-center gap-2 border rounded-lg text-center py-1 px-2 bg-white"
        :class="determineHourglassColor(chore.dueAt)"
        ><i class="material-icons text-lg">hourglass_bottom</i>
        <p class="">{{ chore.dueAt }}</p></span
      >
    </li>
    <li
      class="sm:col-start-3 sm:col-end-3 row-start-4 row-end-4 sm:row-start-2 sm:row-end-2 lg:row-start-1 lg-row-end-1 lg:col-start-7 lg:col-end-7"
    >
      <div class="flex justify-center gap-4 px-2">
        <i
          class="material-icons text-green-500 cursor-pointer hover:shadow-md"
          @click="completeChore(chore)"
          >done</i
        >
        <NuxtLink :to="'/chores/_' + chore.id"
          ><i
            class="material-icons text-blue-500 cursor-pointer hover:shadow-md"
            >edit</i
          ></NuxtLink
        >
        <i
          class="material-icons text-red-500 cursor-pointer hover:shadow-md"
          @click="deleteChore(chore.id)"
          >delete</i
        >
      </div>
      <div class="flex justify-center items-center cursor-help">
        <i class="material-icons text-lg mr-2">info</i>
        <p class="underline text-xs">{{ chore.createdAt }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Chore from "~~/models/chore/chore";
import Page from "~~/models/page";
const choreStore = useChoreStore();
const props = defineProps<{
  page: Page<Chore>;
}>();
const chores = props.page.content;
const choreService = await choreStore.getService();
choreStore.setChores(chores);
const choreRef = ref(choreStore.getAllChores());

async function completeChore(chore: Chore) {
  if (chore !== undefined) {
    chore = await choreService.completeChore(chore);
    choreStore.update(chore);
  }
}

async function deleteChore(id: number | undefined) {
  if (id !== undefined) {
    debugger;
    let chore = choreStore.getById(id);
    if (chore !== undefined) {
      await choreService.deleteChore(chore);
      choreStore.remove(chore);
    }
  }
}
</script>

<style scoped></style>
