const STARTGAME = confirm(`Do you want to play a game?`);

if(!STARTGAME){
    alert(`You did not become a billionaire, but could have`);
} else {
    let newRound;
    let playAgain;
        do {
            //New game
            const minPocketNumber = 0;
            let maxPocketNumber = 8;
            const INCEREASEPOCKET = 4;
            let totalUserAmount = 0;
            let maxPrize = 100;
            const INCREASEPRIZE = 2;
            let currentPrize;
            const DECREASEPRIZE = 2;
            let randomPocket;
            let userPocket;
            let maxAttempts = 3;
            let leftAttempts;
            let inputError;
            let guessed = false;
            
            do {
                //New Round
                guessed = false;
                //Generate random pocket
                randomPocket = Math.floor(Math.random() * (maxPocketNumber - minPocketNumber)) + minPocketNumber;
                console.log(randomPocket);
                //Update attempts
                leftAttempts = maxAttempts;
                //Update prize 2x
                currentPrize = maxPrize;
                //Ask user 3 times for a guess
                for (let i = 0; i < maxAttempts; i++){
                    userPocket = prompt(`Choose a roulette pocket number from ${minPocketNumber} to ${maxPocketNumber}
Attempts left: ${leftAttempts}
Total prize: ${totalUserAmount}$
Possible prize on current attempt: ${currentPrize}$`);
                    inputError = !!userPocket;
                    userPocket *= 1;
                    if(userPocket!==randomPocket || !inputError){
                        currentPrize /= DECREASEPRIZE;
                        newRound = false;
                    } else {
                        newRound = confirm(`Congratulation, you won! Your prize is: ${currentPrize}$.\n
Do you want to continue?`);
                        totalUserAmount += currentPrize;
                        maxPrize *= INCREASEPRIZE;
                        maxPocketNumber += INCEREASEPOCKET;
                        guessed = true;
                        break; 
                    }
                    leftAttempts--;
                }
                if(!leftAttempts && !guessed){
                    totalUserAmount = 0;
                }
        } while(newRound)
        alert(`Thank you for your participation. Your prize is: ${totalUserAmount}$`)
        playAgain = confirm(`Would you like to play again?`);
    } while(playAgain)
}    


