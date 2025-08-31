export function taskMenu(taskItem: HTMLElement): void {
  const menuIcon = taskItem.querySelector(".menu-icon") as HTMLElement | null;
  const taskMenu = taskItem.querySelector(".task-menu") as HTMLElement | null;

  if (!menuIcon || !taskMenu) return;

  const handleOutsideClick = (e: MouseEvent): void => {
    if (!taskItem.contains(e.target as Node)) {
      taskMenu.classList.add("hidden");
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  menuIcon.addEventListener("click", (e: MouseEvent): void => {
    e.stopPropagation();

    document.querySelectorAll(".task-menu").forEach((otherMenu) => {
      if (otherMenu !== taskMenu) {
        (otherMenu as HTMLElement).classList.add("hidden");
      }
    });

    taskMenu.classList.toggle("hidden");

    if (!taskMenu.classList.contains("hidden")) {
      document.addEventListener("click", handleOutsideClick);
    }
  });

  taskMenu.addEventListener("click", (e: MouseEvent): void => {
    e.stopPropagation();
  });
}