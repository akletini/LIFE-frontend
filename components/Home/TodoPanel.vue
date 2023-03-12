<template>
  <div class="overflow-x-auto flex flex-col">
    <h3 class="text-2xl">Todos</h3>
    <table class="table table-normal w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Tag</th>
          <th>Due on</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="(todo, index) in todos" class="hover">
          <th>{{ index + 1 }}</th>
          <td>{{ todo.title }}</td>
          <td>{{ todo.tag }}</td>
          <td>
            {{ todo.dueAt }}
          </td>
        </tr>
      </tbody>
    </table>
    <NuxtLink to="/todos" class="ml-auto text-lg mr-4">Go to Todos</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~~/stores/todo/TodoStore";

const todoStore = useTodoStore();
const todoService = await todoStore.getService();
const page = (await todoService.getPage(0, ["open"])).data.page;
const todos = page.content;
</script>

<style scoped></style>
