<template>
  <div>
    <div class="flex-row">
      <h3 class="text-center text-4xl py-4 font-bold mb-4">Todo page</h3>
      <div class="mb-6">
        <div class="grid grid-cols-5 gap-3 h-10">
          <input
            type="text"
            class="text-black text-lg col-span-3 rounded-lg"
            placeholder="Add new..."
          />
          <input type="date" class="datepicker text-black rounded-lg" />
          <button type="submit" class="bg-gray-50 text-black rounded-lg">
            Add
          </button>
        </div>
      </div>
      <!-- Horizonal divider -->
      <div class="flex-grow border-t border-gray-400 mb-4"></div>

      <!-- Dropdown row -->
      <div
        class="grid grid-cols-1 grid-rows-8 md:mb-6 lg:grid-cols-4 lg:grid-rows-1 xl:grid-cols-6 2xl:grid-cols-8"
      >
        <div
          class="xl:col-span-2 xl:row-start-1 xl:row-end-1 2xl:col-span-4"
        ></div>
        <button class="border row-span-2 py-3 lg:row-start-1 lg:row-end-1">
          New tag
        </button>
        <div
          class="flex gap-4 row-span-2 lg:row-start-1 lg:row-end-1 row py-3 justify-center"
        >
          <p>Tags:</p>
          <select class="text-black text-center" v-model="tagSelection">
            <option value="alpha">Alpha</option>
            <option value="beta">Beta</option>
            <option value="gamma">Gamma</option>
          </select>
        </div>
        <div
          class="flex gap-4 row-span-2 py-3 justify-center lg:row-start-1 lg:row-end-1"
        >
          <p>Filter:</p>
          <select class="text-black text-center" v-model="filterSelection">
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="due">Is due</option>
          </select>
        </div>
        <div
          class="flex gap-4 row-span-2 py-3 justify-center lg:row-start-1 lg:row-end-1"
        >
          <p>Sort:</p>
          <select class="text-black text-center" v-model="sortSelection">
            <option value="added">Added date</option>
            <option value="due">Is due</option>
          </select>
        </div>
      </div>

      <!-- Todo list -->
      <div class="py-4">
        <ul class="todo-entry">
          <li class="flex items-center text-lg px-8 col-span-4">
            Irgendwas zu tun
          </li>
          <li class="text-center flex items-center justify-center">
            <span class="rounded-lg py-2 px-3 bg-blue-800">Tag</span>
          </li>
          <li class="flex items-center justify-center">
            <span
              class="flex items-center gap-2 border rounded-lg text-center py-1 px-2 bg-white text-red-500 border-red-500"
              ><i class="material-icons text-lg">hourglass_bottom</i>
              <p class="">11.11.2023</p></span
            >
          </li>
          <li class="">
            <div class="flex justify-center gap-4 px-2">
              <i class="material-icons text-green-500">done</i>
              <i class="material-icons text-blue-500">edit</i>
              <i class="material-icons text-red-500">delete</i>
            </div>
            <div class="flex justify-center items-center">
              <i class="material-icons text-lg mr-2">info</i>
              <p class="underline text-xs">19.09.2021 13:59:37</p>
            </div>
          </li>
        </ul>
        <ul class="todo-entry">
          <li class="px-8 col-span-4">Irgendwas zu tun</li>
          <li>Tag</li>
          <li>Due date</li>
          <li>
            <div>alles mögliche</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tagSelection = ref("alpha");
const filterSelection = ref("active");
const sortSelection = ref("due");
</script>

<style scoped>
ul {
  padding: inherit;
}
</style>
