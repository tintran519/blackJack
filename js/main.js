// Player and dealer hands
var playerHand = [];
var dealerHand = [];
var playerCurrentscore = 0;
var dealerCurrentscore = 0;

//TALLYING SCORE (add values in array at all times)
//Player's score
function playerScore() {
    var playerSum = 0;
    for (var i = 0; i < playerHand.length; i++) {
      playerSum += playerHand[i].value;
    }
      if (playerSum > 21) {
      playerSum -= 10 * aceCounter();
    }
      playerCurrentscore = playerSum;

      if(playerCurrentscore >= 21) {
        result();
    }
};

//Dealer's score
function dealerScore() {
    var dealerSum = 0;
    for (var i = 0; i < dealerHand.length; i++) {
      dealerSum += dealerHand[i].value;
    }
      if (dealerSum > 21) {
      dealerSum -= 10 * aceCounter();
    }
      dealerCurrentscore = dealerSum;
};

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

deck = _.shuffle(deck);


//Starting the game
function startGame() {
playerHand.push(deck.pop(),deck.pop());
dealerHand.push(deck.pop(),deck.pop());
playerScore();
dealerScore();
};

//Player Stays scenario
function result() {
  playerStay();
if((playerCurrentscore === 21 && dealerCurrentscore === 21) || (playerCurrentscore === dealerCurrentscore)) {
  alert("Tie Game!");
  } else if (playerCurrentscore > 21) {
    alert("Bust...");
  } else if (playerCurrentscore === 21) {
  alert("You got Blackjack!");
  } else if (dealerCurrentscore === 21) {
  alert("House Blackjack...");
  } else if (dealerCurrentscore > 21) {
  alert("Dealer bust!");
  } else if (dealerCurrentscore > playerCurrentscore) {
  alert("You lost...");
  } else {
  alert("You won!");
  }
};

//Ace Logic
function aceCounter() {
var numAce = 0;
for(var i = 0; i < playerHand.length; i++) {
if(playerHand[i].face === "Ace") {
numAce += 1;
}
}
return numAce;
}


//Hit
function playerHit() {
  //Win & Lose logic

  if(playerCurrentscore >= 21) {
    result();
  } else{
    playerHand.push(deck.pop());
  }
    playerScore();
};

//Stay
function playerStay() {
  //Dealer's actions
  while(dealerCurrentscore < 17) {
    dealerHand.push(deck.pop());
    dealerScore();
  }
}

//Fix double bust...


