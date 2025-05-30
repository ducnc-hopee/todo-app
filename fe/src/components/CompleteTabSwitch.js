export function setupTabSwitching() {
  const incompleteTab = document.querySelector('.incomplete-tab');
  const completeTab = document.querySelector('.complete-tab');
  const incompleteList = document.querySelector('.incomplete-list');
  const completeList = document.querySelector('.complete-list');

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