<template>
  <div class="flex flex-col items-center">
    <!-- Help text -->
    <span class="text-sm text-gray-700 dark:text-gray-400 py-2">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{
        currentPageContentSize
      }}</span>
      out of
      <span class="font-semibold text-gray-900 dark:text-white">
        {{ todoStore.getCurrentPage().totalElements }}</span
      >
      entries
    </span>
    <!-- Buttons -->
    <nav aria-label="Page navigation example">
      <ul class="flex justify-center items-center py-2">
        <li>
          <button
            @click="
              () => {
                getPage(currentPage.number - 1);
                if (currentPage.number > 0) {
                  currentSelectedPage--;
                }
              }
            "
            class="px-3 py-2 ml-0 leading-tight text-gray-50 bg-gray-600 border border-gray-300 rounded-l-lg hover:bg-gray-300 hover:text-gray-700"
            :class="disablePrev ? 'opacity-50 cursor-not-allowed' : ''"
          >
            <i class="material-icons text-sm">arrow_back_ios</i>
          </button>
        </li>
        <li v-for="page in todoStore.getCurrentPage().totalPages">
          <button
            @click="
              () => {
                getPage(page.valueOf() - 1);
                currentSelectedPage = page;
              }
            "
            class="px-3 py-2 leading-tight text-gray-50 bg-gray-600 border border-gray-300 hover:bg-gray-300 hover:text-gray-700"
            :class="currentSelectedPage == page ? 'bg-gray-500' : ''"
          >
            {{ page.valueOf() }}
          </button>
        </li>
        <li>
          <button
            @click="
              () => {
                getPage(currentPage.number + 1);
                if (currentPage.number < currentPage.totalPages - 1) {
                  currentSelectedPage++;
                }
              }
            "
            class="px-3 py-2 leading-tight text-gray-50 bg-gray-600 border border-gray-300 rounded-r-lg hover:bg-gray-300 hover:text-gray-700"
            :class="disableNext ? 'opacity-50 cursor-not-allowed' : ''"
          >
            <i class="material-icons text-xs">arrow_forward_ios</i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import Page from "~~/models/page";
import TodoService from "../../services/todo/TodoService";
import { useTodoStore } from "../../stores/todo/TodoStore";
import Todo from "~~/models/todo/todo";

const todoService = new TodoService();
const todoStore = useTodoStore();
const props = defineProps<{
  page: Page<Todo>;
}>();
let currentPage = ref(props.page);
let disablePrev = ref(currentPage.value.totalPages == 1);
let disableNext = ref(currentPage.value.totalPages == 1);
let currentSelectedPage = ref(1);
let currentPageContentSize = computed(
  () =>
    currentPage.value.size * currentPage.value.number +
    currentPage.value.numberOfElements
);

async function getPage(page: number) {
  debugger;
  const totalPages = currentPage.value.totalPages;
  if (page > 0 && page < totalPages - 1) {
    disablePrev.value = false;
    disableNext.value = false;
  } else if (page >= totalPages - 1) {
    disableNext.value = true;
    disablePrev.value = false;
  } else if (page <= 0) {
    disableNext.value = false;
    disablePrev.value = true;
  } else {
    disableNext.value = true;
    disablePrev.value = true;
  }

  if (page < currentPage.value.totalPages && page >= 0) {
    currentPage.value = todoStore.getCurrentPage();
    const newPage = await todoService.getPage(
      page,
      todoStore.getCurrentFilters(),
      todoStore.getCurrentFilterTags(),
      todoStore.getCurrentSort()
    );
    currentPage.value = newPage.data.page;
    todoStore.setCurrentPage(currentPage.value);
    todoStore.setTodos(newPage.data.page.content);
  }
}
</script>

<style scoped></style>
