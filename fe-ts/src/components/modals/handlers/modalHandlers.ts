import { MODAL_TYPES } from "../../../constants/modals";
import { state } from "../../../state/appState";
import { publish } from "../../../utils/customEventPubSub";
import { EVENTS } from "../../../constants/customEvent";
import { EditModal } from "../EditModal";
import { handleUpdateTask } from "./taskHandlers";

export function openAddTaskModal() 
{
    state.isAddModalOpen = true;
    const addTaskModal = document.getElementById(`modal-${MODAL_TYPES.ADD_TASK}`) as HTMLDivElement;
    if (addTaskModal) {
        addTaskModal.classList.add('active');
    }
}

export function closeAddTaskModal() {
    state.isAddModalOpen = false;
    const addTaskModal = document.getElementById(`modal-${MODAL_TYPES.ADD_TASK}`) as HTMLDivElement;
    console.log(addTaskModal);
    
    if (addTaskModal) {
        addTaskModal.classList.remove('active');
    }   
}

export function openEditModal(todoId: string) {
    const todo = state.todos.find((t) => t._id === todoId);
    if (!todo) {
        console.error('Todo not found:', todoId);
        return;
    }

    state.currentTodo = todo;
    state.isEditModalOpen = true;

    const editModalContainer = document.getElementById('editModalContainer');
    if (editModalContainer) {
        editModalContainer.innerHTML = EditModal({
            open: true,
            onClose: closeEditModal,
            onSubmit: handleUpdateTask,
            todo: todo
        });
    }
}

export function closeEditModal() {
    state.isEditModalOpen = false;
    state.currentTodo = null;

    const editModalContainer = document.getElementById('editModalContainer');
    if (editModalContainer) {
        editModalContainer.innerHTML = EditModal({
            open: false,
            onClose: closeEditModal,
            onSubmit: handleUpdateTask,
            todo: null
        });
    }
}

export function openViewModal(todoId: string) {
    const todo = state.todos.find((t) => t._id === todoId);
    if (!todo) return;

    state.currentTodo = todo;
    state.isViewModalOpen = true;

    const viewModal = document.getElementById('viewTaskModal') as HTMLDivElement;
    if (viewModal) {
        const titleElement = viewModal.querySelector('.view-task-title') as HTMLElement;
        const descriptionElement = viewModal.querySelector('.view-task-description') as HTMLElement;
        const statusElement = viewModal.querySelector('.view-task-status') as HTMLElement;

        titleElement.textContent = todo.title;
        descriptionElement.textContent = todo.description || 'No description';
        statusElement.textContent = todo.isCompleted ? 'Completed' : 'Incomplete';
        statusElement.className = `view-task-status ${todo.isCompleted ? 'completed' : 'incomplete'}`;

        viewModal.classList.add('active');
    }
}

export function closeViewModal() {
    state.isViewModalOpen = false;
    state.currentTodo = null;

    const viewModal = document.getElementById('viewTaskModal') as HTMLDivElement;
    if (viewModal) {
        viewModal.classList.remove('active');
    }
}