import { TTab } from "../constants/tab";
import { TTodo } from "./todo";

export type IAppState = {
  todos: TTodo[];
  currentFilter: TTab;
  currentTodoId: string | null;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;
  currentTodo: TTodo | null;
}