import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const createTaskController = () => {
  const controller = new Hono();

  controller.post("/", zValidator("json", taskSchema), async (c) => {
    const data = c.req.valid("json");
    const taskId = crypto.randomUUID();

    // ここでタスクを保存する処理を実装
    // 今回は簡易的にレスポンスを返すだけ
    return c.json(
      {
        id: taskId,
        ...data,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      201
    );
  });

  return controller;
};
