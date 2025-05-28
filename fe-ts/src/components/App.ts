import { Header } from "./Header";
import { TaskHeader } from "./TaskHeader";
import { Tabs } from "./Tabs";
import { ViewTaskModal } from "./modals/ViewTaskModal";
import { initModal } from "./modals/helpers/initModal";

import { fetchTodos } from "./modals/handlers/taskHandlers";
import {
  openEditModal,
  closeViewModal,
  openViewModal,
  closeEditModal,
} from "./modals/handlers/modalHandlers";
import { changeFilter } from "./modals/handlers/uiHandlers";
import { state } from "../state/appState";
import { subscribe } from "../utils/customEventPubSub";
import { EVENTS } from "../constants/customEvent";
import { TaskList } from "./TaskList";

export function renderApp() {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  appContainer!.innerHTML = `
    <div id="headerContainer">${Header()}</div>
    <main>
      <div id="taskHeaderContainer"></div>
      <div id="tabsContainer"></div>
      <div id="todoListContainer"></div>
    </main>
   
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

  Tabs({ currentFilter: state.currentFilter, onFilterChange: changeFilter });
  TaskHeader();
  TaskList({todos: state.todos, filter: state.currentFilter});

  initModal(ViewTaskModal, { onClose: closeViewModal });

  
  
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

  fetchTodos();
}
