export function Header():string
{
    return `
    <div class="to-do">
        <h1>Todo App</h1>
        <div class="desc">
            <h2>My Tasks</h2>
            <button id="openModalBtn" class="add-task-btn"><i class="fa-solid fa-plus"></i>&nbsp Add Task</button>
        </div>
    </div>
    <div id="modalOverlay" class="modal-overlay hidden"> </div>
        <div id="addTaskModal" class="modal hidden">
            <div class="heading">
                <div class="heading-des">
                    <h3>Create New Task</h3>
                    <p>Add a new task to your todo list.</p>
                </div>
                <button class="close-btn">&times;</button>
            </div>
            <div class="des">
                <h4>Title</h4>
                <input class="task-title" placeholder="Task title" maxLength="100" required></input>
                <h4>Description</h4>
                <textarea class="task-des" placeholder="Task description" maxLength="500"></textarea>
                <div class="option-btns">
                    <button class="close-btn">Cancel</button>
                    <button class="create-btn">Create Tasks</button>
                </div>
            </div>
        </div>
    </div>
    `;
}