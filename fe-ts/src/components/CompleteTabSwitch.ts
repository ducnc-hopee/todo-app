
export function setupTabSwitching(): void {
  const incompleteTab = document.querySelector<HTMLButtonElement>('.incomplete-tab');
  const completeTab = document.querySelector<HTMLButtonElement>('.complete-tab');
  const incompleteList = document.querySelector<HTMLDivElement>('.incomplete-list');
  const completeList = document.querySelector<HTMLDivElement>('.complete-list');

  if (!incompleteTab || !completeTab || !incompleteList || !completeList) {
    console.warn('Tab elements not found.');
    return;
  }

  incompleteTab.addEventListener('click', () => {
    incompleteTab.classList.add('active');
    completeTab.classList.remove('active');
    incompleteList.style.display = 'block';
    completeList.style.display = 'none';
  });

  completeTab.addEventListener('click', () => {
    completeTab.classList.add('active');
    incompleteTab.classList.remove('active');
    completeList.style.display = 'block';
    incompleteList.style.display = 'none';
  });
}