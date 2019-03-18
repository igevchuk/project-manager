export type taskType = {
  tasks: {
    task_1: { id: string; content: string };
    task_2: { id: string; content: string };
    task_3: { id: string; content: string };
    task_4: { id: string; content: string };
  };
  columns: {
    column_1: {
      id: string;
      title: string;
      taskIds: string[];
    };
  };
  columnOrder: string[];
};
