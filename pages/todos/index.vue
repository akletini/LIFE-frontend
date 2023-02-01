import Todo from '../../models/todo/todo';
<template>
  <div>
    <div class="flex-row">
      <h3 class="text-center text-4xl py-4 font-bold mb-4">Todo page</h3>
      <div class="mb-6">
        <form @submit.prevent="addTodo">
          <div class="grid grid-cols-5 gap-3 h-10">
            <input
              type="text"
              class="text-black text-lg col-span-3 rounded-lg"
              placeholder="&ensp; Add new..."
              v-model="title"
              required
            />
            <input
              type="date"
              class="datepicker text-black rounded-lg"
              v-model="dueAt"
            />
            <button type="submit" class="bg-gray-50 text-black rounded-lg">
              Add
            </button>
          </div>
        </form>
      </div>
      <!-- Horizonal divider -->
      <div class="flex-grow border-t border-gray-400 mb-4"></div>

      <!-- Dropdown row -->
      <div
        class="grid grid-cols-1 grid-rows-8 md:mb-6 lg:grid-cols-4 lg:grid-rows-1 xl:grid-cols-6 2xl:grid-cols-8"
      >
        <div class="xl:col-span-2 xl:row-start-1 xl:row-end-1 2xl:col-span-4">
          <!-- empty div for spacing -->
        </div>
        <NuxtLink
          to="/todos/tags/newTag"
          class="border row-span-2 py-3 lg:row-start-1 lg:row-end-1 flex justify-center"
        >
          <button>New Tag</button>
        </NuxtLink>
        <div
          class="flex gap-4 row-span-2 lg:row-start-1 lg:row-end-1 py-3 justify-left lg:justify-center"
        >
          <p>Tags:</p>
          <select class="filter-dropdown" v-model="tagSelection">
            <option value="empty">&emsp;</option>
            <option
              class="text-white"
              :style="{ 'background-color': tag.color }"
              :value="tag.name"
              v-for="tag in tagList"
              :key="tag.id"
            >
              {{ tag.name }}
            </option>
          </select>
        </div>
        <div
          class="flex gap-4 row-span-2 py-3 justify-left lg:row-start-1 lg:row-end-1 lg:justify-center"
        >
          <p>Filter:</p>
          <select class="filter-dropdown" v-model="filterSelection">
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="due">Is due</option>
          </select>
        </div>
        <div
          class="flex gap-4 row-span-2 py-3 justify-center lg:row-start-1 lg:row-end-1 lg:justify-center"
        >
          <p>Sort:</p>
          <select class="filter-dropdown" v-model="sortSelection">
            <option value="added">Added date</option>
            <option value="due">Is due</option>
          </select>
        </div>
      </div>

      <!-- Todo list -->
      <div class="py-4">
        <ul class="todo-entry" v-for="todo in todoList" :key="todo.id">
          <li
            class="flex items-center text-lg justify-center sm:justify-start px-8 sm:col-span-4"
          >
            <NuxtLink :to="'/todos/_' + todo.id">{{ todo.title }}</NuxtLink>
          </li>
          <li
            class="row-start-2 row-end-2 col-start-1 col-end-1 text-center flex items-center justify-center lg:row-span-1 lg:row-start-1 lg-row-end-1 lg:col-start-5 lg:col-end-5"
            v-if="todo.tag"
          >
            <NuxtLink :to="'/todos/tags/_' + todo.tag.id"
              ><span
                class="rounded-lg py-2 px-3"
                :style="{ 'background-color': todo.tag.color }"
              >
                {{ todo.tag.name }}</span
              ></NuxtLink
            >
          </li>
          <li
            class="flex items-center justify-center row-start-3 row-end-3 sm:row-start-2 sm:row-end-2 sm:col-start-2 sm:col-end-2 lg:row-span-1 lg:row-start-1 lg-row-end-1 lg:col-start-6 lg:col-end-6"
          >
            <span
              class="flex items-center gap-2 border rounded-lg text-center py-1 px-2 bg-white text-red-500 border-red-500"
              ><i class="material-icons text-lg">hourglass_bottom</i>
              <p class="">{{ todo.dueAt }}</p></span
            >
          </li>
          <li
            class="sm:col-start-3 sm:col-end-3 row-start-4 row-end-4 sm:row-start-2 sm:row-end-2 lg:row-start-1 lg-row-end-1 lg:col-start-7 lg:col-end-7"
          >
            <div class="flex justify-center gap-4 px-2">
              <i
                class="material-icons text-green-500 cursor-pointer"
                @click="completeTodo(todo)"
                >done</i
              >
              <NuxtLink :to="'/todos/_' + todo.id"
                ><i class="material-icons text-blue-500 cursor-pointer"
                  >edit</i
                ></NuxtLink
              >
              <i
                class="material-icons text-red-500 cursor-pointer"
                @click="deleteTodo(todo.id)"
                >delete</i
              >
            </div>
            <div class="flex justify-center items-center cursor-help">
              <i class="material-icons text-lg mr-2">info</i>
              <p class="underline text-xs">
                {{ todo.createdAt }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Todo from "~~/models/todo/todo";
import TodoService from "~~/services/todo/TodoService";
import DateUtils from "../../utils/DateUtils";
import { useTodoStore } from "../../stores/todo/TodoStore";
import { useTagStore } from "../../stores/todo/TagStore";
import TagService from "../../services/todo/TagService";

const dateUtils: DateUtils = new DateUtils();
const todoService: TodoService = new TodoService();
const tagService: TagService = new TagService();

const todoStore = useTodoStore();
const tagStore = useTagStore();
const tagSelection = ref("");
const filterSelection = ref("active");
const sortSelection = ref("due");
const title = ref("");
const dueAt = ref(dateUtils.getDateForDatepicker());

/* Dummy objects */
// const testTodo: Todo = new Todo(
//   "Ein Todo",
//   dateUtils.getCurrentDateTime(),
//   dateUtils.getGermanDate(dueAt.value),
//   Todo.State.OPEN
// );
// const testTag: Tag = new Tag("Uni", "#1e40a0", 2);
// testTodo.id = 3;
// testTodo.tag = testTag;

const allTodos = await todoService.getAllTodos();
const allTags = await tagService.getAllTags();

todoStore.addAll(allTodos);
tagStore.addAll(allTags);

const todoList = ref(todoStore.getAll());
const tagList = ref(tagStore.getAll());

/* Function block */

async function addTodo() {
  let todo: Todo = new Todo(
    title.value,
    dateUtils.getCurrentDateTime(),
    dateUtils.getGermanDate(dueAt.value),
    Todo.State.OPEN
  );
  todo = await todoService.addTodo(todo);
  todoStore.add(todo);
  title.value = "";
}

async function completeTodo(todo: Todo) {
  if (todo !== undefined) {
    todo.state = Todo.State.DONE;
    await todoService.updateTodo(todo);
    todoStore.update(todo);
  }
}

async function deleteTodo(id: number | undefined) {
  if (id !== undefined) {
    let todo = todoStore.getById(id);
    if (todo !== undefined) {
      await todoService.deleteTodo(Number(todo.id));
      todoStore.remove(todo);
    }
  }
}
</script>

<style scoped>
ul {
  padding: inherit;
}
</style>
