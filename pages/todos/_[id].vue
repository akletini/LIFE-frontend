<template>
  <div class="px-10">
    <div class="flex items-center justify-between mb-4">
      <NuxtLink to="/todos"
        ><i class="material-icons text-lg sm:text-4xl">arrow_back</i></NuxtLink
      >
      <h3 class="text-center text-lg sm:text-4xl py-4 font-bold">Edit Todo</h3>
      <div></div>
    </div>

    <form @submit.prevent="formSubmit">
      <div class="flex flex-col">
        <div class="flex flex-col mb-8">
          <label for="due">Due date</label>
          <input
            type="date"
            id="due"
            class="form-input text-black text-xl"
            v-model="dueAt"
          />
        </div>

        <div class="flex flex-col mb-8">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            class="form-input text-black text-xl"
            v-model="title"
          />
        </div>

        <div class="flex flex-col mb-8">
          <label for="description">Description</label>
          <textarea
            type="text"
            id="description"
            class="form-textarea text-black text-xl"
            v-model="description"
          ></textarea>
        </div>

        <div class="flex flex-col mb-8">
          <label for="tag">Tag</label>
          <select type="text" id="tag" class="filter-dropdown" v-model="tag">
            <option value="alpha">Alpha</option>
          </select>
        </div>

        <div class="flex flex-col mb-8">
          <label for="file_input" class="dark:text-white">File upload</label>
          <input
            class="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
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
import Todo from "~~/models/todo/todo";
import DateUtils from "../../utils/DateUtils";

const dateUtils: DateUtils = new DateUtils();

// const { id } = useRoute().params;
const title = ref("");
const dueAt = ref("");
const description = ref("");
const tag = ref("");
// const file = ref("")

function formSubmit() {
  const todo: Todo = new Todo(
    title.value,
    dateUtils.getCurrentDate(),
    dateUtils.getGermanDate(dueAt.value),
    Todo.State.OPEN,
    description.value,
    new Tag("Hans", "Peter")
  );
  console.log(JSON.stringify(todo));
}
</script>

<style scoped></style>
