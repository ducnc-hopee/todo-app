export function AddTaskModal({ onSubmit, onClose }) {
  const addTaskModalContainer = document.getElementById('addTaskModalContainer');
  
  addTaskModalContainer.innerHTML = `
    <div class="dialog-overlay" id="addTaskModal">
      <div class="dialog">
        <div class="dialog-header">
          <h3>Add New Task</h3>
          <button class="close-btn" id="closeAddTaskDialog">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
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
      </div>
    </div>
  `;
  
  document.getElementById('closeAddTaskDialog').addEventListener('click', onClose);
  document.getElementById('cancelAddTaskBtn').addEventListener('click', onClose);
  
  const addTaskForm = document.getElementById('addTaskForm');
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    
    onSubmit({ title, description, isCompleted: false });
  });
}