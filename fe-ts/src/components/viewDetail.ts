import{taskMenuDetail } from "../components/taskMenuDetail"


export function viewDetail(): void {
  const taskListContainer = document.body.querySelector(".task-list"); // fix: class selector

  if (!taskListContainer) return;

taskListContainer.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  const button = target.closest(".menu-view") as HTMLElement | null;
    if (!button) return;

    const taskElement = button.closest(".task-item") as HTMLElement | null;
    if (!taskElement) return;

    const existingModal = document.getElementById("task-details-model");
    if (existingModal) existingModal.remove();

    // Construct a `task` object from dataset
    const task = {
      _id: taskElement.dataset.id || "",
      title: taskElement.dataset.title || "Untitled",
      description: taskElement.dataset.description || "",
      isCompleted: taskElement.dataset.completed === "true",
      timestamps: {
        createdOn: taskElement.dataset.created || new Date().toISOString()
      }
    };

    // Insert modal HTML
    document.body.insertAdjacentHTML("beforeend", taskMenuDetail(task));

    // Get modal elements
    const modal = document.getElementById("viewModalOverlay") as HTMLElement | null;
    const titleEl = document.getElementById("detail-title") as HTMLElement | null;
    const descEl = document.getElementById("detail-description") as HTMLElement | null;
    const createdEl = document.getElementById("detail-date") as HTMLElement | null;
    const completedEl = document.getElementById("detail-completion-text") as HTMLElement | null;
    const closeButton = document.querySelector(".close-view-btn") as HTMLButtonElement | null;

    if (!modal || !titleEl || !descEl || !createdEl || !completedEl || !closeButton) {
      console.error("Modal elements not found");
      return;
    }

    // Fill modal content
    titleEl.textContent = task.title;
    descEl.textContent = task.description;
    createdEl.textContent = task.timestamps.createdOn;
    completedEl.textContent = task.isCompleted ? "Yes" : "No";

    modal.classList.remove("hidden_detail");

    closeButton.onclick = () => {
      modal.classList.add("hidden_detail");
      modal.remove();
    };
  });
}
