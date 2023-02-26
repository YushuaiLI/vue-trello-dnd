<script setup lang="ts">
import type { Column, Task } from "@/types";
import { computed, nextTick, ref } from "vue";
import TrelloBoardTask from "./TrelloBoardTask.vue";
import { onClickOutside, useKeyModifier } from "@vueuse/core";
import Draggable from "vuedraggable";
import ColumnHeader from "./ColumnHeader.vue";

/**
 * Props and Emits
 */
const props = defineProps<{ column: Column }>();

const emit = defineEmits<{
  (e: "tasks:created", title: string, id: Column["id"]): void;
  (e: "tasks:updated", tasks: Task[]): void;
  (e: "column:update-title", title: string, id: Column["id"]): void;
}>();

/**
 * Reactive State
 */
const newTaskTitle = ref("");
const inputTaskTitleRef = ref<HTMLInputElement | null>(null);
const isEditing = ref(false);

const proxiedTasks = computed({
  get() {
    return props.column.tasks;
  },
  set(tasks) {
    emit("tasks:updated", tasks);
  },
});

/**
 * DOM Handlers
 */
const alt = useKeyModifier("Alt");

onClickOutside(inputTaskTitleRef, () => {
  disableEditing();
});

/**
 * Methods
 */
const onAddTask = () => {
  enableEditing();
  nextTick(() => {
    inputTaskTitleRef.value?.focus();
  });
};

const onAdded = (id: Column["id"]) => {
  emit("tasks:created", newTaskTitle.value, id);
  disableEditing();
  resetTaskTitleInput();
};

const onUpdateTitle = (title: string) => {
  emit("column:update-title", title, props.column.id);
};

const disableEditing = () => (isEditing.value = false);
const enableEditing = () => (isEditing.value = true);
const resetTaskTitleInput = () => (newTaskTitle.value = "");
</script>

<template>
  <div class="bg-gray-200 p-5 rounded min-w-[250px]">
    <ColumnHeader :column="props.column" @column:update-title="onUpdateTitle" />
    <Draggable
      v-model="proxiedTasks"
      :animation="250"
      :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
      item-key="id"
    >
      <template #item="{ element: task }: { element: Task }">
        <div id="task-wrapper">
          <TrelloBoardTask :key="task.id" :task="task" :column-id="column.id" />
        </div>
      </template>
    </Draggable>
    <footer>
      <textarea
        v-show="isEditing"
        ref="inputTaskTitleRef"
        v-model="newTaskTitle"
        placeholder="Enter a title for this task"
        class="bg-white p-2 mb-2 rounded shadow-sm w-full outline-none"
        @keyup.enter="onAdded(column.id)"
      />
      <button v-show="!isEditing" class="text-gray-500" @click="onAddTask">
        + Add Task
      </button>
    </footer>
  </div>
</template>

<style>
#task-wrapper.sortable-chosen > div {
  transform: rotate(5deg);
}

#task-wrapper.sortable-ghost > div {
  transform: rotate(0);
}
</style>
