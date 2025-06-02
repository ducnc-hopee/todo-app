export function TaskHeader({ onAddClick }) {
  const taskHeaderContainer = document.getElementById('taskHeaderContainer');
  
  taskHeaderContainer.innerHTML = `
    <div class="task-header">
      <h2>My Tasks</h2>
      <button class="add-task-btn" id="addTaskBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        Add Task
      </button>
    </div>
  `;

  document.getElementById('addTaskBtn').addEventListener('click', onAddClick);
}