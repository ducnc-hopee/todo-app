import { getTodoById } from "../services/todo";
import {
  viewCompleteModal,
  viewIncompleteModal,
} from "../components/modals/viewTaskModal";
import { editTaskModal } from "../components/modals/editTaskModal";
import { updateTodo } from "../services/todo";
import { displayIncomplete, displayComplete } from "./displayTask";

let saveListenerAdded = false;

export function viewDetails() {
  document.querySelector(".task-list").addEventListener("click", async (e) => {
    const btn = e.target.closest(".view-btn");
    if (!btn) return;
    try {
      const taskId = btn.getAttribute("data-id");
      const task = await getTodoById(taskId);
      const status = task.todo.isCompleted;

      document
        .querySelectorAll(".edit-modal-overlay")
        .forEach((m) => m.remove());
      document
        .querySelectorAll(".view-modal-overlay")
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

export function closeDetails() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".close-view-btn");
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

export function closeEditDetails() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".close-edit-btn");
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

export function editDetails() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".edit-btn");
    if (btn) {
      try {
        const taskId = btn.getAttribute("data-id");
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

export function editViewDetails() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".edit-view-btn");
    if (btn) {
      try {
        const taskId = btn.getAttribute("data-id");
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

export function saveChanges() {
  if (saveListenerAdded) return;
  saveListenerAdded = true;
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".save-btn");
    if (btn) {
      try {
        const taskId = btn.getAttribute("data-id");
        const task = await getTodoById(taskId);
        const status = task.todo.isCompleted;

        const modal = document.querySelector(".edit-modal-overlay");
        const title = modal.querySelector(".task-title").value.trim();
        const des = modal.querySelector(".task-des")?.value.trim();
        if (!title) {
          alert("Title is required");
          return;
        }

        const taskData = {
          title: title,
          description: des,
        };
        if (status == false) {
          await updateTodo(taskId, taskData);
          document
            .querySelectorAll(".edit-modal-overlay")
            .forEach((m) => m.remove());
          displayIncomplete();
        } else if (status == true) {
          await updateTodo(taskId, taskData);
          document
            .querySelectorAll(".edit-modal-overlay")
            .forEach((m) => m.remove());
          displayComplete();
        }
      } catch (err) {
        console.error("Error displaying task details:", error);
        alert("Failed to load task details. Please try again later.");
      }
    }
  });
}
