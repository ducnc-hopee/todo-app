import { updateTodo } from "../services/todo";
import { displayIncomplete } from "./displayTask";

export async function doneBtn() : Promise<void> {
  try {
    const doneBtns = document.querySelectorAll<HTMLElement>(".done-btn");
    doneBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const taskId = btn.getAttribute("data-id");
        if (!taskId) return;
        await updateTodo(taskId, { isCompleted: true });
        await displayIncomplete();
      });
    });
  } catch (err) {
    console.error("Error", err);
  }
}
