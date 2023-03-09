import ChoreService from '../../services/chore/ChoreService';
<template>
  <!-- Dropdown row -->
  <div
    class="grid grid-cols-1 grid-rows-8 md:mb-6 lg:grid-cols-4 lg:grid-rows-1 xl:grid-cols-6 2xl:grid-cols-8 items-center"
  >
    <div class="xl:col-span-2 xl:row-start-1 xl:row-end-1 2xl:col-span-5">
      <!-- empty div for spacing -->
    </div>
    <NuxtLink
      to="/chores/newChore"
      class="border rounded-md row-span-2 lg:row-start-1 lg:row-end-1 flex justify-center hover:bg-green-700 py-2"
    >
      <button>New Chore</button>
    </NuxtLink>

    <div
      class="flex gap-4 row-span-2 py-3 lg:row-start-1 lg:row-end-1 lg:justify-center"
    >
      <div class="max-lg:flex flex-col flex-grow lg:flex-grow-0">
        <button
          @click="toggleFilterDropdown()"
          class="bg-gray-50 text-gray-700 border rounded-md py-2 px-4"
        >
          Filter
          <i class="ml-2 material-icons text-sm">expand_more</i>
        </button>
        <div
          v-if="showFilterDropdown"
          id="myDropdown"
          class="dropdown-content grid-rows-6 lg:absolute"
        >
          <div class="flex items-center hover:bg-gray-200">
            <input
              id="active"
              type="checkbox"
              value=""
              class="ml-4 w-4 h-4 rounded"
              v-model="filterByActive"
            />
            <label for="active" class="ml-4 my-4 mx-4 text-black">Active</label>
          </div>
          <div class="flex items-center hover:bg-gray-200">
            <input
              id="due"
              type="checkbox"
              value=""
              class="ml-4 w-4 h-4 rounded"
              v-model="filterByDue"
            />
            <label for="due" class="ml-4 my-4 mx-4 text-black">Due</label>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex gap-4 row-span-2 py-3 lg:row-start-1 lg:row-end-1 lg:justify-center"
    >
      <div class="max-lg:flex flex-col flex-grow lg:flex-grow-0">
        <button
          @click="toggleSortDropdown()"
          class="bg-gray-50 text-gray-700 border rounded-md py-2 px-4"
        >
          Sort by: <span class="font-bold">{{ sort }}</span>
          <i class="ml-2 material-icons text-sm">expand_more</i>
        </button>
        <div
          v-if="showSortDropdown"
          id="myDropdown"
          class="bg-gray-50 grid-rows-6 lg:absolute"
        >
          <button
            class="flex text-black py-4 px-4 hover:bg-gray-200"
            @click="sortBy('dueAt')"
          >
            <i class="material-icons text-blue-500 mr-2" v-if="sort == 'dueAt'"
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
</template>

<script setup lang="ts">
const choreStore = useChoreStore();
const choreService = await choreStore.getService();
const showFilterDropdown = ref(false);
const showSortDropdown = ref(false);

const filterByActive = ref(true);
const filterByDue = ref(false);
const filters = ref<Set<string>>(new Set());
filters.value.add("active");
choreStore.setCurrentFilters(Array.from(filters.value));
const sort = ref("dueAt");

function toggleSortDropdown() {
  showSortDropdown.value = !showSortDropdown.value;
}

async function sortBy(by: string) {
  sort.value = by;
  const currentPage = await choreService.getPage(
    choreStore.getCurrentPage().number,
    Array.from(filters.value),
    sort.value
  );
  choreStore.setCurrentSort(sort.value);
  choreStore.setCurrentPage(currentPage.data.page);
  choreStore.setChores(currentPage.data.page.content);
}

async function toggleFilterDropdown() {
  if (showFilterDropdown.value) {
    filterByDue.value ? filters.value.add("due") : filters.value.delete("due");
    filterByActive.value
      ? filters.value.add("active")
      : filters.value.delete("active");

    const currentPage = await choreService.getPage(
      choreStore.getCurrentPage().number,
      Array.from(filters.value)
    );
    choreStore.setCurrentFilters(Array.from(filters.value));
    choreStore.setCurrentPage(currentPage.data.page);
    choreStore.setChores(currentPage.data.page.content);
  }
  showFilterDropdown.value = !showFilterDropdown.value;
}
</script>

<style scoped>
/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
