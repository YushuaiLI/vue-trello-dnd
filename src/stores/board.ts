import { reactive } from "vue";
import { defineStore } from "pinia";
import type { Column } from "@/types";
import { nanoid } from "nanoid";

type Store = {
  [columndId: Column["id"]]: Column;
};

export const useBoardStore = defineStore("board", () => {
  const store = reactive<Store>({
    "1": {
      id: "1",
      title: "Selected",
      tasks: [
        { id: nanoid(), title: "Task 1", createdAt: new Date() },
        { id: nanoid(), title: "Task 2", createdAt: new Date() },
        { id: nanoid(), title: "Task 3", createdAt: new Date() },
      ],
    },
    "2": { id: "2", title: "In Progress", tasks: [] },
    "3": { id: "3", title: "QA", tasks: [] },
    "4": { id: "4", title: "Complete", tasks: [] },
  });

  const addTaskToColumn = (title: string, id: Column["id"]) => {
    store[id].tasks.push({
      id: nanoid(),
      title,
      createdAt: new Date(),
    });
  };

  return { columns: store, addTaskToColumn };
});
