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
        {{ choreStore.getCurrentPage().totalElements }}</span
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
        <li v-for="page in choreStore.getCurrentPage().totalPages">
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
import Chore from "~~/models/chore/chore";
import Page from "~~/models/page";
import { ChoreService } from "~~/services/chore/ChoreService";

const choreService = new ChoreService();
const choreStore = useChoreStore();
const props = defineProps<{
  page: Page<Chore>;
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
    const newPage = await choreService.getChorePage(
      page,
      choreStore.getCurrentFilters(),
      choreStore.getCurrentSort()
    );
    currentPage.value = newPage.data.page;
    choreStore.setCurrentPage(currentPage.value);
    choreStore.setChores(newPage.data.page.content);
  }
}
</script>

<style scoped></style>
