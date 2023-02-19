<script lang="ts" setup>
import TrelloBoardColumn from "./TrelloBoardColumn.vue";
import { useBoardStore } from "@/stores/board";
import { computed } from "vue";
import Draggable from "vuedraggable";
import type { Column } from "@/types";
import { DRAG_HANDLE_CLASS } from "@/constants/ui";
import AddNewColumnVue from "./AddNewColumn.vue";

type DraggableItem = { element: Column };

const store = useBoardStore();

const proxiedColumns = computed({
  get() {
    return store.columns;
  },
  set(cols) {
    store.updateCols(cols);
  },
});
</script>

<template>
  <div class="flex gap-4 overflow-x-auto items-start py-8">
    <Draggable
      :animation="250"
      :handle="'.' + DRAG_HANDLE_CLASS"
      group="columns"
      item-key="id"
      v-model="proxiedColumns"
      class="flex gap-4"
    >
      <template #item="{ element: column }: DraggableItem">
        <TrelloBoardColumn
          :column="column"
          @tasks:created="store.addTask"
          @tasks:updated="(tasks) => store.updateTasks(column.id, tasks)"
          @column:update-title="store.updateColTitle"
        ></TrelloBoardColumn>
      </template>
    </Draggable>
    <AddNewColumnVue @column:add="store.addColumn" />
  </div>
</template>
