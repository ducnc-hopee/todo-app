import { deleteTodo } from "../services/taskapi";
import { Task } from "../types/TaskTypes";

export function deleteTask(taskItem: HTMLElement, task: Task): void {
  const deleteBtn = taskItem.querySelector(".menu-delete") as HTMLButtonElement | null;

  if (!deleteBtn) return; // Safety check in case the button is not found

  deleteBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTodo(task._id);
        taskItem.remove();
      } catch (err) {
        console.error("Failed to delete task", err);
      }
    }
  });
}