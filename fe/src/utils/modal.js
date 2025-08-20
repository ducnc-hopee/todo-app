export function openModal() {
  document.getElementById("addTaskModal").classList.remove("hidden");
  document.getElementById("modalOverlay").classList.remove("hidden");
  const taskInput = document.querySelector(".task-title");
  if (taskInput) {
    taskInput.focus();
  }
}

export function closeModal() {
  document.getElementById("addTaskModal").classList.add("hidden");
  document.getElementById("modalOverlay").classList.add("hidden");
}

export function clearInputs() {
  const titleInput = document.querySelector(".task-title");
  const descInput = document.querySelector(".task-des");
  if (titleInput) titleInput.value = "";
  if (descInput) descInput.value = "";
}

export function openBtn() {
  const openBtn = document.getElementById("openModalBtn");
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      openModal();
      clearInputs();
    });
  }
}

export function closeBtn() {
  const closeBtns = document.querySelectorAll(".close-btn");
  closeBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      closeModal();
    })
  );
}

export function cancelBtn() {
  const cancelBtns = document.querySelectorAll(".cancel-btn");
  cancelBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      clearInputs();
      closeModal();
    })
  );
}

export function initModalEvents() {
  openBtn();
  closeBtn();
  cancelBtn();
}
