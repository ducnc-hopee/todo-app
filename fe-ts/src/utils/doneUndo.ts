import { updateTodo } from "../services/taskapi";
import { Task } from "../types/TaskTypes";

export function doneUndo(
  taskItem: HTMLElement,
  task: Task,
  renderTask: (task: Task, targetList: Element | null) => void
): void {
  const isCompleted = task.isCompleted;
  const btn = taskItem.querySelector<HTMLButtonElement>(
    isCompleted ? ".undo-btn" : ".done-btn"
  );

  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      const updatedTask = { ...task, isCompleted: !isCompleted };
      await updateTodo(task._id, updatedTask);
      taskItem.remove();

      const targetList = updatedTask.isCompleted
        ? document.querySelector(".complete-list")
        : document.querySelector(".incomplete-list");

      renderTask(updatedTask, targetList);
    } catch (err) {
      console.error("Failed to toggle complete status", err);
    }
  });
}