import { GenerativeModel } from "@google/generative-ai";
import { Task } from "../domain/entities/task";

export const buildText = async (
  status: Task["status"],
  model: GenerativeModel
) => {
  switch (status) {
    case "preparing":
      return "準備中です...";
    case "processing":
      return "処理を実行中...";
    case "analyzing":
      return "結果を分析中...";
    case "completed":
      // Gemini APIを使用してメッセージを生成
      const result = await model.generateContent(
        `タスクの状態が「${status}」になりました。この状態について説明してください。`
      );
      const response = result.response;
      return response.text();
    default:
      return "予期せぬステータスです";
  }
};

// Geminiの応答を送信
