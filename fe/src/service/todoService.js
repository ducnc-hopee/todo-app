const API_URL = 'http://localhost:8000/api/v1/todo';

export const todoService = {
  // Get all todos
  async getTodos() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.status === 'Success') {
        return data.todos || [];
      } else {
        console.error('Error fetching todos:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },
  
  // Get a specific todo
  async getTodo(todoId) {
    try {
      const response = await fetch(`${API_URL}/${todoId}`);
      const data = await response.json();
      
      if (data.status === 'Success') {
        return data.todo;
      } else {
        console.error('Error fetching todo:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  },
  
  // Create a new todo
  async createTodo(todoData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoData)
      });
      
      const data = await response.json();
      
      if (data.status === 'Success') {
        return data.todo;
      } else {
        console.error('Error creating todo:', data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },
  
  // Update a todo
  async updateTodo(todoId, todoData) {
    try {
      const response = await fetch(`${API_URL}/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoData)
      });
      
      const data = await response.json();
      
      if (data.status === 'Success') {
        return data.todo;
      } else {
        console.error('Error updating todo:', data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },
  
  // Mark todo as complete/incomplete
  async completeTodo(todoId, isCompleted) {
    try {
      const response = await fetch(`${API_URL}/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isCompleted })
      });
      
      const data = await response.json();
      
      if (data.status === 'Success') {
        return data.todo;
      } else {
        console.error('Error updating todo status:', data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  },
  
  // Delete a todo
  async deleteTodo(todoId) {
    try {
      const response = await fetch(`${API_URL}/${todoId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.status === 'Success') {
        return true;
      } else {
        console.error('Error deleting todo:', data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};