<script setup lang="ts">
import type { Column, Task } from "@/types";

defineProps<{
  task: Task;
  columnId: Column["id"];
}>();
</script>

<template>
  <div
    :title="task.createdAt.toLocaleDateString()"
    class="bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] hover:cursor-move"
  >
    <span>{{ task.title }}</span>
  </div>
</template>
