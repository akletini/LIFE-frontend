<template>
  <div class="flex flex-col items-center">
    <!-- Help text -->
    <span class="text-sm text-gray-700 dark:text-gray-400 py-2">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{
        currentPage.size * currentPage.number + currentPage.numberOfElements
      }}</span>
      out of
      <span class="font-semibold text-gray-900 dark:text-white">
        {{ currentPage.totalElements }}</span
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
        <li v-for="page in currentPage.totalPages">
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
import { ChoreService } from "~~/services/chore/ChoreService";

const choreService = new ChoreService();
const choreStore = useChoreStore();
let currentPage = ref(choreStore.getCurrentPage());
let disablePrev = ref(true);
let disableNext = ref(false);
let currentSelectedPage = ref(1);

async function getPage(page: number) {
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
    currentPage.value = choreStore.getCurrentPage();
    const newPage = await choreService.getChorePage(page);
    currentPage.value = newPage.data.page;
    choreStore.setCurrentPage(newPage.data.page);
    choreStore.setChores(newPage.data.page.content);
  }
}
</script>

<style scoped></style>
