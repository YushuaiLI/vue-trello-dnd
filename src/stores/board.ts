import { ref } from "vue";
import { defineStore } from "pinia";
import type { Column, Task } from "@/types";
import { nanoid } from "nanoid";
import { computed } from "vue";

export const useBoardStore = defineStore("board", () => {
  const _columns = ref<Column[]>([
    {
      id: "1",
      title: "Selected",
      tasks: [
        { id: nanoid(), title: "Task 1", createdAt: new Date() },
        { id: nanoid(), title: "Task 2", createdAt: new Date() },
        { id: nanoid(), title: "Task 3", createdAt: new Date() },
      ],
    },
    { id: "2", title: "In Progress", tasks: [] },
    { id: "3", title: "QA", tasks: [] },
    { id: "4", title: "Complete", tasks: [] },
  ]);

  const columns = computed(() => _columns);

  const addTaskToColumn = (title: string, id: Column["id"]) => {
    const column = _columns.value.find((c) => c.id === id);

    if (!column) return;

    column.tasks.push({
      id: nanoid(),
      title,
      createdAt: new Date(),
    });
  };

  const updateColumns = (cols: Column[]) => {
    _columns.value = cols;
  };

  const updateTasks = (colId: Column["id"], tasks: Task[]) => {
    const column = _columns.value.find((c) => c.id === colId);

    if (!column) return;

    column.tasks = tasks;
  };

  return { columns, addTaskToColumn, updateColumns, updateTasks };
});
