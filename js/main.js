// Player and dealer hands
// var playerHand = [];
// var dealerHand = [];


//Starting the game
//function startGame() {
//    _.shuffle(deck);
//    playerHand.push(draw,draw);
//    dealerHand.push(draw,draw);
// }

//TALLYING SCORE (add values in array at all times)
// function playerScore() {
//   return card1 + card2;
// }

//DEALING
//var draw = deck.pop()
//function Hand() {
//     this.card1 = draw;
//     this.card2 = draw;
//     this.currentScore = function(){
//       return this.card1 + this.card2;
//     }
// }

//Creating the deck
var deck =[];

for(var i=0; i < 52; i++) {
var suits = '';
var face = String(i % 13);
var value = i % 13;
var code = i % 13;

var Card = function(suits,face,code,value) {
    this.suits = suits;
    this.face = face;
    this.code = code;
    this.value = value;
}

if(i <= 13) {
  suits = 'hearts';
} else if(i > 13 && i <= 26) {
  suits = 'spades';
} else if (i >26 && i <= 39) {
  suits = 'diamonds';
} else if (i >39 && i <=52) {
  suits = 'clover';
}

if (code === 0) {
    face = 'King';
    value = 10
  } else if (code === 11) {
    face = 'Jack';
    value = 10;
  } else if (code === 12) {
    face = 'Queen';
    value = 10;
  } else if (code === 1) {
    face = 'Ace';
    value = 11;
  }

var card = new Card(suits,face,code,value);

deck.push(card);
}
