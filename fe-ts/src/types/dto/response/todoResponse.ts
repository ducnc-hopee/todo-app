import { Todo } from "../../entity/todo";

export interface GetTodosResponse {
  status: string;
  message: string;
  todos: Todo[];
  todoCount: number;
}
