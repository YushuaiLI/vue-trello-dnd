<script setup lang="ts">
import { DRAG_HANDLE_CLASS } from "@/constants/ui";
import type { Column } from "@/types";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

/**
 * Props and Emits
 */
const props = defineProps<{ column: Column }>();

const emit = defineEmits<{
  (e: "column:update-title", title: string): void;
}>();

const colTitle = ref(props.column.title);
const inputColTitleRef = ref<HTMLInputElement | null>(null);
const isEditingColTitle = ref(false);

onClickOutside(inputColTitleRef, () => {
  disableEditingColTitle();
  resetColTitleInput();
});

const onUpdateTitle = () => {
  emit("column:update-title", colTitle.value);
  disableEditingColTitle();
};

const disableEditingColTitle = () => (isEditingColTitle.value = false);
const enableEditingColTitle = () => (isEditingColTitle.value = true);
const resetColTitleInput = () => (colTitle.value = props.column.title);
</script>

<template>
  <header class="font-bold mb-4 flex gap-x-2">
    <span :class="DRAG_HANDLE_CLASS" class="cursor-move">⠇</span>
    <h3 v-if="!isEditingColTitle" @dblclick="enableEditingColTitle">
      {{ column.title }}
    </h3>
    <input
      v-else
      ref="inputColTitleRef"
      v-model="colTitle"
      type="text"
      class="font-bold mb-4 p-1 max-w-[75%]"
      @keypress.enter="onUpdateTitle"
    />
  </header>
</template>
