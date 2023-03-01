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
          <div class="flex-col">
            <button
              @click="toggleTagDropdown()"
              class="bg-gray-50 text-gray-700 border rounded-md py-4 px-4"
            >
              Tags
              <i class="ml-2 material-icons text-sm">expand_more</i>
            </button>
            <div
              v-if="showTagDropdown"
              id="myDropdown"
              class="dropdown-content grid-rows-6"
            >
              <div
                class="flex items-center hover:bg-gray-200"
                v-for="(tag, index) in allTags"
                :key="tag.id"
              >
                <input
                  :id="tag.name"
                  type="checkbox"
                  value=""
                  class="ml-4 w-4 h-4 rounded"
                  v-model="selectedTagIndices[index]"
                  @click="
                    (event) => setCurrentTags(tag.id, (<HTMLInputElement>event.target).checked)
                  "
                />
                <label :for="tag.name" class="ml-4 my-4 mx-4 text-black">{{
                  tag.name
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex gap-4 row-span-2 py-3 justify-left lg:row-start-1 lg:row-end-1 lg:justify-center"
        >
          <div class="flex-col">
            <button
              @click="toggleFilterDropdown()"
              class="bg-gray-50 text-gray-700 border rounded-md py-4 px-4"
            >
              Filter
              <i class="ml-2 material-icons text-sm">expand_more</i>
            </button>
            <div
              v-if="showFilterDropdown"
              id="myDropdown"
              class="dropdown-content grid-rows-6"
            >
              <div
                class="flex items-center hover:bg-gray-200"
                v-for="(filter, index) in possibleFilters"
              >
                <input
                  :id="filter"
                  type="checkbox"
                  class="ml-4 w-4 h-4 rounded"
                  v-model="selectedFilterIndices[index]"
                  @click="(event) => setFilters(filter, (<HTMLInputElement>event.target).checked)"
                />
                <label :for="filter" class="ml-4 my-4 mx-4 text-black">{{
                  filter.charAt(0).toUpperCase() + filter.slice(1)
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex gap-4 row-span-2 py-3 justify-center lg:row-start-1 lg:row-end-1 lg:justify-center"
        >
          <div class="flex-col">
            <button
              @click="toggleSortDropdown()"
              class="bg-gray-50 text-gray-700 border rounded-md py-4 px-4"
            >
              Sort by: <span class="font-bold">{{ sort }}</span>
              <i class="ml-2 material-icons text-sm">expand_more</i>
            </button>
            <div
              v-if="showSortDropdown"
              id="myDropdown"
              class="absolute bg-gray-50 grid-rows-6"
            >
              <button
                class="flex text-black py-4 px-4 hover:bg-gray-200"
                @click="sortBy('dueAt')"
              >
                <i
                  class="material-icons text-blue-500 mr-2"
                  v-if="sort == 'dueAt'"
                  >check</i
                >
                Due date
              </button>
              <button
                class="flex text-black py-4 px-4 hover:bg-gray-200"
                @click="sortBy('createdAt')"
              >
                <i
                  class="material-icons text-blue-500 mr-2"
                  v-if="sort == 'createdAt'"
                  >check</i
                >
                Created at
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Todo list -->
      <div class="border border-gray-400 rounded-md px-3 py-3">
        <div class="scrollbar overflow-y-auto h-[600px]">
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
      <TodoPagination :page="pageRef"></TodoPagination>
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
import { ApiResponse } from "~~/models/apiResponse";

const dateUtils: DateUtils = new DateUtils();
const tagService: TagService = new TagService();
const todoStore = useTodoStore();
const tagStore = useTagStore();
const todoService = await todoStore.getService();

const userService: UserService = new UserService();
const userStore = useUserStore();

const currentUserId = localStorage.getItem("currentUserId");
const userById = await userService.getUserById(Number(currentUserId));
userStore.update(userById);
TodoService.ASSIGNED_USER = userById;

const showFilterDropdown = ref(false);
const showTagDropdown = ref(false);
const showSortDropdown = ref(false);
const sort = ref("dueAt");
const possibleFilters = ["open", "due", "done"];

const selectedTags = ref<Set<number>>(new Set());
const selectedTagIndices = ref([]);
const selectedFilterIndices = ref([true, false, false]);
const filters = ref<Set<string>>(new Set());
filters.value.add("open");
todoStore.setCurrentFilters(Array.from(filters.value));

const title = ref("");
const dueAt = ref(dateUtils.getDateForDatepicker());

const response: ApiResponse<Todo> = await todoService.getPage(0, ["open"]);
const page = response.data.page;
const pageRef = ref(page);
todoStore.setCurrentPage(page);
todoStore.setTodos(page.content);
const allTags = await tagService.getAllTags();

tagStore.addAll(allTags);

const todoList = ref(todoStore.getAll());

async function toggleTagDropdown() {
  if (showTagDropdown.value) {
    reloadPage();
  }
  showTagDropdown.value = !showTagDropdown.value;
}

async function toggleSortDropdown() {
  if (showSortDropdown.value) {
    reloadPage();
  }
  showSortDropdown.value = !showSortDropdown.value;
}

async function toggleFilterDropdown() {
  console.log(filters);
  if (showFilterDropdown.value) {
    reloadPage();
  }
  showFilterDropdown.value = !showFilterDropdown.value;
}

function setCurrentTags(tagName?: number, selected?: boolean) {
  selected
    ? selectedTags.value.add(Number(tagName))
    : selectedTags.value.delete(Number(tagName));
}

function setFilters(filter: string, selected?: boolean) {
  selected ? filters.value.add(filter) : filters.value.delete(filter);
}

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
  await reloadPage();
}

async function completeTodo(todo: Todo) {
  if (todo !== undefined) {
    todo.state = Todo.State.DONE;
    await todoService.updateTodo(todo);
    todoStore.update(todo);
    await reloadPage();
  }
}

async function deleteTodo(id: number | undefined) {
  if (id !== undefined) {
    let todo = todoStore.getById(id);
    if (todo !== undefined) {
      await todoService.deleteTodo(todo);
      todoStore.remove(todo);
      await reloadPage();
    }
  }
}

async function sortBy(by: string) {
  sort.value = by;
  const currentPage = await todoService.getPage(
    page.number,
    Array.from(filters.value),
    Array.from(selectedTags.value),
    sort.value
  );
  todoStore.setCurrentSort(sort.value);
  todoStore.setCurrentPage(currentPage.data.page);
  todoStore.setTodos(currentPage.data.page.content);
}

async function reloadPage() {
  const currentPage = await todoService.getPage(
    todoStore.getCurrentPage().number,
    Array.from(filters.value),
    Array.from(selectedTags.value),
    sort.value
  );
  todoStore.setCurrentFilterTags(Array.from(selectedTags.value));
  todoStore.setCurrentPage(currentPage.data.page);
  todoStore.setTodos(currentPage.data.page.content);
  todoStore.setCurrentFilters(Array.from(filters.value));
}
</script>

<style scoped>
ul {
  padding: inherit;
}

.dropdown-content {
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
