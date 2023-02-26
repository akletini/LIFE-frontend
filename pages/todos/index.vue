<template>
  <div>
    <div class="flex-row">
      <h3 class="text-center text-4xl py-4 font-bold mb-4">Todo page</h3>
      <div class="mb-6">
        <form @submit.prevent="addTodo">
          <div class="grid grid-cols-5 gap-3 h-10">
            <input
              type="text"
              class="text-black text-lg col-span-3 rounded-lg drop-shadow-2xl"
              placeholder="&ensp; Add new..."
              v-model="title"
              required
            />
            <input
              type="date"
              class="datepicker text-black rounded-lg drop-shadow-2xl"
              v-model="dueAt"
            />
            <button
              type="submit"
              class="border bg-gray-50 text-black rounded-lg drop-shadow-2xl hover:bg-green-700 hover:text-white hover:border-white"
            >
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
          class="border rounded-md row-span-2 py-3 lg:row-start-1 lg:row-end-1 flex justify-center hover:bg-green-700"
        >
          <button>New Tag</button>
        </NuxtLink>
        <div
          class="flex gap-4 row-span-2 lg:row-start-1 lg:row-end-1 py-3 justify-left lg:justify-center"
        >
          <p>Tags:</p>
          <select
            class="filter-dropdown"
            v-model="tagSelection"
            @change="filterByTag()"
          >
            <option value="empty">&emsp;</option>
            <option
              class="text-white"
              :style="{ 'background-color': tag.color }"
              :value="tag.id"
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
          <select
            class="filter-dropdown"
            v-model="filterSelection"
            @change="filterByTag()"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="due">Is due</option>
          </select>
        </div>
        <div
          class="flex gap-4 row-span-2 py-3 justify-center lg:row-start-1 lg:row-end-1 lg:justify-center"
        >
          <p>Sort:</p>
          <select
            class="filter-dropdown"
            v-model="sortSelection"
            @change="sortTodos(sortSelection)"
          >
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
              class="flex items-center gap-2 border rounded-lg text-center py-1 px-2 bg-white"
              :class="determineHourglassColor(todo.dueAt)"
              ><i class="material-icons text-lg">hourglass_bottom</i>
              <p class="">{{ todo.dueAt }}</p></span
            >
          </li>
          <li
            class="sm:col-start-3 sm:col-end-3 row-start-4 row-end-4 sm:row-start-2 sm:row-end-2 lg:row-start-1 lg-row-end-1 lg:col-start-7 lg:col-end-7"
          >
            <div class="flex justify-center gap-4 px-2">
              <i
                class="material-icons text-green-500 cursor-pointer hover:shadow-md"
                @click="completeTodo(todo)"
                >done</i
              >
              <NuxtLink :to="'/todos/_' + todo.id"
                ><i
                  class="material-icons text-blue-500 cursor-pointer hover:shadow-md"
                  >edit</i
                ></NuxtLink
              >
              <i
                class="material-icons text-red-500 cursor-pointer hover:shadow-md"
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
import { useUserStore } from "../../stores/UserStore";
import TagService from "../../services/todo/TagService";
import UserService from "../../services/user/UserService";

const dateUtils: DateUtils = new DateUtils();
const todoService: TodoService = new TodoService();
const tagService: TagService = new TagService();
const userService: UserService = new UserService();
const userStore = useUserStore();

const currentUserId = localStorage.getItem("currentUserId");
const userById = await userService.getUserById(Number(currentUserId));
userStore.update(userById);
TodoService.ASSIGNED_USER = userById;

const todoStore = useTodoStore();
const tagStore = useTagStore();
const tagSelection = ref("empty");
const filterSelection = ref("active");
const sortSelection = ref("due");
const title = ref("");
const dueAt = ref(dateUtils.getDateForDatepicker());

const allTodos = await todoService.getAllTodos();
const allTags = await tagService.getAllTags();

todoStore.addAll(allTodos);
tagStore.addAll(allTags);

const todoList = ref(todoStore.getAll());
const tagList = ref(tagStore.getAll());
let tempList = ref(todoList.value);
sortTodos(sortSelection.value);

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
  useRouter().push("/todos");
}

async function completeTodo(todo: Todo) {
  if (todo !== undefined) {
    todo.state = Todo.State.DONE;
    await todoService.updateTodo(todo);
    todoStore.update(todo);
    filterByTag();
  }
}

async function deleteTodo(id: number | undefined) {
  if (id !== undefined) {
    let todo = todoStore.getById(id);
    if (todo !== undefined) {
      await todoService.deleteTodo(todo);
      todoStore.remove(todo);
    }
  }
}

/* Sort/filter functions */
function filterByTag() {
  const tag = tagSelection.value;
  if (tagSelection.value === "empty") {
    tempList.value = todoStore.getAll();
  } else {
    tempList.value = todoStore
      .getAll()
      .filter((todo) => todo.tag?.id === Number(tag));
  }
  applyFilter(filterSelection.value);
  todoList.value = tempList.value;
  sortTodos(sortSelection.value);
}

function applyFilter(filter: string) {
  if (filter === "active") {
    tempList.value = tempList.value.filter(
      (todo) => Todo.State.OPEN === todo.state
    );
  } else if (filter === "completed") {
    tempList.value = tempList.value.filter(
      (todo) => Todo.State.DONE === todo.state
    );
  } else if (filter === "due") {
    tempList.value = tempList.value.filter((todo) => {
      if (todo.dueAt !== undefined) {
        const datepicker = new Date(
          dateUtils.getDateForDatepicker(todo.dueAt)
        ).getTime();
        const current = new Date(Date.now()).getTime();
        return current >= datepicker;
      }
    });
  }
}

function sortTodos(sort: string) {
  if (sort === "due") {
    todoList.value = tempList.value.sort((a, b) =>
      new Date(dateUtils.getDateForDatepicker(a.dueAt)).getTime() >=
      new Date(dateUtils.getDateForDatepicker(b.dueAt)).getTime()
        ? 1
        : -1
    );
  } else if (sort === "added") {
    todoList.value = tempList.value.sort((a, b) =>
      new Date(dateUtils.getDateTimeForJS(a.createdAt)).getTime() >=
      new Date(dateUtils.getDateTimeForJS(b.createdAt)).getTime()
        ? 1
        : -1
    );
  }
}
</script>

<style scoped>
ul {
  padding: inherit;
}
</style>
