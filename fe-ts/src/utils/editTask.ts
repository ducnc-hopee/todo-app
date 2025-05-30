import { updateTodo } from "../services/taskapi";
import { taskMenuEdit } from "../components/taskMenuEdit";
import { renderTask } from "../components/taskHandlers";
import { Task } from "../types/TaskTypes";

export function setupEditTask(taskItem: HTMLElement, task: Task): void {
  const editBtn = taskItem.querySelector(".menu-edit");

  if (!editBtn) {
    console.warn("Edit button not found.");
    return;
  }

  editBtn.addEventListener("click", () => {
    document.body.insertAdjacentHTML("beforeend", taskMenuEdit(task));

    const editModal = document.getElementById("edit-modal");
    if (!editModal) {
      console.error("Edit modal not found.");
      return;
    }

    const closeButtons = editModal.querySelectorAll(".modal-close, .close-edit-btn");
    const saveButton = editModal.querySelector(".save-edit-btn") as HTMLButtonElement;
    const titleInput = editModal.querySelector("#edit-title") as HTMLInputElement;
    const descInput = editModal.querySelector("#edit-description") as HTMLInputElement;

    // Close on outside click
    const outsideClickHandler = (e: MouseEvent) => {
      if (e.target === editModal) {
        editModal.remove();
        document.removeEventListener("click", outsideClickHandler);
      }
    };
    document.addEventListener("click", outsideClickHandler);

    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => editModal.remove());
    });

    saveButton.addEventListener("click", async () => {
      const updatedTask: Task = {
        ...task,
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
      };

      if (!updatedTask.title) {
        alert("Title cannot be empty");
        return;
      }

      try {
        await updateTodo(task._id, updatedTask);

        const oldTaskItem = document.querySelector(`[data-id="${task._id}"]`);
        if (oldTaskItem) oldTaskItem.remove();

        const targetList = updatedTask.isCompleted
          ? document.querySelector(".complete-list")
          : document.querySelector(".incomplete-list");

        renderTask(updatedTask, targetList);
      } catch (err) {
        console.error("Failed to update task", err);
      }
    });
  });
}
