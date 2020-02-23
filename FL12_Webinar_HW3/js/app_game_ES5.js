//Task 1 ES5
function Deck (){
    //deck initialization
    this.cards = Deck._createStarterDeck();
    this.shuffle();
}
Object.defineProperties(Deck.prototype, {
    count: {
        get() {
          return this.cards.length;
        }
    }
});
//rearranges cards in the deck randomly
Deck.prototype.shuffle = function() {
    for (let i = 0; i < this.count; i++) {
        let temporaryContainer = this.cards[i];
        let randomIndex = Math.floor(Math.random()*this.count);
        this.cards[i] = this.cards[randomIndex];
        this.cards[randomIndex] = temporaryContainer;
    }
}
//removes the last n cards from the deck and returns them
Deck.prototype.draw = function(n = 1) {
    let result = this.cards.splice(this.count-n,n);
    if (n===1) {
        return result[0];
    }
    return result;
}
//prepares 52 cards to start the game
Deck._createStarterDeck = function() {
    let starterDeck = [];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    suits.forEach( suit => {
        ranks.forEach ( rank => {
            let card = new Card(suit, rank);
            starterDeck.push(card);
        })
    })
    return starterDeck;
}

function Card (suit, rank) {
        this.suit = suit;
        this.rank = rank;
}
Object.defineProperties(Card.prototype, {
    isFaceCard: {
        get() {
            return (this.rank == 1 || this.rank > 10) ? true : false;
        }
    }
});

Card.prototype.toString = function () {
    let numberRank = this.rank;
    let readbleRank;
    switch (numberRank) {
        case 1:
            readbleRank = 'Ace';
            break;
        case 11:
            readbleRank = 'Jack';
            break;
        case 12:
            readbleRank = 'Queen';
            break;
        case 13:
            readbleRank = 'King';
            break;
        default:
            readbleRank = numberRank;
    }
    let readbleSuit = this.suit.charAt(0).toUpperCase() + this.suit.slice(1); 
    return `${readbleRank} of ${readbleSuit}`;
}
Card.Compare = function (cardOne, cardTwo) {
    if (cardOne.rank > cardTwo.rank) {
        return 0;
    } else if (cardOne.rank < cardTwo.rank){
        return 1
    } else {
        return 'none';
    }
}

function Player (name) {
    let _wins = 0;
    this.name = name;
    this.deck = new Deck();
    this.addWins = function () { 
        _wins++; 
    };
    this.wins = function () { 
        return _wins;
    };
}

Player.Play = function (playerOne, playerTwo) {
    let moveCount = 0;
    //While there is at least one card in the deck of both players
    while (playerOne.deck.count && playerTwo.deck.count) {
        //Players both take a card from their deck
        let playerOneCard =  playerOne.deck.draw();
        let playerTwoCard =  playerTwo.deck.draw();

        //Compare cards
        let winnerNumber = Card.Compare(playerOneCard, playerTwoCard);
        if (winnerNumber !== 'none') {
            arguments[winnerNumber].addWins();
        } 
            moveCount++;
    }

    //If there was at least one move
    if (moveCount) {
        //If number of wins is the same
        if (playerOne.wins() === playerTwo.wins()) {
            console.info(`You both win :)`);
        } else {
            let winner = playerOne.wins() > playerTwo.wins() ? playerOne : playerTwo;
            let loser = playerOne.wins() < playerTwo.wins() ? playerOne : playerTwo;
            console.info(`${winner.name} wins ${winner.wins()} to ${loser.wins()}`) ;
        }
    } else {
        console.error('Sorry, you can not play :(');
    }
}

// let player1 = new Player('Oksi');
// let player2 = new Player('Oleh');