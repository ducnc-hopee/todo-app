import date from "../../utils/dateString";
import { Todo } from "../../types/entity/todo";

export function viewIncompleteModal(task: Todo) {
  return `
    <div id="viewModalOverlay" class="view-modal-overlay">
      <div id="viewTaskModal" class="view-modal">
        <div class="heading">
         <h3>${task.title}</h3>
        <button class="close-view-btn">&times;</button>
        </div>
          <div class="heading-des">
            <h5>Description</h5>
            <p>${task.description}</p>
            <h5>Created</h5>
            <p>${date(task.timestamps.createdOn)}</p>
            <h5>Status</h5>
            <p>${task.isCompleted ? "Complete" : "Incomplete"}</p>
          </div>
        <div class="option-btns">
          <button class="close-view-btn">Close</button>
          <button class="edit-view-btn" data-id="${task._id}">Edit</button>
        </div>
      </div>
    </div>
  `;
}

export function viewCompleteModal(task: Todo) {
  return `
    <div id="viewModalOverlay" class="view-modal-overlay">
      <div id="viewTaskModal" class="view-modal">
        <div class="heading">
          <div class="completed-title">
          <h3>${task.title}</h3>
          <h4>Completed</h4>
          </div>
          <button class="close-view-btn">&times;</button>
        </div>
        <div class="heading-des">
          <h5>Description</h5>
          <p>${task.description}</p>
          <h5>Created</h5>
          <p>${date(task.timestamps.createdOn)}</p>
          <h5>Status</h5>
          <p>${task.isCompleted ? "Complete" : "Incomplete"}</p>
        </div>
        <div class="option-btns">
          <button class="close-view-btn">Close</button>
          <button class="edit-view-btn" data-id="${task._id}">Edit</button>
        </div>
      </div>
    </div>
  `;
}
