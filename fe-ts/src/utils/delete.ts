import { deleteTodo, getTodoById } from "../services/todo";
import { displayComplete, displayIncomplete } from "./displayTask";
import { Todo } from '../types/entity/todo';


export function deleteTask(): void {
  const deleteBtns = document.querySelectorAll<HTMLButtonElement>(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const taskId = btn.getAttribute("data-id");
        if (!taskId) return;

        const task: Todo = await getTodoById(taskId);
        const status = task.isCompleted;

        await deleteTodo(taskId);

        if (status) {
          await displayComplete();
        } else {
          await displayIncomplete();
        }
      } catch (err) {
        console.error("Failed to delete task:", err);
        alert("Something went wrong while deleting the task.");
      }
    });
  });
}

