import { todoService } from "../../../service/todoService";
import { state } from "../../../state/appState";
import {renderTodoList} from "./uiHandlers";
import { closeAddTaskModal, closeEditModal } from "./modalHandlers";

export async function fetchTodos() {
  try {
    const todos = await todoService.getTodos();
    state.todos = todos;
    renderTodoList();
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

export async function handleAddTask(formData: { title: string; description: string; isCompleted: boolean }) {
  try {
    const newTodo = await todoService.createTodo(formData);
    state.todos.unshift(newTodo);
    renderTodoList();
    closeAddTaskModal();
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}

export async function handleUpdateTask(formData: { title: string; description: string }) {
  if (!state.currentTodo) return;

  try {
    await todoService.updateTodo(state.currentTodo._id, formData);
    state.todos = state.todos.map((todo) =>
      todo._id === state.currentTodo!._id ? { ...todo, ...formData } : todo
    );
    renderTodoList();
    closeEditModal();
  } catch (error) {
    console.error('Error updating todo:', error);
  }
}

export async function deleteTodo(todoId: string) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    await todoService.deleteTodo(todoId);
    state.todos = state.todos.filter((todo) => todo._id !== todoId);
    renderTodoList();
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

export async function toggleTodoComplete(todoId: string, isCompleted: boolean) {
  try {
    await todoService.completeTodo(todoId, isCompleted);
    state.todos = state.todos.map((todo) =>
      todo._id === todoId ? { ...todo, isCompleted } : todo
    );
    renderTodoList();
  } catch (error) {
    console.error('Error updating todo status:', error);
  }
}