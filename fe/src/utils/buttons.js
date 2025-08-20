export function optionIncompleteBtn() {
  const optionBtns = document.querySelectorAll(".option-btn");

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".task-options-modal").forEach((modal) => {
        modal.classList.add("hidden");
      });
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".task-options-modal").forEach((modal) => {
      modal.classList.add("hidden");
    });
  });
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn
        .closest(".task-card-incomplete")
        .querySelector(".task-options-modal");
      modal.classList.remove("hidden");
    });
  });
}

export function optionCompleteBtn() {
  const optionBtns = document.querySelectorAll(".option-btn");

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".task-options-modal").forEach((modal) => {
        modal.classList.add("hidden");
      });
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".task-options-modal").forEach((modal) => {
      modal.classList.add("hidden");
    });
  });
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn
        .closest(".task-card-complete")
        .querySelector(".task-options-modal");
      modal.classList.remove("hidden");
    });
  });
}
