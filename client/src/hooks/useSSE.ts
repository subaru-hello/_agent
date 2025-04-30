import { useEffect, useState, useCallback } from "react";
import { Task } from "../types/task";

export function useSSE(taskId: string) {
  const [taskStatus, setTaskStatus] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const connect = useCallback(() => {
    if (eventSource) {
      eventSource.close();
    }

    const newEventSource = new EventSource(
      `http://localhost:3001/task/${taskId}`
    );

    newEventSource.onmessage = (event) => {
      const data: Task = JSON.parse(event.data);
      console.log("受信したデータ:", data);
      setTaskStatus(data);
    };

    newEventSource.onerror = () => {
      setError("SSE接続エラーが発生しました。再接続を試みます...");
      setTimeout(() => {
        connect();
      }, 1000);
    };

    setEventSource(newEventSource);
  }, [taskId]);

  useEffect(() => {
    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [taskId]);

  return { taskStatus, error };
}
