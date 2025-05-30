
import './styles/main.css';
import { Header } from './components/header';
import { Tabs } from './components/tabs';
import { initModalEvents } from './utils/modal';
import { createTask } from './utils/create';
import { displayIncomplete } from './utils/displayTask';
import { deleteTask } from "./utils/delete";
import { initTabEvents } from "./utils/displayTask";
import { getTodoById } from "./services/todo";

const app = document.getElementById("app");

if (app){
    app.innerHTML = `
    ${Header()}
    ${Tabs()}
  `;

    createTask();
    displayIncomplete();
    initModalEvents();
    initTabEvents();
    deleteTask();
}
else{
    console.error("App element not found");
}
