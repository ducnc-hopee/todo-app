export function renderBody() {
  return `
  <div class="tab-container-wrapper">
    <div class="task-tabs">
      <button class="incomplete-tab active">Incomplete</button>
      <button class="complete-tab">Complete</button>
    </div>

    <div class="task-list incomplete-list" style="display: block;"></div>   
    <div class="task-list complete-list" style="display: none;"></div>
  `;
}