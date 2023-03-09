<template>
  <div class="overflow-x-auto flex flex-col">
    <h3 class="text-2xl">Chores</h3>
    <table class="table table-normal w-full">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Duration</th>
          <th>Due on</th>
          <th>Last completed</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="(chore, index) in chores" class="hover">
          <th>{{ index + 1 }}</th>
          <td>{{ chore.title }}</td>
          <td>{{ chore.duration }}</td>
          <td>
            {{ chore.dueAt }}
          </td>
          <td>
            {{ chore.lastCompleted }}
          </td>
        </tr>
      </tbody>
    </table>
    <NuxtLink to="/chores" class="ml-auto text-lg mr-4">Go to Chores</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const choreStore = useChoreStore();
const choreService = await choreStore.getService();
const page = (await choreService.getPage(0, ["active"])).data.page;
const chores = page.content;
</script>

<style scoped></style>
