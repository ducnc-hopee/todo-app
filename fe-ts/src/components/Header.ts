export function Header()
{
    const headerContainer = document.getElementById('headerContainer') as HTMLDivElement;

    headerContainer.innerHTML = `
        <header>
            <h1>Todo App</h1>
        </header>
    `;
}