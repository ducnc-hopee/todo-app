export interface TaskInput {
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface Task extends TaskInput {
  _id: string;
  timestamps: {
    createdOn: string;
    createdAt: string;
  };
}
