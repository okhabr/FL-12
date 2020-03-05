export const startGame = () => {
    let roundCounter = 1;
    let myWins = 0;
    while (roundCounter < 4) {
        const roundResult = startRound();
        if (roundResult) {
            showRoundResult (roundResult.result, roundResult.myTool, roundResult.avengerTool, roundCounter);
            roundCounter++;
            myWins += roundResult.result;
        }
    }
    showGameResult(myWins);
}

const startRound = () => {
    const maxPower = 3;
    const myTool = Math.floor(Math.random() * maxPower);
    const avengerTool = Math.floor(Math.random() * maxPower);
    if (myTool === avengerTool) return null;
    const result = myTool > avengerTool; 
    return {result, myTool, avengerTool};
}

const showRoundResult = (won, myToolIndex, avengerToolIndex, roundNumber) => {
    const result = won ? 'WON' : 'LOST';
    const tools = ['Paper','Scissors','Rock'];
    const message = `Round ${roundNumber}: ${tools[avengerToolIndex]} vs. ${tools[myToolIndex]}. You’ve ${result}!`;
    const current = document.createElement('p');
    current.innerHTML = message;
    document.querySelector('#result').append(current);
}

const showGameResult = (myWins) => {
    const result = myWins > 1;
    const message = result ? `YOU'VE WON` : `YOU'VE LOST`;
    const current = document.createElement('p');
    current.innerHTML = message;
    document.querySelector('#result').append(current);
}
