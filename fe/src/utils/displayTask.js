import { taskContent, taskOptionsModal } from "../components/task";
import { getTodos } from "../services/todo";
import { doneBtn } from "./done";
import { optionIncompleteBtn, optionCompleteBtn } from "./buttons";
import { deleteTask } from "./delete";
import { undoBtn } from "./undo";
import {
  closeDetails,
  closeEditDetails,
  editDetails,
  editViewDetails,
  saveChanges,
  viewDetails,
} from "./details";

export async function displayIncomplete() {
  try {
    const data = await getTodos();
    const tasks = data.todos;

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks
      .filter((task) => task.isCompleted == false)
      .forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `<div class="task-card-incomplete">
            ${taskContent(task)}
            <div class="options">
                <button class="done-btn" data-id="${task._id}">✔  Done</button>
                <button class="option-btn">•••</button>
                ${taskOptionsModal(task)}
            </div>
            </div>
        </div>
        `;
        taskList.appendChild(li);
      });
    optionIncompleteBtn();
    doneBtn();
    deleteTask();
    viewDetails();
    closeDetails();
    editDetails();
    closeEditDetails();
    editViewDetails();
    saveChanges();
  } catch (err) {
    console.error("Error displaying incomplete task:", err);
    alert("Failed to load tasks. Please try again later.");
  }
}

export async function displayComplete() {
  try {
    const data = await getTodos();
    const tasks = data.todos;

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";
    tasks
      .filter((task) => task.isCompleted == true)
      .forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `<div class="task-card-complete">
            ${taskContent(task)}
            <div class="options">
                <button class="undo-btn" data-id="${task._id}">↩ Undo</button>
                <button class="option-btn">•••</button>
                ${taskOptionsModal(task)}
            </div>
            </div>
        </div>
        `;
        taskList.appendChild(li);
      });
    optionCompleteBtn();
    undoBtn();
    deleteTask();
    viewDetails();
    closeDetails();
    editDetails();
    closeEditDetails();
    editViewDetails();
    saveChanges();
  } catch (err) {
    console.error("Error displaying completed tasks", error);
    alert("Failed to load tasks. Please try again later.");
  }
}

export function initTabEvents() {
  const tabBtns = document.querySelectorAll(".tab-btn");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((tab) => tab.classList.remove("active"));
      btn.classList.add("active");

      const status = btn.dataset.status;
      if (status === "incomplete") {
        displayIncomplete();
      } else if (status === "complete") {
        displayComplete();
      }
    });
  });
}
