<script lang="ts" setup>
import TrelloBoardColumn from "./TrelloBoardColumn.vue";
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();
</script>

<template>
  <div class="flex gap-4 overflow-x-auto items-start py-8">
    <TrelloBoardColumn
      v-for="column in Object.keys(store.columns).map(
        (key) => store.columns[key]
      )"
      :key="column.id"
      :column="column"
      @task:created="store.addTaskToColumn"
    ></TrelloBoardColumn>
  </div>
</template>
