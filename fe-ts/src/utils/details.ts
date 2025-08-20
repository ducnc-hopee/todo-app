import { getTodoById } from "../services/todo";
import {
  viewCompleteModal,
  viewIncompleteModal,
} from "../components/modal.ts/viewTaskModal";
import { editTaskModal } from "../components/modal.ts/editTaskModal";
import { updateTodo } from "../services/todo";
import { displayIncomplete, displayComplete } from "./displayTask";
import { Todo } from "../types/entity/todo";
import { TodoInput } from "../types/dto/request/todoRequest";

let saveListenerAdded = false;

export function viewDetails(): void {
  const taskList = document.querySelector<HTMLElement>(".task-list");
  if (!taskList) return;

  taskList.addEventListener("click", async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const btn = target.closest(".view-btn") as HTMLButtonElement;
    if (!btn) return;
    try {
      const taskId = btn.getAttribute("data-id");
      if (!taskId) return;
      const task: Todo = await getTodoById(taskId);
      console.log(task);
      const status = task.isCompleted;
      console.log(status);

      document
        .querySelectorAll<HTMLElement>(".edit-modal-overlay")
        .forEach((m) => m.remove());
      document
        .querySelectorAll<HTMLElement>(".view-modal-overlay")
        .forEach((m) => m.remove());

      if (task && status == false) {
        const modalHTML = viewIncompleteModal(task);
        document.body.insertAdjacentHTML("beforeend", modalHTML);
      } else if (task && status == true) {
        const modalHTML = viewCompleteModal(task);
        document.body.insertAdjacentHTML("beforeend", modalHTML);
      }
    } catch (err) {
      console.error("Error displaying task details:", err);
      alert("Failed to load task details. Please try again later.");
    }
  });
}

export function closeDetails(): void {
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const btn = target.closest(".close-view-btn");
    if (btn) {
      document
        .querySelectorAll(".edit-modal-overlay")
        .forEach((m) => m.remove());
      document
        .querySelectorAll(".view-modal-overlay")
        .forEach((m) => m.remove());
    }
  });
}

export function closeEditDetails(): void {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    const btn = target.closest(".close-edit-btn");
    if (btn) {
      document
        .querySelectorAll(".edit-modal-overlay")
        .forEach((m) => m.remove());
      document
        .querySelectorAll(".view-modal-overlay")
        .forEach((m) => m.remove());
    }
  });
}

export function editDetails(): void {
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest(".edit-btn");
    if (btn) {
      try {
        const taskId = btn.getAttribute("data-id");
        if (!taskId) return;
        const task: Todo = await getTodoById(taskId);

        document
          .querySelectorAll(".edit-modal-overlay")
          .forEach((m) => m.remove());
        document
          .querySelectorAll(".view-modal-overlay")
          .forEach((m) => m.remove());

        const modalHTML = editTaskModal(task);
        document.body.insertAdjacentHTML("beforeend", modalHTML);
      } catch (err) {
        console.error("Error viewing task details:", err);
        alert("Failed to view details. Please try again later.");
      }
    }
  });
}

export function editViewDetails(): void {
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    const btn = target.closest(".edit-view-btn");
    if (btn) {
      try {
        const taskId = btn.getAttribute("data-id");
        if (!taskId) return;
        const task = await getTodoById(taskId);

        document
          .querySelectorAll(".edit-modal-overlay")
          .forEach((m) => m.remove());
        document
          .querySelectorAll(".view-modal-overlay")
          .forEach((m) => m.remove());

        const modalHTML = editTaskModal(task);
        document.body.insertAdjacentHTML("beforeend", modalHTML);
      } catch (err) {
        console.error("Error viewing task details:", err);
        alert("Failed to view details. Please try again later.");
      }
    }
  });
}

export function saveChanges(): void {
  if (saveListenerAdded) return;
  saveListenerAdded = true;
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest(".save-btn");
    if (btn) {
      try {
        const taskId = btn.getAttribute("data-id");
        if (!taskId) return;
        const task = await getTodoById(taskId);
        const status = task.isCompleted;

        const modal = document.querySelector<HTMLElement>(
          ".edit-modal-overlay"
        );
        if (!modal) return;
        const titleInput = modal.querySelector<HTMLInputElement>(".task-title");
        const titleValue = titleInput?.value.trim() || "";

        if (!titleValue) {
          alert("Title is required");
          return;
        }
        const desInput = modal.querySelector<HTMLTextAreaElement>(".task-des");
        const desValue = desInput?.value.trim() || "";

        const taskData: TodoInput = {
          title: titleValue,
          description: desValue,
        };

        if (status == false) {
          await updateTodo(taskId, taskData);
          document
            .querySelectorAll<HTMLElement>(".edit-modal-overlay")
            .forEach((m) => m.remove());
          displayIncomplete();
        } else if (status == true) {
          await updateTodo(taskId, taskData);
          document
            .querySelectorAll<HTMLElement>(".edit-modal-overlay")
            .forEach((m) => m.remove());
          displayComplete();
        }
      } catch (err) {
        console.error("Error displaying task details:", err);
        alert("Failed to load task details. Please try again later.");
      }
    }
  });
}
