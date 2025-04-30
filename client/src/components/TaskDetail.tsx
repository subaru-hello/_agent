import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../hooks/useTask";
import { useSSE } from "../hooks/useSSE";
import { TaskStatus } from "../types/task";

const statusLabels: Record<TaskStatus, string> = {
  pending: "待機中",
  preparing: "準備中",
  processing: "処理中",
  analyzing: "分析中",
  completed: "完了",
  error: "エラー",
};

export const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { getTask, updateTask, deleteTask } = useTask();
  const { taskStatus, error } = useSSE(taskId!);
  const task = getTask(taskId!);

  if (!task) {
    return <div>タスクが見つかりません</div>;
  }

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/");
  };

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>作成日: {new Date(task.createdAt).toLocaleString()}</p>

      {taskStatus && (
        <div className="task-status">
          <h3>タスクの状態</h3>
          <div className={`status-badge ${taskStatus.status}`}>
            {statusLabels[taskStatus.status]}
          </div>
          {taskStatus.message && (
            <p className="status-message">{taskStatus.message}</p>
          )}
          {taskStatus.error && (
            <p className="error-message">{taskStatus.error}</p>
          )}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="task-actions">
        <button onClick={handleToggleComplete}>
          {task.completed ? "未完了に戻す" : "完了にする"}
        </button>
        <button onClick={handleDelete}>削除</button>
        <button onClick={() => navigate("/")}>戻る</button>
      </div>
    </div>
  );
};
