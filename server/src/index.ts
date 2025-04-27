import { Hono } from "hono";
import { generateId, log } from "./middleware/context";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { TaskStreamUseCaseImpl } from "./domain/usecases/sse/taskStreamUseCase";
import { createTaskStreamController } from "./interfaces/controllers/sse/taskStreamController";
import { createTaskController } from "./interfaces/controllers/taskController";

type Variables = {
  requestId: string;
};

const app = new Hono<{ Variables: Variables }>();

// SSEコントローラーの初期化
const taskStreamUseCase = new TaskStreamUseCaseImpl(
  process.env.GEMINI_API_KEY || ""
);
const taskStreamController = createTaskStreamController(taskStreamUseCase);
const taskController = createTaskController();

app.use(generateId());
app.use(log());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// タスク関連のルート
app.route("/tasks", taskController);

// Zodを使用したバリデーションの例

const userSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
});

app.post("/users", zValidator("json", userSchema), (c) => {
  const data = c.req.valid("json");
  return c.json({ message: "ユーザーが作成されました", data });
});

// SSEルートの追加
app.route("/sse", taskStreamController);

export default app;
