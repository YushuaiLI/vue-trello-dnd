<script lang="ts" setup>
import type { Column } from "@/types";
import { ref } from "vue";
import { nanoid } from "nanoid";

const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: "Selected",
    tasks: [{ id: nanoid(), title: "Random String", createdAt: new Date() }],
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "QA",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "Complete",
    tasks: [],
  },
]);
</script>

<template>
  <div class="flex gap-4 overflow-x-auto items-start py-8">
    <div
      v-for="column in columns"
      :key="column.id"
      class="bg-gray-200 p-5 rounded min-w-[250px]"
    >
      <header>
        {{ column.title }}
      </header>
      <p v-for="task in column.tasks" :key="task.id">{{ task.title }}</p>
    </div>
  </div>
</template>
