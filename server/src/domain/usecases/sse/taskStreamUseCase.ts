import { Task } from "../../entities/task";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface TaskStreamUseCase {
  streamTask(taskId: string): AsyncGenerator<Task, void, unknown>;
}

export class TaskStreamUseCaseImpl implements TaskStreamUseCase {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async *streamTask(taskId: string): AsyncGenerator<Task, void, unknown> {
    // 初期状態を送信
    yield {
      id: taskId,
      status: "pending",
      message: "タスクを開始します",
      timestamp: new Date().toISOString(),
    };

    const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const statuses = [
      { status: "preparing", message: "準備中です..." },
      { status: "processing", message: "処理を実行中..." },
      { status: "analyzing", message: "結果を分析中..." },
      { status: "completed", message: "完了しました" },
    ];

    for (const status of statuses) {
      // ステータス更新を送信
      yield {
        id: taskId,
        status: status.status as Task["status"],
        message: status.message,
        timestamp: new Date().toISOString(),
      };

      try {
        // Gemini APIを使用してメッセージを生成
        const result = await model.generateContent(
          `タスクの状態が「${status.status}」になりました。この状態について説明してください。`
        );
        const response = await result.response;
        const text = response.text();

        // Geminiの応答を送信
        yield {
          id: taskId,
          status: status.status as Task["status"],
          message: text,
          timestamp: new Date().toISOString(),
        };

        // 次のステータスに進む前に待機
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        yield {
          id: taskId,
          status: "error",
          message: "エラーが発生しました",
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        };
        break;
      }
    }
  }
}
