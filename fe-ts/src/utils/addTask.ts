

import {
  createTodo,
  getTodos,
} from "../services/taskapi";
import { renderTask } from "../components/taskHandlers";
import { Task } from "../types/TaskTypes";

// Setup task creation and loading
export function setupCreateTaskHandler(): void {
  const createBtn = document.getElementById("createTaskBtn") as HTMLButtonElement | null;
  const titleInput = document.getElementById("taskTitle") as HTMLInputElement | null;
  const descInput = document.getElementById("taskDescription") as HTMLInputElement | null;
  const overlay = document.getElementById("overlay") as HTMLElement | null;

  async function loadTasks(): Promise<void> {
    try {
      const rs = await getTodos();
      const tasks: Task[] = rs.todos || [];

      const incompleteList = document.querySelector(".incomplete-list") as HTMLElement | null;
      const completeList = document.querySelector(".complete-list") as HTMLElement | null;

      if (!incompleteList || !completeList) return;

      incompleteList.innerHTML = "";
      completeList.innerHTML = "";

      tasks.forEach((task: Task) => {
        const list = task.isCompleted ? completeList : incompleteList;
        renderTask(task, list);
      });
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  }

  loadTasks();

  if (createBtn && titleInput && descInput && overlay) {
    createBtn.addEventListener("click", async () => {
      console.log("Add Task button clicked");
      const title = titleInput.value.trim();
      const description = descInput.value.trim();

      if (!title) {
        alert("Please enter a title");
        return;
      }

      try {
        const rs = await createTodo({ title, description, isCompleted: false });
        const incompleteList = document.querySelector(".incomplete-list") as HTMLElement | null;

        if (incompleteList) {
          renderTask(rs.todo, incompleteList);
        }

        titleInput.value = "";
        descInput.value = "";
        overlay.classList.remove("active");
      } catch (err) {
        console.error("Failed to create task:", err);
      }
    });
  }
}