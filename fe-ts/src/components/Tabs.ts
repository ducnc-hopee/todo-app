import { TABS, TTab, TAB_LABELS } from "../constants/tab";

//type FilterType = TTab;

export function Tabs({ currentFilter, onFilterChange }: { currentFilter: TTab; onFilterChange: (filter: TTab) => void })
{
    const tabsContainer = document.getElementById('tabsContainer') as HTMLDivElement;

    const tabsHTML = Object.entries(TABS).map(([key, value]) => `
    <button class="tab ${currentFilter === value ? 'active' : ''}" data-filter="${value}">
          ${TAB_LABELS[value]}
        </button>
    `).join('');

    tabsContainer.innerHTML = `
      <div class="tabs">
        ${tabsHTML}
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