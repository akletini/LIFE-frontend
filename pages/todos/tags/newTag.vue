<template>
  <div class="px-10">
    <div class="flex items-center justify-between mb-4">
      <NuxtLink to="/todos"
        ><i class="material-icons text-lg sm:text-4xl">arrow_back</i></NuxtLink
      >
      <h3 class="text-center text-lg sm:text-4xl py-4 font-bold">New Tag</h3>
      <div></div>
    </div>

    <form @submit.prevent="formSubmit">
      <div class="flex flex-col">
        <div class="flex flex-col mb-8">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            class="form-input text-black text-xl"
            v-model="name"
          />
        </div>
        <div class="flex flex-col mb-8">
          <label for="color">Color</label>
          <input
            type="color"
            class="form-input rounded w-auto"
            v-model="color"
          />
        </div>

        <div class="flex flex-col">
          <button type="submit" class="border py-3 px-5 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Tag from "~~/models/todo/tag";

// const { id } = useRoute().params;
const name = ref("");
const color = ref("#000000");

function formSubmit() {
  const tag: Tag = new Tag(name.value, color.value);
  console.log(tag);
}
</script>

<style scoped></style>
