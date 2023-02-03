<template>
  <div class="px-10">
    <div class="flex items-center justify-between mb-4">
      <NuxtLink to="/todos"
        ><i class="material-icons text-lg sm:text-4xl">arrow_back</i></NuxtLink
      >
      <h3 class="text-center text-lg sm:text-4xl py-4 font-bold">Edit Tag</h3>
      <div></div>
    </div>

    <form action="#" @submit.prevent="">
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

        <div class="flex flex-col mb-8">
          <button
            type="submit"
            @click="updateTag"
            class="border py-3 px-5 rounded-lg"
          >
            Save
          </button>
        </div>
        <div class="flex flex-col">
          <button
            type="submit"
            @click="deleteTag"
            class="border py-3 px-5 rounded-lg border-red-600 hover:bg-red-800"
          >
            Delete
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
import TagService from "~~/services/todo/TagService";

const tagStore = useTagStore();
const todoStore = useTodoStore();
const tagService: TagService = new TagService();
const router = useRouter();
const { id } = useRoute().params;
const currentTag = tagStore.getById(Number(id));
const name = ref(currentTag?.name);
const color = ref(currentTag?.color);

async function updateTag() {
  let tag: Tag = new Tag(name.value, color.value, Number(id));
  tag = await tagService.updateTag(tag);
  tagStore.update(tag);
  todoStore.updateTagReferences(tag);
  router.push("/todos");
}

async function deleteTag() {
  await tagService.deleteTag(Number(id));
  const tag = tagStore.getById(Number(id));
  if (tag !== undefined) {
    tagStore.remove(tag);
  }
  router.push("/todos");
}
</script>

<style scoped></style>
