import { MODAL_TYPES } from "../../constants/modals";
import { TTask } from "../../types/task";
import { componentMounted } from "../../utils/componentMounted";
import { BaseModal } from "./BaseModal";

type TAddTaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: TTask) => void;
}

export function AddTaskModal({
  open,
  onClose,
  onSubmit,
}: TAddTaskModalProps) {

  const handleCloseModal = () => {
    (document.getElementById(`addTaskForm`) as HTMLFormElement).reset();
    onClose();
  }

  componentMounted(() => {
    document.getElementById(`cancelAddTaskBtn`)?.addEventListener("click", handleCloseModal);
    document.getElementById(`addTaskForm`)?.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      handleSubmit();
    });
  })


  const handleSubmit = () => {
    const title = (document.getElementById('taskTitle') as HTMLInputElement).value;
    const description = (document.getElementById('taskDescription') as HTMLTextAreaElement).value;
    onSubmit({ title, description, isCompleted: false });
    handleCloseModal();
  }

  const contentHTML = `
  <form id="addTaskForm">
          <div class="form-group">
            <label for="taskTitle">Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="Enter task title" required>
          </div>
          <div class="form-group">
            <label for="taskDescription">Description</label>
            <textarea id="taskDescription" class="textarea" placeholder="Enter task description"></textarea>
          </div>
          <div class="dialog-footer">
            <button type="button" class="btn-secondary" id="cancelAddTaskBtn">Cancel</button>
            <button type="submit" class="btn-primary">Add Task</button>
          </div>
        </form>
        `
  return BaseModal({
    title: "Add Task",
    open,
    onClose: handleCloseModal,
    contentHTML,
  })
}