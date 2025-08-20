export function taskContent(task){

    return`
        <div class="task-content">
            <h3 class="task-title">${task.title}</h3>
            <p class="task-desc">${task.description}</p>
        </div>`
}


export function taskOptionsModal(task){
    return `
        <div class="task-options-modal modal hidden">
            <button class="view-btn" data-id="${task._id}">View Details</button>
            <button class="edit-btn" data-id="${task._id}">Edit</button>
            <button class="delete-btn" data-id="${task._id}">Delete</button>
        </div>
    `;
}