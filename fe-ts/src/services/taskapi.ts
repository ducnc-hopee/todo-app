import { TaskInput } from "../types/TaskTypes"; // adjust path as needed

const apiUrl = 'http://localhost:8000/api/v1/todo';

export const createTodo = async (todoData: TaskInput) => {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoData)
  });
  return res.json();
}

export const getTodos = async () => {
  const res = await fetch(apiUrl);
  return res.json();
}

export const deleteTodo = async (id: string) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

export const getTodoById = async (id: string) => {
  const res = await fetch(`${apiUrl}/${id}`);
  return res.json();
}

export const updateTodo = async (id: string, data: TaskInput) => {
  const payload = {
    title: data.title,
    description: data.description,
    isCompleted: data.isCompleted
  };
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}