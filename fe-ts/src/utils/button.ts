export function optionIncompleteBtn(): void {
  const optionBtns =
    document.querySelectorAll<HTMLButtonElement>(".option-btn");

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      document
        .querySelectorAll<HTMLElement>(".task-options-modal")
        .forEach((modal) => {
          modal.classList.add("hidden");
        });
    });
  });

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskCard = btn.closest(".task-card-incomplete") as HTMLElement;
      if (!taskCard) return;
      const modal = taskCard.querySelector<HTMLElement>(".task-options-modal");
      if (!modal) return;
      modal.classList.remove("hidden");
    });
  });
}

export function optionCompleteBtn(): void {
  const optionBtns = document.querySelectorAll<HTMLElement>(".option-btn");

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      document
        .querySelectorAll<HTMLElement>(".task-options-modal")
        .forEach((modal) => {
          modal.classList.add("hidden");
        });
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll<HTMLElement>(".task-options-modal")
      .forEach((modal) => {
        modal.classList.add("hidden");
      });
  });
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskCard = btn.closest(".task-card-complete") as HTMLElement;
      if (!taskCard) return;
      const modal = taskCard.querySelector<HTMLElement>(".task-options-modal");
      if (!modal) return;
      modal.classList.remove("hidden");
    });
  });
}
