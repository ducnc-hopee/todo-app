import axios from 'axios';
import { TCreateTodoRequest } from '../service/dtos/requests/create-todo.request';
import { TUpdateTodoRequest } from '../service/dtos/requests/update-todo.request';
import { TCompleteTodoRequest } from '../service/dtos/requests/complete-todo.request';
import { Todo } from '../service/dtos/responses/todo.response';
import { ApiResponse } from '../service/dtos/responses/api.response';

const API_URL = 'http://localhost:8000/api/v1/todo';


export const todoService = {
  async getTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get<ApiResponse<Todo[]>>(API_URL);
      const data = response.data;

      if (data.status === 'Success') {
        const todos = data.todos || [];
        return Array.isArray(todos)
          ? todos.flat().filter((todo): todo is Todo => !!todo && !!todo._id)
          : [];
      }
      else {
        console.error('Error fetching todos:', data.message);
        return [];
      }
    }
    catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  async getTodo(todoId: string): Promise<Todo | null> {
    try {
      const response = await axios.get<ApiResponse<Todo>>(`${API_URL}/${todoId}`);
      const data = response.data;

      if (data.status === 'Success') {
        return data.todo || null;
      }
      else {
        console.error('Error fetching todo:', data.message);
        return null;
      }
    }
    catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  },

  async createTodo(todoData: TCreateTodoRequest): Promise<Todo> {
    try {
      const response = await axios.post<ApiResponse<Todo>>(API_URL, todoData);
      const data = response.data;

      if (data.status === 'Success') {
        return data.todo!;
      }
      else {
        console.error('Error creating todo:', data.message);
        throw new Error(data.message);
      }
    }
    catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  async updateTodo(todoId: string, todoData: TUpdateTodoRequest): Promise<Todo> {
    try {
      const response = await axios.put<ApiResponse<Todo>>(`${API_URL}/${todoId}`, todoData);
      const data = response.data;

      if (data.status === 'Success') {
        return data.todo!;
      }
      else {
        console.error('Error updating todo:', data.message);
        throw new Error(data.message);
      }
    }
    catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  async completeTodo(todoId: string, isCompleted: boolean): Promise<Todo> {
    try {
      const CompleteData: TCompleteTodoRequest = { isCompleted };
      const response = await axios.patch<ApiResponse<Todo>>(`${API_URL}/${todoId}`, CompleteData);
      const data = response.data;

      if (data.status === 'Success') {
        return data.todo!;
      }
      else {
        console.error('Error updating todo status:', data.message);
        throw new Error(data.message);
      }
    }
    catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  },

  async deleteTodo(todoId: string): Promise<boolean> {
    try {
      const response = await axios.delete<ApiResponse<never>>(`${API_URL}/${todoId}`);
      const data = response.data;

      if (data.status === 'Success') {
        return true;
      }
      else {
        console.error('Error deleting todo:', data.message);
        throw new Error(data.message);
      }
    }
    catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
};

