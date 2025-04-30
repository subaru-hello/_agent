import { useNavigate } from "react-router-dom";
import { useTask } from "../hooks/useTask";

export const TaskList = () => {
  const { tasks } = useTask();
  const navigate = useNavigate();

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
          onClick={() => navigate(`/task/${task.id}`)}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <small>{new Date(task.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};
