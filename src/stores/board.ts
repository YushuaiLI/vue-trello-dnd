import { defineStore } from "pinia";
import type { Column, Task } from "@/types";
import { nanoid } from "nanoid";

type State = {
  columns: Column[];
};

const initialState: State = {
  columns: [
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
  ],
};

export const useBoardStore = defineStore("board", {
  state: (): State => initialState,
  actions: {
    addTask(title: string, id: Column["id"]) {
      const column = findColumn(this.columns, id);

      if (!column) return;

      column.tasks.push({
        id: nanoid(),
        title,
        createdAt: new Date(),
      });
    },
    addColumn(colTitle: string) {
      this.columns.push({
        title: colTitle,
        id: nanoid(),
        tasks: [],
      });
    },
    updateCols(cols: Column[]) {
      this.columns = cols;
    },
    updateTasks(id: Column["id"], tasks: Task[]) {
      const column = findColumn(this.columns, id);

      if (!column) return;

      column.tasks = tasks;
    },
    updateColTitle(title: string, id: Column["id"]) {
      const column = findColumn(this.columns, id);

      if (!column) return;

      column.title = title;
    },
  },
});

function findColumn(cols: Column[], id: Column["id"]): Column | undefined {
  return cols.find((col) => col.id === id);
}
