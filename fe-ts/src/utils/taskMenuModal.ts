import { taskMenuEdit } from "../components/taskMenuEdit";
import { taskMenuDetail } from "../components/taskMenuDetail";
import { updateTodo } from "../services/taskapi";
import { renderTask } from "../components/taskHandlers";
import { Task, TaskInput } from "../types/TaskTypes";

export function TaskMenuModal(taskItem: HTMLElement, task: Task): void {
  const viewBtn = taskItem.querySelector(".menu-view") as HTMLElement;
  viewBtn.addEventListener("click", () => {
    const existingModal = document.querySelector(".modal-overlay");
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML("beforeend", taskMenuDetail(task));
    const modal = document.querySelector(".modal-overlay") as HTMLElement | null;
    if (!modal) return;

    const outsideClickHandler = (e: MouseEvent) => {
      if (e.target === modal) {
        modal.remove();
        document.removeEventListener("click", outsideClickHandler);
      }
    };
    document.addEventListener("click", outsideClickHandler);

    const closeButtons = modal.querySelectorAll(".modal-close, .close-view-btn");
    closeButtons.forEach((btn) => {
      (btn as HTMLElement).addEventListener("click", () => {
        modal.remove();
      });
    });

    const escListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        modal.remove();
        document.removeEventListener("keydown", escListener);
      }
    };
    document.addEventListener("keydown", escListener);

    const editButton = modal.querySelector(".edit-view-btn") as HTMLButtonElement | null;
    if (editButton) {
      editButton.addEventListener("click", () => {
        modal.remove();

        const existingModal = document.querySelector(".modal-overlay");
        if (existingModal) existingModal.remove();

        document.body.insertAdjacentHTML("beforeend", taskMenuEdit(task));
        const editModal = document.querySelector(".modal-overlay") as HTMLElement | null;
        if (!editModal) return;

        const closeButtons = editModal.querySelectorAll(".modal-close, .close-edit-btn");
        closeButtons.forEach((btn) => {
          (btn as HTMLElement).addEventListener("click", () => {
            editModal.remove();
          });
        });

        const saveButton = editModal.querySelector(".save-edit-btn") as HTMLButtonElement;
        const titleInput = editModal.querySelector("#edit-title") as HTMLInputElement;
        const descInput = editModal.querySelector("#edit-description") as HTMLInputElement;

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

            if (targetList) renderTask(updatedTask, targetList as HTMLElement);

            editModal.remove();
          } catch (err) {
            console.error("Failed to update task", err);
          }
        });
      });
    }
  });
}