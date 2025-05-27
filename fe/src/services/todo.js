const apiUrl = "http://localhost:8000/api/v1/todo";

export const createTodo = async (todoData) => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  return res.json();
};

export const getTodos = async () => {
  const res = await fetch(apiUrl);
  return res.json();
};

export const deleteTodo = async (id) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const getTodoById = async (id) => {
  const res = await fetch(`${apiUrl}/${id}`);
  return await res.json();
};

export const updateTodo = async (id, data) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
