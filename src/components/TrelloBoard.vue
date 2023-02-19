<script lang="ts" setup>
import TrelloBoardColumn from "./TrelloBoardColumn.vue";
import { useBoardStore } from "@/stores/board";
import { computed, ref } from "vue";
import Draggable from "vuedraggable";
import type { Column } from "@/types";

const store = useBoardStore();
const isDragging = ref(false);

const proxiedColumns = computed({
  get() {
    return store.columns;
  },
  set(cols) {
    store.updateColumns(cols);
  },
});
</script>

<template>
  <Draggable
    v-model="proxiedColumns"
    group="columns"
    @start="isDragging = true"
    @end="isDragging = false"
    item-key="id"
    class="flex gap-4 overflow-x-auto items-start py-8"
  >
    <template #item="{ element: column }: { element: Column }">
      <TrelloBoardColumn
        :column="column"
        @task:created="store.addTaskToColumn"
      ></TrelloBoardColumn>
    </template>
  </Draggable>
</template>
