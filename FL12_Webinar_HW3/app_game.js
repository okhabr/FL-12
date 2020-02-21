//Task 1
class Deck {
    //deck initialization
    cards = Deck._createStarterDeck();
    get count() {
        return this.cards.length;
    }
    //rearranges cards in the deck randomly
    shuffle() {
        for (let i = 0; i < this.count; i++) {
            let temporaryContainer = this.cards[i];
            let randomIndex = Math.floor(Math.random()*this.count);
            this.cards[i] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryContainer;
        }
    }
    //removes the last n cards from the deck and returns them
    draw (n = 1) {
        let result = this.cards.splice(this.count-n,n);
        if (n===1) {
            return result[0];
        }
        return result;
    }

    //prepares 52 cards to start the game
    static _createStarterDeck() {
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
}

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    get isFaceCard() {
	    return (this.rank == 1 || this.rank > 10) ? true : false;
    }
    toString() {
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
    static Compare (cardOne, cardTwo) {
        if (cardOne.rank > cardTwo.rank) {
            return 0;
        } else if (cardOne.rank < cardTwo.rank){
            return 1
        } else {
            return 'none';
        }
    }
}

class Player {
    _wins = 0;
    constructor(name,deck) {
        this.name = name;
        this.deck = deck;
    }
    get wins () {
        return this._wins;
    }
    addWins() {
        this._wins++;
    }
    static Play (playerOne, playerTwo){
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
            let winner = playerOne.wins > playerTwo.wins ? playerOne : playerTwo;
            let loser = playerOne.wins < playerTwo.wins ? playerOne : playerTwo;
            console.info(`${winner.name} wins ${winner.wins} to ${loser.wins}`) ;
        } else {
            console.error('Sorry, you can not play :(');
        }
    }
}



let deck1 = new Deck();
let deck2 = new Deck();
deck1.shuffle();
deck2.shuffle();

let player1 = new Player('Oksi', deck1);
let player2 = new Player('Oleh', deck2);