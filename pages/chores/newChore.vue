<template>
  <div class="px-10">
    <div class="flex items-center justify-between mb-4">
      <NuxtLink to="/chores"
        ><i class="material-icons text-lg sm:text-4xl">arrow_back</i></NuxtLink
      >
      <h3 class="text-center text-lg sm:text-4xl py-4 font-bold">New Chore</h3>
      <div />
    </div>
    <form @submit.prevent="formSubmit">
      <div class="flex flex-col"></div>
      <div class="flex flex-col mb-8 border rounded-md py-3 px-3">
        <label for="name">Title</label>
        <input
          type="text"
          required
          id="name"
          class="form-input text-black text-xl rounded-md"
          v-model="title"
        />
      </div>

      <div class="flex flex-col mb-8 border rounded-md py-3 px-3">
        <label for="description">Description</label>
        <textarea
          type="text"
          id="description"
          class="form-textarea text-black text-xl rounded-md"
          v-model="description"
        ></textarea>
      </div>

      <div class="flex flex-col mb-8 border rounded-md py-3 px-3">
        <label for="duration">Duration (min)</label>
        <input
          type="number"
          required
          min="0"
          oninput="validity.valid||(value='');"
          id="duration"
          class="form-input text-black text-xl rounded-md"
          v-model="duration"
        />
      </div>

      <div class="flex flex-col mb-8 border rounded-md py-3 px-3">
        <label for="startDate">Start date</label>
        <input
          required
          type="date"
          id="startDate"
          class="form-input text-black text-xl rounded-md"
          v-model="startDate"
        />
      </div>

      <div class="md:flex md:justify-start flex-row">
        <div
          class="flex items-center mb-8 md:mr-20 border rounded-md py-3 px-3"
        >
          <input
            id="isActive"
            type="checkbox"
            class="form-input text-black text-xl rounded-md mr-2"
            v-model="isActive"
          />
          <label for="isActive" class="text-xl">Activate</label>
        </div>

        <div class="flex items-center mb-8 border rounded-md py-3 px-3">
          <input
            id="shiftInterval"
            type="checkbox"
            class="form-input text-black text-xl rounded-md mr-2"
            v-model="shiftInterval"
          />
          <label for="shiftInterval" class="text-xl">Shift interval</label>
        </div>
      </div>

      <div class="border rounded-md py-3 px-3 mb-8">
        <p class="text-xl mb-4">Interval</p>
        <div class="md:flex items-center flex-row">
          <div class="flex flex-col md:mr-4 box-border">
            <label for="name">Value</label>
            <input
              required
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              id="name"
              class="form-input text-black text-xl rounded-md"
              v-model="intervalValue"
            />
          </div>

          <div class="flex flex-col">
            <label for="intervalUnit">Unit</label>
            <select
              id="intervalUnit"
              v-model="intervalUnit"
              class="form-input text-black rounded-md h-7 bg-gray-50"
            >
              <option value="DAYS">Days</option>
              <option value="WEEKS">Weeks</option>
              <option value="YEARS">Years</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <button
          type="submit"
          class="border py-3 px-5 rounded-lg hover:bg-gray-300 hover:text-gray-700"
        >
          Save
        </button>
      </div>
    </form>
    <ErrorTransition class="mt-4">
      <ErrorModal v-if="showErrorPanel" :error="error"></ErrorModal>
    </ErrorTransition>
  </div>
</template>

<script setup lang="ts">
import Chore from "~~/models/chore/chore";
import { ChoreService } from "../../services/chore/ChoreService";
import { useChoreStore } from "../../stores/ChoreStore";
import DateUtils from "../../utils/DateUtils";
import Interval from "~~/models/chore/interval";

const choreStore = useChoreStore();
const choreService = new ChoreService();
const dateUtils = new DateUtils();
let error = ref();
const showErrorPanel = ref(false);
const title = ref("");
const description = ref("");
const duration = ref(null);
const startDate = ref(dateUtils.getDateForDatepicker());
const isActive = ref(true);
const shiftInterval = ref(true);
const intervalValue = ref(null);
const intervalUnit = ref("DAYS");

async function formSubmit() {
  let chore = new Chore();
  chore.title = title.value;
  chore.description = description.value;
  chore.createdAt = dateUtils.getCurrentDateTime();
  chore.duration = Number(duration.value);
  chore.startDate = dateUtils.getGermanDate(startDate.value);
  chore.active = isActive.value;
  chore.shiftInterval = shiftInterval.value;
  chore.interval = new Interval(
    Number(intervalValue.value),
    getIntervalValue()
  );
  chore.assignedUser = ChoreService.ASSIGNED_USER;
  const responseObject = await choreService.addChore(chore);
  if ("id" in responseObject) {
    choreStore.add(responseObject);
    useRouter().push("/chores");
  } else {
    error.value = responseObject;
    showErrorPanel.value = true;
    setTimeout(() => {
      showErrorPanel.value = false;
      error.value = null;
    }, 3000);
  }
}

function getIntervalValue() {
  switch (intervalUnit.value) {
    case Interval.DateUnit.DAYS:
      return Interval.DateUnit.DAYS;
    case Interval.DateUnit.WEEKS:
      return Interval.DateUnit.WEEKS;
    case Interval.DateUnit.MONTHS:
      return Interval.DateUnit.MONTHS;
  }
  return Interval.DateUnit.DAYS;
}
</script>

<style scoped></style>
