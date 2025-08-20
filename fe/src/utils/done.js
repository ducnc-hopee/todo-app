import { updateTodo } from "../services/todo";
import { displayIncomplete } from "./displayTask";

export async function doneBtn() {
  try{
  const doneBtns = document.querySelectorAll(".done-btn");

  doneBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const taskId = btn.getAttribute("data-id");

      if (taskId) {
        await updateTodo(taskId, { isCompleted: true });
        await displayIncomplete();
      }
    });
  });
}catch(err){
    console.error("Error", error);
}}
