import { TTaskUpdate } from "../../types/taskUpdate";

export function EditModal({ onSubmit, onClose }: { onSubmit: (task: TTaskUpdate) => void; onClose: () => void }) {
  const editModalContainer = document.getElementById('editModalContainer') as HTMLDivElement;

  if (!editModalContainer) {
    console.error('Không tìm thấy phần tử với ID "editModalContainer"');
    return;
  }

  editModalContainer.innerHTML = `
    <div class="dialog-overlay" id="editModal">
      <div class="dialog">
        <div class="dialog-header">
          <h3>Edit Task</h3>
          <button class="close-btn" id="closeEditDialog">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form id="editTaskForm">
          <div class="form-group">
            <label for="editTaskTitle">Title</label>
            <input type="text" id="editTaskTitle" class="input" placeholder="Enter task title" required>
          </div>
          <div class="form-group">
            <label for="editTaskDescription">Description</label>
            <textarea id="editTaskDescription" class="textarea" placeholder="Enter task description"></textarea>
          </div>
          <div class="dialog-footer">
            <button type="button" class="btn-secondary" id="cancelEditBtn">Cancel</button>
            <button type="submit" class="btn-primary">Update Task</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('closeEditDialog')?.addEventListener('click', onClose);
  document.getElementById('cancelEditBtn')?.addEventListener('click', onClose);

  const editTaskForm = document.getElementById('editTaskForm') as HTMLFormElement;
  if (editTaskForm) {
    editTaskForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const title = (document.getElementById('editTaskTitle') as HTMLInputElement).value;
      const description = (document.getElementById('editTaskDescription') as HTMLTextAreaElement).value;

      onSubmit({ title, description });
    });
  }
}