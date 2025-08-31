// taskManager

import { taskMenu } from "./taskMenu";
import { doneUndo } from "../utils/doneUndo";
import { TaskMenuModal } from "../utils/taskMenuModal";
import { deleteTask } from "../utils/deleteTask";
import { setupEditTask } from "../utils/editTask";
import { Task } from "../types/TaskTypes";

// Define the type for a task obje

// Render a single task
export function renderTask(task: Task, taskList: Element | null): void {
  const taskItem = document.createElement("div");
  taskItem.dataset.id = task._id;
  taskItem.className = "task-item";
  taskItem.dataset.title = task.title;
  taskItem.dataset.description = task.description;
  taskItem.dataset.created = new Date(
    task.timestamps.createdAt
  ).toLocaleString();
  taskItem.dataset.completed = task.isCompleted.toString();

  const isCompleted = task.isCompleted;

taskItem.innerHTML = `
  <div class="task-content">
    <div class="task-text">
      <h4 class="task-title">${task.title}</h4>
      <p class="task-desc">${task.description}</p>
    </div>
    <div class="task-actions">
      <button class="${isCompleted ? "undo-btn" : "done-btn"}">
        <span class="tick">
          <i class="fa-solid ${isCompleted ? "fa-rotate-left" : "fa-check"}"></i>
        </span>
        ${isCompleted ? "Undo" : "Done"}
      </button>
      <div class="menu-wrapper">
        <div class="menu-icon">...</div>
        <ul class="task-menu hidden">
          <li><button class="menu-view">View Details</button></li>
          <li><button class="menu-edit">Edit</button></li>
          <li><button class="menu-delete">Delete</button></li>
        </ul>
      </div>
    </div>
  </div>
`;

  if (!taskList) return;
  // Append the task to the correct list
  taskList.appendChild(taskItem);

  // Setup event handlers
  deleteTask(taskItem, task);
  taskMenu(taskItem);
  setupEditTask(taskItem, task);
  doneUndo(taskItem, task, renderTask);
  TaskMenuModal(taskItem, task);
}
