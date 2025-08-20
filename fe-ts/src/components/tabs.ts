export function Tabs():string{

    return `
    <div class="tabs">
        <button class="tab-btn active" data-status="incomplete"">Incomplete</button>
        <button class="tab-btn" data-status="complete">Complete</button>
    </div> 

    <ul id="taskList" class="task-list"></ul>
    `
;}