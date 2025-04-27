export type TaskStatus =
  | "pending"
  | "preparing"
  | "processing"
  | "analyzing"
  | "completed"
  | "error";

export interface Task {
  id: string;
  status: TaskStatus;
  message: string;
  timestamp: string;
  error?: string;
}
