<script setup lang="ts">
import type { Column, Task } from "@/types";
import { computed, nextTick, ref } from "vue";
import TrelloBoardTask from "./TrelloBoardTask.vue";
import { onClickOutside, useKeyModifier } from "@vueuse/core";
import { DRAG_HANDLE_CLASS } from "@/constants/ui";
import Draggable from "vuedraggable";

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

const title = ref(props.column.title);
const inputColTitleRef = ref<HTMLInputElement | null>(null);
const isEditingColTitle = ref(false);

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

onClickOutside(inputColTitleRef, () => {
  disableEditingColTitle();
  resetColTitleInput();
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

const onUpdateTitle = () => {
  emit("column:update-title", title.value, props.column.id);
};

const disableEditing = () => (isEditing.value = false);
const enableEditing = () => (isEditing.value = true);
const resetTaskTitleInput = () => (newTaskTitle.value = "");
const disableEditingColTitle = () => (isEditingColTitle.value = false);
const enableEditingColTitle = () => (isEditingColTitle.value = true);
const resetColTitleInput = () => (title.value = props.column.title);
</script>

<template>
  <div class="bg-gray-200 p-5 rounded min-w-[250px]">
    <header class="font-bold mb-4 flex gap-x-2">
      <span :class="DRAG_HANDLE_CLASS" class="cursor-move">⠇</span>
      <h3 v-if="!isEditingColTitle" @dblclick="enableEditingColTitle">
        {{ column.title }}
      </h3>
      <input
        v-else
        ref="inputColTitleRef"
        type="text"
        v-model="title"
        @keyup.enter="onUpdateTitle"
        class="font-bold mb-4"
      />
    </header>
    <Draggable
      :animation="250"
      :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
      item-key="id"
      v-model="proxiedTasks"
    >
      <template #item="{ element: task }: { element: Task }">
        <div id="task-wrapper">
          <TrelloBoardTask :key="task.id" :task="task" :column-id="column.id" />
        </div>
      </template>
    </Draggable>
    <footer>
      <textarea
        placeholder="Enter a title for this task"
        ref="inputTaskTitleRef"
        v-show="isEditing"
        v-model="newTaskTitle"
        @keyup.enter="onAdded(column.id)"
        class="bg-white p-2 mb-2 rounded shadow-sm w-full outline-none"
      />
      <button class="text-gray-500" v-show="!isEditing" @click="onAddTask">
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
