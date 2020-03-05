export const resetGame = () => {
    const resultContainer = document.querySelector('#result');
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }
}
