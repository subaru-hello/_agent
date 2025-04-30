import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task, CreateTaskInput } from "../types/task";
import { useLocalStorage } from "./useLocalStorage";

export function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const createTask = useCallback(
    (input: CreateTaskInput) => {
      const newTask: Task = {
        id: uuidv4(),
        title: input.title,
        description: input.description,
        completed: false,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const getTask = useCallback(
    (id: string) => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );
  const currentTask = useMemo(() => {
    return tasks.find((task) => task.status === "pending");
  }, [tasks]);

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    getTask,
    currentTask,
  };
}
