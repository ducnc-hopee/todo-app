import { TTab } from "../constants/tab";

//type FilterType = TTab;

export function Tabs({ currentFilter, onFilterChange }: { currentFilter: TTab; onFilterChange: (filter: TTab) => void })
{
    const tabsContainer = document.getElementById('tabsContainer') as HTMLDivElement;

    tabsContainer.innerHTML = `
    <div class="tabs">
      <button class="tab ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
      <button class="tab ${currentFilter === 'incomplete' ? 'active' : ''}" data-filter="incomplete">Incomplete</button>
      <button class="tab ${currentFilter === 'complete' ? 'active' : ''}" data-filter="complete">Complete</button>
    </div>
  `;

  const tabs = tabsContainer.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>;
  tabs.forEach((tab: HTMLButtonElement) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t: HTMLButtonElement) => t.classList.remove('active'));
      tab.classList.add('active');
      const selectedFilter = tab.dataset.filter as TTab;

      // localStorage.setItem('selectedTab', selectedFilter);

      window.location.hash = `#${selectedFilter}`;

      onFilterChange(selectedFilter);
    });
  });
}