import { Task } from "../../types/entity/task"

export function editTaskModal(task: Task) {
  return `
    <div id="editModalOverlay" class="edit-modal-overlay">
        <div id="editTaskModal" class="edit-modal">
            <div class="heading">
                <div class="heading-des">
                    <h3>Edit Task</h3>
                    <p>Make changes to your task.</p>
                </div>
                <button class="close-edit-btn">&times;</button>
            </div>
            <div class="des">
                <h4>Title</h4>
                <input class="task-title" value="${task.title}" maxLength="100" required>
                <h4>Description</h4>
                <textarea class="task-des" maxLength="500">${task.description}</textarea>
                <div class="option-btns">
                    <button class="close-edit-btn">Cancel</button>
                    <button class="save-btn" data-id="${task._id}">Save changes</button>
                </div>
            </div>
        </div>
    </div>
  `;
}
