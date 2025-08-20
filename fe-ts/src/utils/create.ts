import { closeModal } from "./modal";
import { createTodo } from "../services/todo";
import { displayIncomplete } from "./displayTask";
import { TodoInput } from "../types/dto/request/todoRequest";

export function createTask():void {
  const createBtn = document.querySelector<HTMLButtonElement>(".create-btn");
  if (!createBtn) return;

  createBtn.addEventListener("click", async () => {
    try {
      const title = document.querySelector<HTMLInputElement>(".task-title");
      const des = document.querySelector<HTMLTextAreaElement>(".task-des");

      if (!title) {
        alert("Title is required.");
        return;
      }

      const taskData: TodoInput = {
        title: title.value.trim(),
        description: des?.value.trim() || undefined
      };

      const result = await createTodo(taskData);
      closeModal();

      const tabBtns = document.querySelectorAll<HTMLElement>(".tab-btn");
      tabBtns.forEach((btn) => btn.classList.remove("active"));

      const incompleteBtn = document.querySelector<HTMLElement>(
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
