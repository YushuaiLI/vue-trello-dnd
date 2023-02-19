<script lang="ts" setup>
import TrelloBoardColumn from "./TrelloBoardColumn.vue";
import { useBoardStore } from "@/stores/board";
import { computed, ref } from "vue";
import Draggable from "vuedraggable";
import type { Column } from "@/types";
import { DRAG_HANDLE_CLASS } from "@/constants/ui";

type DraggableItem = { element: Column };

const store = useBoardStore();
const isDragging = ref(false);

const proxiedColumns = computed({
  get() {
    return store.columns.value;
  },
  set(cols) {
    store.updateColumns(cols);
  },
});
</script>

<template>
  <Draggable
    :animation="250"
    :handle="'.' + DRAG_HANDLE_CLASS"
    @end="isDragging = false"
    @start="isDragging = true"
    class="flex gap-4 overflow-x-auto items-start py-8"
    group="columns"
    item-key="id"
    v-model="proxiedColumns"
  >
    <template #item="{ element: column }: DraggableItem">
      <TrelloBoardColumn
        :column="column"
        @task:created="store.addTaskToColumn"
        @tasks:updated="(tasks) => store.updateTasks(column.id, tasks)"
      ></TrelloBoardColumn>
    </template>
  </Draggable>
</template>
