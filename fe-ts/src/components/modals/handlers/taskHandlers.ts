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
    if (!newTodo._id) 
    {
      throw new Error('Failed to create todo: No ID returned');
    }
    state.todos = [newTodo, ...state.todos.filter(todo => todo && todo._id)];
    renderTodoList();
    closeAddTaskModal();
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}

export async function handleUpdateTask(formData: { title: string; description: string }) {
  if (!state.currentTodo || !state.currentTodo._id) {
    console.error('No task selected for updating');
    return;
  }

  try {
    const updatedTodo = await todoService.updateTodo(state.currentTodo._id, formData);
    if (!updatedTodo || !updatedTodo._id) {
      throw new Error('Failed to update todo: No response from server');
    }
    
    state.todos = state.todos
      .filter(todo => todo && todo._id)
      .map((todo) => todo._id === state.currentTodo!._id ? { ...todo, ...formData } : todo);
    
    renderTodoList();
  } catch (error) {
    console.error('Error updating todo:', error);
    // You might want to show an error message to the user here
  }
}

export async function deleteTodo(todoId: string) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  console.log(state.todos);
  
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