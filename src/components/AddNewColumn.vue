<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { nextTick, ref } from "vue";

const emit = defineEmits<{
  (e: "column:add", title: string): void;
}>();

const newColumn = ref("");
const isEditing = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

onClickOutside(inputRef, () => {
  isEditing.value = false;
});

const onAddClick = () => {
  isEditing.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const onColumnAdd = () => {
  emit("column:add", newColumn.value);
  newColumn.value = "";
  isEditing.value = false;
};
</script>

<template>
  <div class="bg-gray-200 p-8 min-w-[250px]">
    <input
      v-show="isEditing"
      class="py-2 px-4"
      type="text"
      placeholder="Enter column name"
      v-model="newColumn"
      @keyup.enter="onColumnAdd"
      @blur="isEditing = false"
      ref="inputRef"
    />
    <button v-show="!isEditing" @click="onAddClick">+ Add Column</button>
  </div>
</template>
