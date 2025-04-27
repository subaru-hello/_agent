import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { TaskStreamUseCase } from "../../../domain/usecases/sse/taskStreamUseCase";

export const createTaskStreamController = (
  taskStreamUseCase: TaskStreamUseCase
) => {
  const controller = new Hono();

  controller.get("/task/:taskId", async (c) => {
    const taskId = c.req.param("taskId");

    return streamSSE(c, async (stream) => {
      stream.onAbort(() => {
        console.log("SSE connection aborted");
        stream.close();
      });

      try {
        for await (const task of taskStreamUseCase.streamTask(taskId)) {
          await stream.writeSSE({
            data: JSON.stringify(task),
          });
        }
      } catch (error) {
        console.error("SSE Error:", error);
        await stream.writeSSE({
          data: JSON.stringify({
            id: taskId,
            status: "error",
            message: "エラーが発生しました",
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          }),
        });
      } finally {
        stream.close();
      }
    });
  });

  return controller;
};
