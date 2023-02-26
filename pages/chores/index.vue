<template>
  <div>
    <div class="flex-row">
      <h3 class="text-center text-4xl py-4 font-bold mb-4">Chores</h3>
    </div>
    <div class="flex-grow border-t border-gray-400 mb-4" />
    <ChoresDropdownRow></ChoresDropdownRow>
    <div class="border border-gray-400 rounded-md px-3 py-3">
      <div class="scrollbar overflow-y-auto h-[600px]">
        <ChoresList :page="pageRef"></ChoresList>
      </div>
    </div>
    <ChoresPagination :page="pageRef"></ChoresPagination>
  </div>
</template>

<script setup lang="ts">
import { ApiResponse } from "../../models/apiResponse";
import Chore from "~~/models/chore/chore";
const choreStore = useChoreStore();
const choreService = await choreStore.getService();
const response: ApiResponse<Chore> = await choreService.getChorePage(0, [
  "active",
]);
const page = response.data.page;
const pageRef = ref(page);
choreStore.setCurrentPage(page);
choreStore.setChores(page.content);
</script>

<style scoped></style>
