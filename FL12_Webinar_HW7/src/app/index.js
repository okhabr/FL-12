// JS modules
import { startGame } from './modules/start';
import { resetGame } from './modules/reset';

// Styles
import '../style/app.scss';
import '../style/utilities.scss';

// Event listeners
document.querySelectorAll('button').forEach((button) => button.addEventListener('click', startGame));
document.querySelector('#reset').addEventListener('click', resetGame);
