<script setup lang="ts">
import type { Column, Task } from "@/types";

defineProps<{
  task: Task;
  columnId: Column["id"];
}>();

// defineEmits<{
//   (e: "drag:start"): void;
//   (e: "drag:end"): void;
// }>();
</script>

<template>
  <div
    :title="task.createdAt.toLocaleDateString()"
    class="bg-white p-2 mb-2 rounded shadow-sm max-w-[250px]"
  >
    <span>{{ task.title }}</span>
  </div>
</template>
