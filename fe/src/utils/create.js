import { closeModal } from "./modal";
import { createTodo } from "../services/todo";
import { displayIncomplete } from "./displayTask";

export function createTask() {
  const createBtn = document.querySelector(".create-btn");

  createBtn.addEventListener("click", async () => {
    try {
      const title = document.querySelector(".task-title").value.trim();
      const des = document.querySelector(".task-des").value.trim();

      if (!title) {
        alert("Title is required.");
        return;
      }

      const taskData = {
        title: title,
        description: des || undefined,
      };

      const result = await createTodo(taskData);
      closeModal();
      const tabBtns = document.querySelectorAll(".tab-btn");
      tabBtns.forEach((btn) => btn.classList.remove("active"));

      const incompleteBtn = document.querySelector(
        '.tab-btn[data-status="incomplete"]'
      );
      if (incompleteBtn) incompleteBtn.classList.add("active");
      displayIncomplete();
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("Something went wrong while creating the task.");
    }
  });
}
