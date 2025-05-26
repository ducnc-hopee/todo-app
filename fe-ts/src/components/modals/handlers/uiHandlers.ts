import { TaskList } from '../../TaskList';
import { state } from '../../../state/appState';
import { TTab } from '../../../constants/tab';

export function renderTodoList() 
{
  TaskList({
    todos: state.todos,
    filter: state.currentFilter,
    onToggleComplete: toggleTodoComplete,
    onShowOptions: showTodoOptions,
  });
}

export function changeFilter(filter: TTab) 
{
  state.currentFilter = filter;
  window.location.hash = `#${filter}`;
  renderTodoList();
}

import { toggleTodoComplete, deleteTodo } from './taskHandlers';
function toggleTodoCompleteWrapper(todoId: string, isCompleted: boolean) 
{
  toggleTodoComplete(todoId, isCompleted);
}
export function showTodoOptions(event: MouseEvent, todoId: string) {
  event.stopPropagation();
  const menu = document.getElementById('taskOptionsMenu') as HTMLDivElement;

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY}px`;
  menu.style.left = `${rect.left + window.scrollX - 100}px`;
  menu.style.display = 'block';

  state.currentTodoId = todoId;

  const viewBtn = menu.querySelector('[data-action="view"]') as HTMLLIElement;
  const editBtn = menu.querySelector('[data-action="edit"]') as HTMLLIElement;
  const deleteBtn = menu.querySelector('[data-action="delete"]') as HTMLLIElement;

  viewBtn.onclick = () => {
    menu.style.display = 'none';
    document.dispatchEvent(new CustomEvent('openViewModal', { detail: todoId }));
  };

  editBtn.onclick = () => {
    menu.style.display = 'none';
    document.dispatchEvent(new CustomEvent('openEditModal', { detail: todoId }));
  };

  deleteBtn.onclick = () => {
    menu.style.display = 'none';
    deleteTodo(todoId);
  };
}
