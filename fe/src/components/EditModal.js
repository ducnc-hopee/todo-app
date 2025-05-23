export function EditModal({ onSubmit, onClose }) {
  const editModalContainer = document.getElementById('editModalContainer');
  
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
  
  document.getElementById('closeEditDialog').addEventListener('click', onClose);
  document.getElementById('cancelEditBtn').addEventListener('click', onClose);
  
  const editTaskForm = document.getElementById('editTaskForm');
  editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('editTaskTitle').value;
    const description = document.getElementById('editTaskDescription').value;
    
    onSubmit({ title, description });
  });
}