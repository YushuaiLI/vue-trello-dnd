<script setup lang="ts">
import type { Column, Task } from "@/types";
import { computed, nextTick, ref } from "vue";
import TrelloBoardTask from "./TrelloBoardTask.vue";
import { onClickOutside } from "@vueuse/core";
import { DRAG_HANDLE_CLASS } from "@/constants/ui";
import Draggable from "vuedraggable";

const props = defineProps<{ column: Column }>();

const emit = defineEmits<{
  (e: "task:created", title: string, id: Column["id"]): void;
  (e: "tasks:updated", tasks: Task[]): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const newTaskTitle = ref("");
const isEditing = ref(false);

const proxiedTasks = computed({
  get() {
    return props.column.tasks;
  },
  set(tasks) {
    emit("tasks:updated", tasks);
  },
});

onClickOutside(inputRef, () => {
  disableEditing();
});

const onAddTask = () => {
  enableEditing();
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const onAdded = (id: Column["id"]) => {
  emit("task:created", newTaskTitle.value, id);
  disableEditing();
  resetInput();
};

const disableEditing = () => (isEditing.value = false);
const enableEditing = () => (isEditing.value = true);
const resetInput = () => (newTaskTitle.value = "");
</script>

<template>
  <div class="bg-gray-200 p-5 rounded min-w-[250px]">
    <header class="font-bold mb-4">
      <span :class="DRAG_HANDLE_CLASS" class="cursor-move">⠇</span>
      {{ column.title }}
    </header>
    <Draggable
      :animation="250"
      group="tasks"
      item-key="id"
      v-model="proxiedTasks"
    >
      <template #item="{ element: task }: { element: Task }">
        <TrelloBoardTask :key="task.id" :task="task" :column-id="column.id" />
      </template>
    </Draggable>
    <footer>
      <input
        placeholder="Task title.."
        ref="inputRef"
        v-show="isEditing"
        v-model="newTaskTitle"
        @keyup.enter="onAdded(column.id)"
        class="bg-white p-2 mb-2 rounded shadow-sm w-full"
      />
      <button class="text-gray-500" v-show="!isEditing" @click="onAddTask">
        + Add Task
      </button>
    </footer>
  </div>
</template>
