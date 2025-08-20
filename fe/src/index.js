import { zeroPad } from "./utils/number";
import './styles/main.css';
import { header } from './components/header';
import { tabs } from './components/tabs';
import { initModalEvents, initViewEvents } from './utils/modal';
import { createTask } from './utils/create';
import { displayIncomplete } from './utils/displayTask';
import { deleteTask } from "./utils/delete";
import { initTabEvents } from "./utils/displayTask";



const app = document.getElementById("app");

if (app){
    app.innerHTML = `
    ${header()}
    ${tabs()}
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
