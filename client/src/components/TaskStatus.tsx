import { useTask } from "../hooks/useTask";
export const TaskStatus = () => {
  const { currentTask } = useTask();

  if (!currentTask) {
    return null;
  }

  return (
    <div className="task-status">
      <h2>タスクの状態</h2>
      <div className="status-card">
        <h3>{currentTask.title}</h3>
        {currentTask.description && <p>{currentTask.description}</p>}
        <div className="status-indicator">
          <span className={`status-badge ${currentTask.status}`}>
            {currentTask.status}
          </span>
        </div>
        {currentTask.message && (
          <p className="status-message">{currentTask.message}</p>
        )}
        {currentTask.error && (
          <p className="error-message">エラー: {currentTask.error}</p>
        )}
      </div>
    </div>
  );
};
