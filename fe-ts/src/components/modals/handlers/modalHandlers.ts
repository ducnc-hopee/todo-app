import { state } from "../../../state/appState";

export function openAddTaskModal() 
{
    state.isAddModalOpen = true;
    const addTaskModal = document.getElementById('addTaskModal') as HTMLDivElement;
    if (addTaskModal) {
        addTaskModal.classList.add('active');
        (document.getElementById('addTaskForm') as HTMLFormElement).reset();
    }
}

export function closeAddTaskModal() {
    state.isAddModalOpen = false;
    const addTaskModal = document.getElementById('addTaskModal') as HTMLDivElement;
    if (addTaskModal) {
        addTaskModal.classList.remove('active');
    }   
}

export function openEditModal(todoId: string) {
    const todo = state.todos.find((t) => t._id === todoId);
    if (!todo) return;

    state.currentTodo = todo;
    state.isEditModalOpen = true;

    const editModal = document.getElementById('editModal') as HTMLDivElement;
    if (editModal) {
        const titleInput = editModal.querySelector('#editTaskTitle') as HTMLInputElement;
        const descriptionInput = editModal.querySelector('#editTaskDescription') as HTMLTextAreaElement;

        titleInput.value = todo.title;
        descriptionInput.value = todo.description || '';

        editModal.classList.add('active');
    }
}

export function closeEditModal() {
    state.isEditModalOpen = false;
    state.currentTodo = null;

    const editModal = document.getElementById('editModal') as HTMLDivElement;
    if (editModal) {
        editModal.classList.remove('active');
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