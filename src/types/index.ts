type ID = string;

export type Task = {
  id: ID;
  createdAt: Date;
  title: string;
};

export type Column = {
  id: ID;
  tasks: Task[];
  title: string;
};
