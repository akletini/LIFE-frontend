<template>
  <div>
    <div class="flex-row">
      <h3 class="text-center text-4xl py-4 font-bold mb-4">Chores</h3>
    </div>
    <div class="flex-grow border-t border-gray-400 mb-4" />
    <div>
      <NuxtLink
        to="/chores/newChore"
        class="border rounded-md row-span-2 py-3 lg:row-start-1 lg:row-end-1 flex justify-center hover:bg-green-700 my-3"
      >
        <button>New Chore</button>
      </NuxtLink>
    </div>
    <div class="border border-gray-400 rounded-md px-3 py-3">
      <div class="scrollbar overflow-y-auto h-[600px]">
        <ChoresList :page="pageRef"></ChoresList>
      </div>
    </div>
    <ChoresPagination></ChoresPagination>
  </div>
</template>

<script setup lang="ts">
import { ApiResponse } from "../../models/apiResponse";
import Chore from "~~/models/chore/chore";
const choreStore = useChoreStore();
const choreService = await choreStore.getService();
const response: ApiResponse<Chore> = await choreService.getChorePage(0);
const page = response.data.page;
choreStore.setCurrentPage(page);
choreStore.setChores(page.content);
const pageRef = ref(page);
</script>

<style scoped></style>
