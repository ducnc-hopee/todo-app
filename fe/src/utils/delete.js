import { deleteTodo, getTodoById } from "../services/todo";
import { displayComplete, displayIncomplete } from "./displayTask";

export function deleteTask() {
  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const taskId = btn.getAttribute("data-id");
        const task = await getTodoById(taskId);
        const status = task.todo.isCompleted;

        if (task && status == false) {
          await deleteTodo(taskId);
          await displayIncomplete();
        } else if (task && status == true) {
          await deleteTodo(taskId);
          await displayComplete();
        }
      } catch (err) {
        console.error("Failed to delete task:", err);
        alert("Something went wrong while deleting the task.");
      }
    });
  });
}
