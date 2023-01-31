<template>
  <div class="px-10">
    <div class="flex items-center justify-between mb-4">
      <NuxtLink to="/todos"
        ><i class="material-icons text-lg sm:text-4xl">arrow_back</i></NuxtLink
      >
      <h3 class="text-center text-lg sm:text-4xl py-4 font-bold">Edit Tag</h3>
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
            required
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
import { useTagStore } from "../../../stores/todo/TagStore";
import { useTodoStore } from "../../../stores/todo/TodoStore";

const tagStore = useTagStore();
const todoStore = useTodoStore();
const router = useRouter();
const { id } = useRoute().params;
const currentTag = tagStore.getById(Number(id));
const name = ref(currentTag?.name);
const color = ref(currentTag?.color);

function formSubmit() {
  const tag: Tag = new Tag(name.value, color.value, Number(id));
  tagStore.update(tag);
  todoStore.updateTagReferences(tag);
  console.log(tag);
  router.push("/todos");
}
</script>

<style scoped></style>
