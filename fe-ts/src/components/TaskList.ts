import { Todo } from '../service/dtos/responses/todo.response';
import { TABS } from "../constants/tab";
import { componentMounted } from "../utils/componentMounted";
import { subscribe } from '../utils/customEventPubSub';
import { EVENTS } from '../constants/customEvent';
import { openEditModal } from './modals/handlers/modalHandlers';

type TaskListProps = {
  todos: Todo[];
  filter: 'all' | 'complete' | 'incomplete';
  onToggleComplete: (todoId: string, isCompleted: boolean) => void;
  onShowOptions: (event: MouseEvent, todoId: string) => void;
};

subscribe(EVENTS.OPEN_EDIT_MODAL, openEditModal);

export function TaskList({ 
  todos = [], 
  filter = 'all', 
  onToggleComplete = () => {}, 
  onShowOptions = () => {} 
}: Partial<TaskListProps> = {}) {
  const todoListContainer = document.getElementById('todoListContainer');
  if (!todoListContainer) return;

  let removeListeners: Function[] = [];
  const validTodos = todos.filter(todo => todo && todo._id)

  const getFilteredTodos = () => {
    return validTodos.filter((todo) => {
      switch (filter) {
        case TABS.ALL:
          return true;
        case TABS.COMPLETE:
          return todo.isCompleted;
        case TABS.INCOMPLETE:
          return !todo.isCompleted;
        default:
          return true;
      }
    });
  };

  const renderHTML = () => {
    const filteredTodos = getFilteredTodos();

    let html = '<div class="todo-list">';

    if (filteredTodos.length === 0) {
      html += `
      <div class="empty-state">
        <p>No tasks found</p>
      </div>
    `;
    }
    else {
      filteredTodos.forEach((todo) => {
        html += `
        <div class="todo-item ${todo.isCompleted ? 'completed' : ''}" data-id="${todo._id}">
          <div class="todo-checkbox">
            <label>
              <input type="checkbox" ${todo.isCompleted ? 'checked' : ''}>
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="todo-content">
            <div class="todo-title">${todo.title}</div>
            ${todo.description ? `<div class="todo-description">${todo.description}</div>` : ''}
          </div>
          <div class="todo-actions">
            <button class="todo-menu-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-vertical">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      `;
      });
    }

    html += '</div>';
    todoListContainer.innerHTML = html;
  };

  const setupEventListeners = () => {
    removeAllListeners();

    const filteredTodos = getFilteredTodos();
    filteredTodos.forEach((todo) => {
      const todoItem = todoListContainer.querySelector(`.todo-item[data-id="${todo._id}"]`);
      if (!todoItem) return;

      const checkbox = todoItem.querySelector('input[type="checkbox"]') as HTMLInputElement;
      const menuBtn = todoItem.querySelector('.todo-menu-btn') as HTMLButtonElement;

      const checkboxHandler = () => onToggleComplete(todo._id, checkbox.checked);
      const menuBtnHandler = (e: MouseEvent) => onShowOptions(e, todo._id);

      checkbox?.addEventListener('change', checkboxHandler);
      menuBtn?.addEventListener('click', menuBtnHandler);
    });
  };

  const removeAllListeners = () => {
    removeListeners.forEach(remove => remove());
    removeListeners = [];
  };

  componentMounted(() => {
    setupEventListeners();
  });

  renderHTML();
}
