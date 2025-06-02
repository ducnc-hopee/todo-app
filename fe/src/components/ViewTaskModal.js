export function ViewTaskModal({ onClose }) {
  const viewTaskModalContainer = document.getElementById('viewTaskModalContainer');
  
  viewTaskModalContainer.innerHTML = `
    <div class="dialog-overlay" id="viewTaskModal">
      <div class="dialog">
        <div class="dialog-header">
          <h3>Task Details</h3>
          <button class="close-btn" id="closeViewDialog">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="view-task-content">
          <div class="view-task-title-container">
            <h4>Title</h4>
            <p class="view-task-title"></p>
          </div>
          <div class="view-task-description-container">
            <h4>Description</h4>
            <p class="view-task-description"></p>
          </div>
          <div class="view-task-status-container">
            <h4>Status</h4>
            <p class="view-task-status"></p>
          </div>
        </div>
        <div class="dialog-footer">
          <button type="button" class="btn-primary" id="closeViewBtn">Close</button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('closeViewDialog').addEventListener('click', onClose);
  document.getElementById('closeViewBtn').addEventListener('click', onClose);
}