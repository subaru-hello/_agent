import axios from "axios";
import { Task } from "../types/task";

const API_BASE_URL = "http://localhost:3001";

export const taskApi = {
  createTask: async (data: {
    title: string;
    description?: string;
  }): Promise<Task> => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, data);
    return response.data;
  },

  subscribeToTask: (taskId: string) => {
    return new EventSource(`${API_BASE_URL}/task/${taskId}`);
  },
};
