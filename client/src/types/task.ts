export type TaskStatus =
  | "pending"
  | "preparing"
  | "processing"
  | "analyzing"
  | "completed"
  | "error";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  status: TaskStatus;
  message?: string;
  error?: string;
  timestamp?: string;
}

export type CreateTaskInput = Pick<Task, "title" | "description">;
