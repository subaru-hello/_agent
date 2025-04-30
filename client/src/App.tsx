import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskDetail } from "./components/TaskDetail";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <h1>タスク管理アプリ</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TaskForm />
                <TaskList />
              </>
            }
          />
          <Route path="/task/:taskId" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
