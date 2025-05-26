import { Todo } from '../service/dtos/responses/todo.response';

type TaskListProps = {
  todos: Todo[];
  filter: 'all' | 'complete' | 'incomplete';
  onToggleComplete: (todoId: string, isCompleted: boolean) => void;
  onShowOptions: (event: MouseEvent, todoId: string) => void;
};

export function TaskList({ todos, filter, onToggleComplete, onShowOptions }: TaskListProps): void {
  const todoListContainer = document.getElementById('todoListContainer');
  if (!todoListContainer) return;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'complete') return todo.isCompleted;
    if (filter === 'incomplete') return !todo.isCompleted;
    return true;
  });

  let html = '<div class="todo-list">';

  if (filteredTodos.length === 0) {
    html += `
      <div class="empty-state">
        <p>No tasks found</p>
      </div>
    `;
  } else {
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

  filteredTodos.forEach((todo) => {
    const todoItem = todoListContainer.querySelector(`.todo-item[data-id="${todo._id}"]`) as HTMLElement | null;
    if (!todoItem) return;

    const checkbox = todoItem.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
    if (checkbox) {
      checkbox.addEventListener('change', () => onToggleComplete(todo._id, checkbox.checked));
    }

    const menuBtn = todoItem.querySelector('.todo-menu-btn') as HTMLButtonElement | null;   
    if (menuBtn) {
      menuBtn.addEventListener('click', (e: MouseEvent) => onShowOptions(e, todo._id));
    }
  });
}
