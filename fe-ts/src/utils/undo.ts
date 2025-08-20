import { updateTodo } from "../services/todo";
import { displayComplete } from "./displayTask";

export async function undoBtn() {
  try {
    const doneBtns = document.querySelectorAll(".undo-btn");

    doneBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const taskId = btn.getAttribute("data-id");

        if (taskId) {
          await updateTodo(taskId, { isCompleted: false });
          await displayComplete();
          undoBtn();
        }
      });
    });
  } catch (err) {
    console.error("Error", err);
  }
}
