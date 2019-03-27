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

export const initialData = {
  tasks: {
    task_1: { id: 'task_1', content: 'Take out the garbage' },
    task_2: { id: 'task_2', content: 'Watch my favorite show' },
    task_3: { id: 'task_3', content: 'Charge my phone' },
    task_4: { id: 'task_4', content: 'Cook dinner' }
  },
  columns: {
    column_1: {
      id: 'column_1',
      title: 'Fallback/Default Language',
      taskIds: ['task_1']
    },
    column_2: {
      id: 'column_2',
      title: 'Variants',
      taskIds: ['task_2', 'task_3', 'task_4']
    }
  },
  columnOrder: ['column_1', 'column_2']
};
