import { TodoInput } from "../types/dto/request/todoRequest";
import { GetTodosResponse } from "../types/dto/response/todoResponse";
import { Todo } from "../types/entity/todo";

const apiUrl = "http://localhost:8000/api/v1/todo";

export const createTodo = async (todoData: TodoInput): Promise<Todo> => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  return res.json();
};

export const getTodos = async (): Promise<GetTodosResponse> => {
  const res = await fetch(apiUrl);
  return res.json();
};

export const deleteTodo = async (id: string) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const getTodoById = async (id: string): Promise<Todo> => {
  const res = await fetch(`${apiUrl}/${id}`);
  const data = await res.json();
  return data.todo;
};

export const updateTodo = async (
  id: string,
  data: Partial<TodoInput>
): Promise<Todo> => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
