export function openModal(): void {
  const addTaskModal = document.getElementById("addTaskModal");
  if (!addTaskModal) return;
  addTaskModal.classList.remove("hidden");
  const modalOverlay = document.getElementById("modalOverlay");
  if (!modalOverlay) return;
  modalOverlay.classList.remove("hidden");
  const taskInput = document.querySelector<HTMLElement>(".task-title");
  if (taskInput) {
    taskInput.focus();
  }
}

export function closeModal(): void {
  const addTaskModal = document.getElementById("addTaskModal");
  if (!addTaskModal) return;
  addTaskModal.classList.add("hidden");
  const modalOverlay = document.getElementById("modalOverlay");
  if (!modalOverlay) return;
  modalOverlay.classList.add("hidden");
}

export function clearInputs():void {
  const titleInput = document.querySelector<HTMLInputElement>(".task-title");
  const descInput = document.querySelector<HTMLTextAreaElement>(".task-des");
  if (titleInput) titleInput.value = "";
  if (descInput) descInput.value = "";
}

export function openBtn():void {
  const openBtn = document.getElementById("openModalBtn");
  if (!openBtn) return;
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      openModal();
      clearInputs();
    });
  }
}

export function closeBtn():void {
  const closeBtns = document.querySelectorAll(".close-btn");
  if (!closeBtns) return;
  closeBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      closeModal();
    })
  );
}

export function cancelBtn():void {
  const cancelBtns = document.querySelectorAll(".cancel-btn");
  if (!cancelBtns) return;
  cancelBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      clearInputs();
      closeModal();
    })
  );
}

export function initModalEvents() :void{
  openBtn();
  closeBtn();
  cancelBtn();
}
