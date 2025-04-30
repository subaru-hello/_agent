import { useState } from "react";
import { useTask } from "../hooks/useTask";
import React from "react";

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask } = useTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">タスクを作成</button>
    </form>
  );
};
