import { Header } from './Header';
import { TaskHeader } from './TaskHeader';
import { Tabs } from './Tabs';
import { AddTaskModal } from './modals/AddTaskModal';
import { EditModal } from './modals/EditModal';
import { ViewTaskModal } from './modals/ViewTaskModal';

import { fetchTodos } from './modals/handlers/taskHandlers';
import { openAddTaskModal, closeAddTaskModal, openEditModal, closeEditModal, closeViewModal, openViewModal } from './modals/handlers/modalHandlers';
import { changeFilter } from './modals/handlers/uiHandlers';
import { state } from "../state/appState";
import { handleAddTask, handleUpdateTask } from './modals/handlers/taskHandlers';

export function renderApp() {
  const appContainer = document.getElementById('app') as HTMLDivElement;

  appContainer.innerHTML = `
    <div id="headerContainer"></div>
    <main>
      <div id="taskHeaderContainer"></div>
      <div id="tabsContainer"></div>
      <div id="todoListContainer"></div>
    </main>
    <div id="addTaskModalContainer"></div>
    <div id="editModalContainer"></div>
    <div id="viewTaskModalContainer"></div>
    <div id="taskOptionsMenu" class="dropdown-menu">
      <ul>
        <li data-action="view">View</li>
        <li data-action="edit">Edit</li>
        <li data-action="delete">Delete</li>
      </ul>
    </div>
  `;

  Header();
  TaskHeader({ onAddClick: openAddTaskModal});
  Tabs({ currentFilter: state.currentFilter, onFilterChange: changeFilter });

  fetchTodos();

  AddTaskModal({ onSubmit: handleAddTask, onClose: closeAddTaskModal });
  EditModal({ onSubmit: handleUpdateTask, onClose: closeEditModal });
  ViewTaskModal({ onClose: closeViewModal });

  document.addEventListener('openViewModal', ((event: CustomEvent) => {
    openViewModal(event.detail);
  }) as EventListener);

  document.addEventListener('openEditModal', ((event: CustomEvent) => {
    openEditModal(event.detail);
  }) as EventListener);

  document.addEventListener('click', (e: MouseEvent) => {
    const taskOptionsMenu = document.getElementById('taskOptionsMenu') as HTMLDivElement;
    if (
      taskOptionsMenu &&
      e.target &&
      !taskOptionsMenu.contains(e.target as Node) &&
      !(e.target as HTMLElement).classList.contains('todo-menu-btn')
    ) {
      taskOptionsMenu.style.display = 'none';
    }
  });
}
  