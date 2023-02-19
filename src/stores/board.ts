import { ref } from "vue";
import { defineStore } from "pinia";
import type { Column } from "@/types";
import { nanoid } from "nanoid";

export const useBoardStore = defineStore("board", () => {
  const columns = ref<Column[]>([
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

  const addTaskToColumn = (title: string, id: Column["id"]) => {
    const column = columns.value.find((c) => c.id === id);

    if (!column) return;

    column.tasks.push({
      id: nanoid(),
      title,
      createdAt: new Date(),
    });
  };

  const updateColumns = (cols: Column[]) => {
    columns.value = cols;
  };

  return { columns, addTaskToColumn, updateColumns };
});
