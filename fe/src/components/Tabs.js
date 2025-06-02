export function Tabs({ currentFilter, onFilterChange }) {
  const tabsContainer = document.getElementById('tabsContainer');
  
  tabsContainer.innerHTML = `
    <div class="tabs">
      <button class="tab ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
      <button class="tab ${currentFilter === 'incomplete' ? 'active' : ''}" data-filter="incomplete">Incomplete</button>
      <button class="tab ${currentFilter === 'complete' ? 'active' : ''}" data-filter="complete">Complete</button>
    </div>
  `;
  
  const tabs = tabsContainer.querySelectorAll('.tab');
  tabs.forEach(tab => 
  {
    tab.addEventListener('click', () => 
    {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const selectedFilter = tab.dataset.filter;

      // localStorage.setItem('selectedTab', selectedFilter);

      window.location.hash = `#${selectedFilter}`;

      onFilterChange(selectedFilter)
    });
  });
}