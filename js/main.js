// Player and dealer hands
var playerHand = [];
var playerSplitHand = [];
var dealerHand = [];
var playerCurrentscore = 0;
var dealerCurrentscore = 0;
var playerSplitCurrentScore = 0;
var playerMoney = 100;
var moneyPool = 0;
bets();
viewMoney();
// this.htmlE = $('<divx

//TALLYING SCORE (add values in array at all times)
//Player's score
function playerScore(split) {
  if(!split) {
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
  } var playerSplitSum = 0;
    for (var i = 0; i < playerSplitHand.length; i++) {
      playerSplitSum += playerSplitHand[i].value;
    }
      if (playerSplitSum > 21) {
      playerSplitSum -= 10 * aceSplitCounter();
    }
      playerSplitCurrentscore = playerSplitSum;

      //$('#pScore').text(playerCurrentscore);

      if(playerSplitCurrentscore >= 21) {
        result(split);
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
  if(moneyPool >= 1) {
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
$('#hit').click(function() {
  playerHit();
});
$('#stay').click(result);
$('.chips').off();
$('#deal').off();
} else if(playerMoney > 1 && moneyPool === 0) {
$('#results').text('Place your bet!').fadeIn('slow').fadeOut(1000);
} else {
$('#results').text('Not enough money...').fadeIn('slow').fadeOut(1000);
}
};

//Player Stays scenario
function result() {
  playerStay();
if((playerCurrentscore === 21 && dealerCurrentscore === 21) || (playerCurrentscore === dealerCurrentscore)) {
  $('#results').text('Push!').fadeIn('slow').fadeOut(4000);
  playerMoney += moneyPool;
  } else if (playerCurrentscore > 21) {
  $('#results').text('Bust...').fadeIn('slow').fadeOut(4000);
  } else if (playerCurrentscore === 21) {
  $('#results').text('You got Blackjack!!!').fadeIn('slow').fadeOut(4000);
  playerMoney += (moneyPool * 2) * 1.5
  } else if (dealerCurrentscore === 21) {
  $('#results').text('House Blackjack...').fadeIn('slow').fadeOut(4000);
  } else if (dealerCurrentscore > 21) {
  $('#results').text('Dealer bust!').fadeIn('slow').fadeOut(4000);
  playerMoney += (moneyPool * 2);
  } else if (dealerCurrentscore > playerCurrentscore) {
  $('#results').text('You lost...').fadeIn('slow').fadeOut(4000);
  } else {
  $('#results').text('You won!').fadeIn('slow').fadeOut(4000);
  playerMoney += (moneyPool * 2);
  }
  moneyPool = 0;
  viewMoney();
  bets();
  $('#hit').off();
  $('#stay').off();
  $('#deal').click(startGame);
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

//User Actions/////////////////
//Hit
function playerHit(split) {
  if(!split) {
  if(playerCurrentscore < 21) {
    playerHand.push(deck.pop());
    viewPlayerHand();
  }
    playerScore();
}
 if(playerSplitCurrentScore < 21) {
   playerSplitHand.push(deck.pop());
   //viewPlayerSplitHand
 }
}
;

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

//Split
function playerSplit() {
  if(playerHand[0].value === playerHand[1].value) {
    playerSplit.push(playerHand.pop());
  }
}

//Render display/////////////
//PlayerHand
function viewPlayerHand() {
  $('#player').empty();
  $.each(playerHand, function(index,value) {
    $('#player').append('<div class="newP ' + value.className + '"></div>');
    $('.newP').hide();
    $('.newP').slideDown();
  }
  )};

//DealerHand
function viewDealerHand() {
  $('#dealer').empty();
  $.each(dealerHand, function(index,value) {
    $('#dealer').append('<div class="new ' + value.className + '"></div>');
    $('.new').hide()
    $('.new').slideDown()
  }
  )};

//Money
function viewMoney() {
$('#pmoney').text('$' + playerMoney);
$('#pbet').text('$' + moneyPool);
};
//Money Bets/////////////////
function betOne() {
  if(playerMoney >= 1) {
    playerMoney -= 1;
    moneyPool += 1;
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}


function betFive() {
  if(playerMoney >= 5) {
    playerMoney -= 5;
    moneyPool += 5;
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}

function betTfive() {
  if(playerMoney >= 25) {
    playerMoney -= 25;
    moneyPool += 25;
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}

function betOneHund() {
  if(playerMoney >= 100) {
    playerMoney -= 100;
    moneyPool += 100;
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}

function betFhund() {
  if(playerMoney >= 500) {
    playerMoney -= 500;
    moneyPool += 500;
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}
//Click Events////////
//Deal click event
$('#deal').click(startGame);

//Chip bets
function bets() {
//Bet 1
$('#onechip').click(betOne);

//Bet 5
$('#fivechip').click(betFive);

//Bet 25
$('#tfivechip').click(betTfive);

//Bet 100
$('#hundchip').click(betOneHund);

//Bet 500
$('#fhundchip').click(betFhund);
};



