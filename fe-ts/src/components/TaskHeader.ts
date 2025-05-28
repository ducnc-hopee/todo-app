import { componentMounted } from "../utils/componentMounted";
import { AddTaskModal } from "./modals/AddTaskModal";
import { handleAddTask } from "./modals/handlers/taskHandlers";

export function TaskHeader() {
  const taskHeaderContainer = document.getElementById('taskHeaderContainer') as HTMLDivElement;
  let isOpenModal = false;
  let listenerRemoveCb: Function | null = null;
  
  componentMounted(() => {
    listenerRemoveCb = listenerClickBtn();
  })

  const handleOpenAddTaskModal = () => {
     if(listenerRemoveCb) listenerRemoveCb();
    isOpenModal = true;
    renderHTML();
    listenerClickBtn();
  }

  const handlerCloseAddTaskModal = () => {
    if(listenerRemoveCb) listenerRemoveCb();
    isOpenModal = false;
    renderHTML();
    listenerClickBtn();
  }


  const listenerClickBtn = () => {
    const domClick = document.getElementById('addTaskBtn')
    domClick!.addEventListener('click', handleOpenAddTaskModal);

    function removeEventListener() {
      domClick!.removeEventListener('click', handleOpenAddTaskModal);
    }
    return removeEventListener;
  }

  const renderHTML = () => {
    const addTaskModalHTML = AddTaskModal({ onClose: handlerCloseAddTaskModal, open: isOpenModal, onSubmit: handleAddTask });
    taskHeaderContainer.innerHTML = `
    <div class="task-header">
      <h2>My Tasks</h2>
      <button class="add-task-btn" id="addTaskBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        Add Task
      </button>
      ${addTaskModalHTML}
    </div>
  `;
  }
  renderHTML()
}

