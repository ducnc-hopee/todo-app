import { Header } from "./Header";
import { TaskHeader } from "./TaskHeader";
import { Tabs } from "./Tabs";
import { AddTaskModal } from "./modals/AddTaskModal";
import { EditModal } from "./modals/EditModal";
import { ViewTaskModal } from "./modals/ViewTaskModal";
import { initModal, initModal1 } from "./modals/helpers/initModal";

import { fetchTodos } from "./modals/handlers/taskHandlers";
import {
  openAddTaskModal,
  closeAddTaskModal,
  openEditModal,
  closeEditModal,
  closeViewModal,
  openViewModal,
} from "./modals/handlers/modalHandlers";
import { changeFilter } from "./modals/handlers/uiHandlers";
import { state } from "../state/appState";
import {
  handleAddTask,
  handleUpdateTask,
} from "./modals/handlers/taskHandlers";
import { subscribe } from "../utils/customEventPubSub";
import { EVENTS } from "../constants/customEvent";

export function renderApp() {
  const appContainer = document.getElementById("app");
  if(!appContainer) return;

  appContainer!.innerHTML = `
    <div id="headerContainer">${Header()}</div>
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

  //TaskHeader({ onAddClick: openAddTaskModal });
  initModal1(TaskHeader, {onAddClick: openAddTaskModal});
  Tabs({ currentFilter: state.currentFilter, onFilterChange: changeFilter });

  fetchTodos();

  initModal(AddTaskModal, {onSubmit: handleAddTask, onClose: closeAddTaskModal});
  initModal(EditModal, {onSubmit: handleUpdateTask, onClose: closeEditModal});
  initModal(ViewTaskModal, {onClose: closeViewModal});

  subscribe(EVENTS.OPEN_EDIT_MODAL, openEditModal);
  subscribe(EVENTS.OPEN_VIEW_MODAL, openViewModal);
  
 

  document.addEventListener("click", (e: MouseEvent) => {
    if (!e.target) return;
    const currentElement = e.target as HTMLElement;
    const taskOptionsMenu = document.getElementById("taskOptionsMenu");
    if (!taskOptionsMenu) return;
    if (taskOptionsMenu.contains(currentElement)) return;
    if (currentElement.classList.contains("todo-menu-btn")) return;

    taskOptionsMenu.style.display = "none";
  });
}
