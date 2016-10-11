// Player and dealer hands
var playerHand = [];
var dealerHand = [];
var playerCurrentscore = 0;
var dealerCurrentscore = 0;
var playerMoney = 0;
var moneyPool = 0;

// this.htmlE = $('<divx

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

      $('#pScore').text(playerCurrentscore);

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
      dealerSum -= 10 * aceCounterDealer();
    }
      dealerCurrentscore = dealerSum;
};

//Creating the deck
var deck =[];

var Card = function(suits,face,code,value,className) {
    this.suits = suits;
    this.face = face;
    this.code = code;
    this.value = value;
    this.className = className;
}

function createDeck() {
    for(var i=0; i < 52; i++) {
    var suits = '';
    var face = String(i % 13);
    var value = i % 13;
    var code = i % 13;


    if(i <= 13) {
      suits = 'hearts';
    } else if(i > 13 && i <= 26) {
      suits = 'spades';
    } else if (i >26 && i <= 39) {
      suits = 'diamonds';
    } else if (i >39 && i <=52) {
      suits = 'clubs';
    }

    if (code === 0) {
        face = 'K';
        value = 10
      } else if (code === 11) {
        face = 'J';
        value = 10;
      } else if (code === 12) {
        face = 'Q';
        value = 10;
      } else if (code === 1) {
        face = 'A';
        value = 11;
      }

    if (value < 10) {
      className = 'card ' + suits[0] + '0' + value;
    } else {
      className = 'card ' + suits[0] + face;
    }

    var card = new Card(suits,face,code,value,className);

    deck.push(card);
  }
}

//Starting the game
function startGame() {
deck = [];
createDeck();
deck = _.shuffle(deck);
// Player and dealer hands
playerHand = [];
dealerHand = [];
playerCurrentscore = 0;
dealerCurrentscore = 0;
playerHand.push(deck.pop(),deck.pop());
dealerHand.push(deck.pop(),deck.pop());
$('#dScore').text('?');
$('#dealer').empty();
$('#dealer').append('<div class="card back-blue"></div>');
$('#dealer').append('<div class="' + dealerHand[1].className + '"></div>');
playerScore();
dealerScore();
viewPlayerHand();
$('#hit').click(playerHit);
$('#stay').click(result);
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
  $('#hit').off();
  $('#stay').off();
};

//Player Ace Logic
function aceCounter() {
var numAce = 0;
for(var i = 0; i < playerHand.length; i++) {
if(playerHand[i].face === "A") {
numAce += 1;
}
}
return numAce;
}

//Dealer Ace Logic
function aceCounterDealer() {
  var numAceDealer = 0;
  for(var i = 0; i < dealerHand.length; i++) {
    if(dealerHand[i].face === "A") {
      numAceDealer += 1;
    }
  }
  return numAceDealer;
}

//Hit
function playerHit() {

  if(playerCurrentscore < 21) {
    playerHand.push(deck.pop());
    viewPlayerHand();
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
  viewPlayerHand();
  viewDealerHand();
  $('#dScore').text(dealerCurrentscore);
}

//Render display/////////////
//PlayerHand
function viewPlayerHand() {
  $('#player').empty();
  $.each(playerHand, function(index,value) {
    $('#player').append('<div class="' + value.className + '"></div>');
  }
  )};

//DealerHand
function viewDealerHand() {
  $('#dealer').empty();
  $.each(dealerHand, function(index,value) {
    $('#dealer').append('<div class="' + value.className + '"></div>');
  }
  )};

//Stay
$('#deal').click(startGame);

//Hit
$('#hit').click(playerHit);

//Stay
$('#stay').click(result);

//Money/////////////////
function bet25() {
  playerMoney -= 25;
  moneyPool += 25;
}

