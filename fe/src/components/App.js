import { Header } from './Header.js';
import { TaskHeader } from './TaskHeader.js';
import { Tabs } from './Tabs.js';
import { TaskList } from './TaskList.js';
import { AddTaskModal } from './AddTaskModal.js';
import { EditModal } from './EditModal.js';
import { ViewTaskModal } from './ViewTaskModal.js';
import { todoService } from '../service/todoService.js';


let state = {
    todos: [],
    //currentFilter: localStorage.getItem('selectedTab') || 'all',
    currentFilter: window.location.hash.replace('#', '') || 'all',
    currentTodoId: null,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isViewModalOpen: false,
    currentTodo: null
  };


export function renderApp() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
      <div id="headerContainer"></div>
      <main>
        <div id="taskHeaderContainer"></div>
        <div id="tabsContainer"></div>
        <div id="todoListContainer"></div>
      </main>
      <div id="addTaskModalContainer"></div>
      <div id="editModalContainer"></div>
      <div id="viewTaskModalContainer"></div>
      <div id="taskOptionsMenu" class="dropdown-menu">
        <ul>
          <li data-action="view">View</li>
          <li data-action="edit">Edit</li>
          <li data-action="delete">Delete</li>
        </ul>
      </div>
    `;

    Header();
    TaskHeader({
      onAddClick: openAddTaskModal
    });
    Tabs({
      currentFilter: state.currentFilter,
      onFilterChange: changeFilter
    });

    fetchTodos();

    AddTaskModal({
        onSubmit: handleAddTask,
        onClose: closeAddTaskModal
    });

    EditModal({
        onSubmit: handleUpdateTask,
        onClose: closeEditModal
    });

    ViewTaskModal({
        onClose: closeViewModal
      });

    document.addEventListener('click', (e) => {
        const taskOptionsMenu = document.getElementById('taskOptionsMenu');
        if (taskOptionsMenu && !taskOptionsMenu.contains(e.target) && 
            !e.target.classList.contains('todo-menu-btn')) {
          taskOptionsMenu.style.display = 'none';
        }
    });
}

async function fetchTodos() {
    try {
      const todos = await todoService.getTodos();
      state.todos = todos;
      renderTodoList();
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
}

function renderTodoList() {
    TaskList({
      todos: state.todos,
      filter: state.currentFilter,
      onToggleComplete: toggleTodoComplete,
      onShowOptions: showTodoOptions
    });
}

function changeFilter(filter) {
    state.currentFilter = filter;
    //localStorage.setItem('selectedTab', filter);
    location.hash = `#${filter}`;
    renderTodoList();
}



async function toggleTodoComplete(todoId, isCompleted) {
    try {
      const updatedTodo = await todoService.completeTodo(todoId, isCompleted);
      
      // Update local state
      state.todos = state.todos.map(todo => 
        todo._id === todoId ? { ...todo, isCompleted } : todo
      );
      renderTodoList();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
}


function showTodoOptions(event, todoId) {
    event.stopPropagation();
    
    const taskOptionsMenu = document.getElementById('taskOptionsMenu');
    
    const rect = event.target.getBoundingClientRect();
    taskOptionsMenu.style.top = `${rect.bottom + window.scrollY}px`;
    taskOptionsMenu.style.left = `${rect.left + window.scrollX - 100}px`;
    taskOptionsMenu.style.display = 'block';
    
    state.currentTodoId = todoId;
    
    const viewOption = taskOptionsMenu.querySelector('[data-action="view"]');
    const editOption = taskOptionsMenu.querySelector('[data-action="edit"]');
    const deleteOption = taskOptionsMenu.querySelector('[data-action="delete"]');
    
    viewOption.onclick = () => {
      taskOptionsMenu.style.display = 'none';
      openViewModal(todoId);
    };
    
    editOption.onclick = () => {
      taskOptionsMenu.style.display = 'none';
      openEditModal(todoId);
    };
    
    deleteOption.onclick = () => {
      taskOptionsMenu.style.display = 'none';
      deleteTodo(todoId);
    };
  }
  
  function openAddTaskModal() {
    state.isAddModalOpen = true;
    const addTaskModal = document.getElementById('addTaskModal');
    if (addTaskModal) {
      addTaskModal.classList.add('active');
      document.getElementById('addTaskForm').reset();
    }
  }
  

  function closeAddTaskModal() {
    state.isAddModalOpen = false;
    const addTaskModal = document.getElementById('addTaskModal');
    if (addTaskModal) {
      addTaskModal.classList.remove('active');
    }
  }
  
  function openEditModal(todoId) {
    const todo = state.todos.find(t => t._id === todoId);
    if (!todo) return;
    
    state.currentTodo = todo;
    state.isEditModalOpen = true;
    
    const editModal = document.getElementById('editModal');
    if (editModal) {
      const titleInput = editModal.querySelector('#editTaskTitle');
      const descriptionInput = editModal.querySelector('#editTaskDescription');
      
      titleInput.value = todo.title;
      descriptionInput.value = todo.description || '';
      
      editModal.classList.add('active');
    }
  }
  
  function closeEditModal() {
    state.isEditModalOpen = false;
    state.currentTodo = null;
    
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.classList.remove('active');
    }
  }
  
  function openViewModal(todoId) {
    const todo = state.todos.find(t => t._id === todoId);
    if (!todo) return;
    
    state.currentTodo = todo;
    state.isViewModalOpen = true;
    
    const viewModal = document.getElementById('viewTaskModal');
    if (viewModal) {
      const titleElement = viewModal.querySelector('.view-task-title');
      const descriptionElement = viewModal.querySelector('.view-task-description');
      const statusElement = viewModal.querySelector('.view-task-status');
      
      titleElement.textContent = todo.title;
      descriptionElement.textContent = todo.description || 'No description';
      statusElement.textContent = todo.isCompleted ? 'Completed' : 'Incomplete';
      statusElement.className = `view-task-status ${todo.isCompleted ? 'completed' : 'incomplete'}`;
      
      viewModal.classList.add('active');
    }
  }
  
  function closeViewModal() {
    state.isViewModalOpen = false;
    state.currentTodo = null;
    
    const viewModal = document.getElementById('viewTaskModal');
    if (viewModal) {
      viewModal.classList.remove('active');
    }
  }
  
  async function handleAddTask(formData) {
    try {
      const newTodo = await todoService.createTodo(formData);
      
      state.todos.unshift(newTodo);
      renderTodoList();
      closeAddTaskModal();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
  
  async function handleUpdateTask(formData) {
    if (!state.currentTodo) return;
    
    try {
      const updatedTodo = await todoService.updateTodo(state.currentTodo._id, formData);
      
      state.todos = state.todos.map(t => 
        t._id === state.currentTodo._id ? { ...t, ...formData } : t
      );
      renderTodoList();
      closeEditModal();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
  
async function deleteTodo(todoId) 
{
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try
    {
      await todoService.deleteTodo(todoId);
      state.todos = state.todos.filter(todo => todo._id !== todoId);
      renderTodoList();
    } 
    catch (error) 
    {
      console.error('Error deleting todo:', error);
    }
}