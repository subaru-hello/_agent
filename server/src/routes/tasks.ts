import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const db_tasks = [
  { id: 1, title: "task1", completed: false },
  { id: 2, title: "task2", completed: true },
  { id: 3, title: "task3", completed: false },
];
const tasks = new Hono();

tasks.get("/tasks", (c) => {
  return c.json({ message: "all tasks", tasks: db_tasks });
});
tasks.post(
  "/tasks",
  zValidator("json", z.object({ title: z.string() })),
  (c) => {
    const { title } = c.req.valid("json");
    const newTask = { id: db_tasks.length + 1, title, completed: false };
    db_tasks.push(newTask);
    return c.json({ message: "task created", task: newTask });
  }
);
tasks.put("/tasks/:id", (c) => {
  return c.json({ message: "task updated" });
});
tasks.delete("/tasks/:id", (c) => {
  return c.json({ message: "task deleted" });
});

export default tasks;
