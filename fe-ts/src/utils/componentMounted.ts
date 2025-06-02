export const componentMounted = (callback: () => void) => {
    setTimeout(() => {
        callback();
    }, 500);
}