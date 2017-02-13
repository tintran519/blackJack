// Player and dealer hands
var playerHand = [];
var playerSplitHand = [];
var dealerHand = [];
var playerCurrentscore = 0;
var dealerCurrentscore = 0;
var playerSplitCurrentScore = 0;
var playerMoney = 100;
var moneyPool = 0;
var splitMoneyPool = 0;
var insurancePool = 0;
flipChips();
bets();
viewMoney();

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

  if(playerCurrentscore >= 21 && playerSplitHand.length === 0) {
    result();
  } else if(playerCurrentscore >=21 && playerSplitHand.length > 0) {
    $('#hit').off();
    $('#stay').off();
    $('#hit').click(splitHit);
    $('#stay').click(resultSplit);
    if(playerCurrentscore === 21) {
    $('#results').hide().text('Hand 1 got Blackjack!').fadeIn('slow').fadeOut(800);
  } else if(playerCurrentscore > 21) {
    $('#results').hide().text('Hand 1 bust...').fadeIn('slow').fadeOut(800);
  }
    playerSplitScore();
}
}

  function playerSplitScore() {
    var playerSplitSum = 0;
    for (var i = 0; i < playerSplitHand.length; i++) {
      playerSplitSum += playerSplitHand[i].value;
    }
      if (playerSplitSum > 21) {
      playerSplitSum -= 10 * aceCounterSplit();
    }
      playerSplitCurrentScore = playerSplitSum;

      $('#sScore').text(playerSplitCurrentScore);

      if(playerSplitCurrentScore >= 21) {
        resultSplit();
    }
  };

  function doubleScore() {
    var playerSum = 0;
    for (var i = 0; i < playerHand.length; i++) {
      playerSum += playerHand[i].value;
    }
      if (playerSum > 21) {
      playerSum -= 10 * aceCounter();
    }
      playerCurrentscore = playerSum;

      $('#pScore').text(playerCurrentscore);

      if(playerSplitHand.length === 0) {
      result();
  }   else if(playerSplitHand.length > 0 && playerCurrentscore >= 21) {
      $('#double').off();
      $('#double').click(doubleDownSplit);
        if(playerCurrentscore > 21) {
      $('#results').hide().text('Bust...').fadeIn('slow').fadeOut(800);
     } else if(playerCurrentscore === 21){
      $('#results').hide().text('Blackjack!').fadeIn('slow').fadeOut(800);
    }
  }
}

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
    $('#results').empty();
    $('#dealAudio').get(0).play();
    deck = [];
    createDeck();
    deck = _.shuffle(deck);
    // Player and dealer hands
    playerHand = [];
    dealerHand = [];
    playerSplitHand = [];
    playerCurrentscore = 0;
    dealerCurrentscore = 0;
    playerHand.push(deck.pop(),deck.pop());
    dealerHand.push(deck.pop(),deck.pop());
    $('#sScore').text('');
    $('#dScore').text('?');
    $('#dealer').empty();
    $('#dealer').append('<div class="card back-blue"></div>');
    $('#dealer').append('<div class="' + dealerHand[1].className + '"></div>');
    playerScore();
    dealerScore();
    viewPlayerHand();
    viewSplit();
    $('#hit').click(playerHit);
    $('#double').click(doubleDown);
    $('#split').click(playerSplit);
    $('#insurance').click(insurance);
    $('#stay').click(result);
    $('.chips').off();
    $('#deal').off();
  } else {
    $('#results').text('Not enough money...').fadeIn('slow').fadeOut(800);
  }
};

//Player Stays scenario
function result() {
  if(playerSplitHand.length > 0) {
    $('#stay').off();
    $('#hit').off();
    $('#double').off();
    $('#hit').click(splitHit);
    $('#stay').click(resultSplit);
    $('#double').click(doubleDownSplit);
    $('#results').hide().text('Hand 1 stays...').fadeIn('slow').fadeOut(800);
    playerSplitScore();

  } else {
      playerStay();
    if((playerCurrentscore === 21 && dealerCurrentscore === 21)) {
      $('#results').text('Push!').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool + insurancePool;
    } else if (playerCurrentscore > 21) {
      $('#results').text('Bust...').fadeIn('slow').fadeOut(4000);
    } else if (playerCurrentscore === dealerCurrentscore) {
      $('#results').hide().text('Push!').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool;
    } else if (playerCurrentscore === 21) {
      $('#results').text('You got Blackjack!!!').hide().fadeIn('fast').fadeOut(4000);
      playerMoney += (moneyPool * 2 * 1.5);
    } else if (dealerCurrentscore === 21) {
      $('#results').text('House Blackjack...').fadeIn('slow').fadeOut(4000);
      playerMoney += insurancePool;
    } else if (dealerCurrentscore > 21) {
      $('#results').text('Dealer bust!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2);
    } else if (dealerCurrentscore > playerCurrentscore) {
      $('#results').text('You lost...').fadeIn('slow').fadeOut(4000);
    } else {
      $('#results').text('You won!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2);
    }
    $('#hit').off();
    $('#stay').off();
    $('#double').off();
    moneyPool = 0;
    insurancePool = 0;
    viewMoney();
    bets();
    $('#deal').click(startGame);
    flipChips();
  }
}

function resultSplit() {
      playerStay();
    if((playerCurrentscore === 21 && playerSplitCurrentScore === 21 && dealerCurrentscore === 21) || (playerCurrentscore === dealerCurrentscore && playerSplitCurrentScore === dealerCurrentscore)) {
      $('#results').text('Push!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool + splitMoneyPool);
    } else if (playerCurrentscore > 21 && playerSplitCurrentScore > 21) {
      $('#results').text('Double Bust...').fadeIn('slow').fadeOut(4000);
    } else if (playerCurrentscore === 21 && playerSplitCurrentScore === 21) {
      $('#results').text('You got double Blackjack!!!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2 * 1.5) + (splitMoneyPool * 2 * 1.5);
    } else if (dealerCurrentscore === 21 && playerCurrentscore < 21 && playerSplitCurrentScore < 21) {
      $('#results').text('House Blackjack...').fadeIn('slow').fadeOut(4000);
      playerMoney += insurancePool;
    } else if (dealerCurrentscore <= 21 && playerCurrentscore <= 21 & playerSplitCurrentScore <= 21 && playerCurrentscore > dealerCurrentscore && playerSplitCurrentScore > dealerCurrentscore) {
      $('#results').hide().text('Double win!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2) + (splitMoneyPool * 2);
    } else if (dealerCurrentscore > 21 && playerCurrentscore < 21 && playerSplitCurrentScore > 21) {
      $('#results').hide().text('One hand won...').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool;
    } else if (dealerCurrentscore > 21 && playerCurrentscore > 21 && playerSplitCurrentScore < 21) {
      $('#results').hide().text('One hand won...').fadeIn('slow').fadeOut(4000);
      playerMoney += splitMoneyPool;
    } else if (dealerCurrentscore > 21 && playerCurrentscore === 21 && playerSplitCurrentScore < 21) {
      $('#results').hide().text('You won with one Blackjack!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2 * 1.5) + (splitMoneyPool * 2);
    } else if (dealerCurrentscore > 21 && playerCurrentscore < 21 && playerSplitCurrentScore === 21) {
      $('#results').hide().text('You won with one Blackjack!').fadeIn('slow').fadeOut(4000);
      playerMoney += (splitMoneyPool * 2 * 1.5) + (moneyPool * 2);
    } else if (dealerCurrentscore < 21 && playerCurrentscore === 21 && playerSplitCurrentScore === dealerCurrentscore){
      $('#results').hide().text('You got one Blackjack & one push!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2 * 1.5) + splitMoneyPool;
    } else if (dealerCurrentscore < 21 &&  playerSplitCurrentScore === 21 && dealerCurrentscore === playerCurrentscore){
      $('#results').hide().text('You got one Blackjack & one push!').fadeIn('slow').fadeOut(4000);
      playerMoney += (splitMoneyPool * 2 * 1.5) + splitMoneyPool;
    } else if (playerCurrentscore === 21 && dealerCurrentscore > playerSplitCurrentScore) {
      $('#results').text('You got one Blackjack & one loss.').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool * 2 * 1.5;
    } else if (playerSplitCurrentScore === 21 && dealerCurrentscore > playerCurrentscore) {
      $('#results').text('You got one Blackjack & one loss.').fadeIn('slow').fadeOut(4000);
      playerMoney += splitMoneyPool * 2 * 1.5;
    } else if (dealerCurrentscore > 21 && playerCurrentscore < 21 && playerSplitCurrentScore < 21) {
      $('#results').text('Dealer bust!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2) + (splitMoneyPool * 2);
    } else if (dealerCurrentscore > 21 && playerCurrentscore === 21 && playerSplitCurrentScore < 21) {
      $('#results').hide().text('You got one Blackjack & dealer bust!').fadeIn('slow').fadeOut(4000);
      playerMoney += (moneyPool * 2 * 1.5) + splitMoneyPool * 2;
    } else if (dealerCurrentscore > 21 && playerCurrentscore < 21 && playerSplitCurrentScore === 21) {
      $('#results').hide().text('You got one Blackjack & dealer bust!').fadeIn('slow').fadeOut(4000);
      playerMoney += (splitMoneyPool * 2 * 1.5) + moneyPool * 2;
    } else if (dealerCurrentscore <= 21 && dealerCurrentscore === playerCurrentscore && dealerCurrentscore > playerSplitCurrentScore) {
      $('#results').hide().text('One push & one lost...').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool;
    } else if (dealerCurrentscore <= 21 && dealerCurrentscore === playerSplitCurrentScore && dealerCurrentscore > playerCurrentscore) {
      $('#results').hide().text('One push & one lost...').fadeIn('slow').fadeOut(4000);
      playerMoney += splitMoneyPool;
    } else if (dealerCurrentscore <= 21 && dealerCurrentscore > playerCurrentscore && dealerCurrentscore > playerSplitCurrentScore) {
      $('#results').text('You lost both hands...').fadeIn('slow').fadeOut(4000);
    } else if (playerCurrentscore > 21 && dealerCurrentscore <= 21 && playerSplitCurrentScore <= 21 && dealerCurrentscore < playerSplitCurrentScore) {
      $('#results').text('One bust and one win...').fadeIn('slow').fadeOut(4000);
      playerMoney += splitMoneyPool * 2;
    } else if (playerSplitCurrentScore > 21 && dealerCurrentscore <= 21 && playerCurrentscore <=21 && dealerCurrentscore < playerCurrentscore) {
      $('#results').text('One bust and hand win...').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool * 2;
    } else if (dealerCurrentscore <= 21 && dealerCurrentscore === playerCurrentscore && playerSplitCurrentScore > dealerCurrentscore){
      $('#results').text('One push and one win!').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool + (splitMoneyPool * 2);
    } else if (dealerCurrentscore <= 21 && dealerCurrentscore === playerSplitCurrentScore && dealerCurrentscore < playerCurrentscore) {
      $('#results').text('One push and one win!').fadeIn('slow').fadeOut(4000);
      playerMoney += splitMoneyPool + (moneyPool * 2);
    } else if (playerCurrentscore <= 21 && dealerCurrentscore <= 21 && playerSplitCurrentScore <= 21 && dealerCurrentscore < playerCurrentscore && dealerCurrentscore > playerSplitCurrentScore) {
      $('#results').text('One hand won...').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool * 2;
    } else if (playerSplitCurrentScore <= 21 && dealerCurrentscore <=21 && playerCurrentscore <=21 && dealerCurrentscore > playerCurrentscore && dealerCurrentscore < playerSplitCurrentScore) {
      $('#results').text('One hand won...').fadeIn('slow').fadeOut(4000);
      playerMoney += splitMoneyPool * 2;
    } else if (playerSplitCurrentScore === dealerCurrentscore && playerSplitCurrentScore <= 21 && dealerCurrentscore <= 21 && playerCurrentscore > 21) {
      $('#results').text('One bust and one tie...').fadeIn('slow').fadeOut(4000);
      playerMoney += splitMoneyPool;
    } else if (playerCurrentscore === dealerCurrentscore && playerCurrentscore <= 21 && dealerCurrentscore <= 21 && playerSplitCurrentScore > 21) {
      $('#results').text('One bust and one tie...').fadeIn('slow').fadeOut(4000);
      playerMoney += moneyPool;
    } else if (playerCurrentscore > 21 && dealerCurrentscore <= 21 && dealerCurrentscore > playerSplitCurrentScore) {
      $('#results').text('You lost both hands...').fadeIn('slow').fadeOut(4000);
    } else if (playerSplitCurrentScore > 21 && dealerCurrentscore <= 21 && dealerCurrentscore > playerCurrentscore) {
      $('#results').text('You lost both hands...').fadeIn('slow').fadeOut(4000);
    }
    moneyPool = 0;
    splitMoneyPool = 0;
    insurancePool = 0;
    viewMoney();
    bets();
    flipChips();
    $('#hit').off();
    $('#stay').off();
    $('#double').off();
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

//Split Ace Logic
function aceCounterSplit() {
  var numAceSplit = 0;
  for(var i = 0; i < playerSplitHand.length; i++) {
    if(playerSplitHand[i].face === "A") {
      numAceSplit += 1;
    }
  }
  return numAceSplit;
}

//User Actions/////////////////////////
//Hit
function playerHit() {
    if(playerCurrentscore < 21) {
      $('#dealAudio').get(0).play();
      playerHand.push(deck.pop());
      viewPlayerHand();
    }
    playerScore();
  };


//Split hand hit
function splitHit() {
    if(playerSplitCurrentScore < 21) {
     $('#dealAudio').get(0).play();
     playerSplitHand.push(deck.pop());
     viewSplit();
   }
   playerSplitScore();
 };


//Stay
function playerStay() {
  //Dealer's actions
  while(dealerCurrentscore < 17) {
    dealerHand.push(deck.pop());
    dealerScore();
  }
  viewPlayerHand();
  viewSplit();
  viewDealerHand();
  $('#dScore').text(dealerCurrentscore);
};

//Split
function playerSplit() {
  if(playerHand.length > 0) {
  if(playerHand[0].value === playerHand[1].value && playerMoney >= moneyPool) {
    $('#dealAudio').get(0).play();
    playerSplitHand.push(playerHand.pop());
    playerHand.push(deck.pop());
    playerSplitHand.push(deck.pop());
    viewSplit();
    viewPlayerHand();
    playerScore();
    splitMoneyPool += moneyPool;
    playerMoney -= splitMoneyPool;
    viewMoney();
    $('#split').off();
  }
}
}

//Double
function doubleDown() {
  if(playerHand.length === 2 && playerCurrentscore >= 9 && playerCurrentscore <= 11 && playerMoney >= moneyPool) {
    playerMoney -= moneyPool;
    moneyPool += moneyPool;
    $('#dealAudio').get(0).play();
    playerHand.push(deck.pop());
    viewPlayerHand();
    doubleScore();
  }
}

function doubleDownSplit() {
  if(playerSplitHand.length === 2 && playerSplitCurrentScore >= 9 && playerSplitCurrentScore <= 11 && playerMoney >= splitMoneyPool) {
    playerMoney -= splitMoneyPool;
    splitMoneyPool += splitMoneyPool;
    $('#dealAudio').get(0).play();
    playerSplitHand.push(deck.pop());
    viewSplit();
    resultSplit();
  }
}

//Insurance
function insurance() {
  if(dealerHand[1].face === 'A' && playerHand.length === 2) {
     playerMoney -= moneyPool * 0.5;
     insurancePool += moneyPool * 0.5;
     $('#insurance').off();
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
$('#pbet').text('$' + (moneyPool + splitMoneyPool));
};

//SplitHand
function viewSplit() {
$('#pSplit').empty();
$.each(playerSplitHand, function(index,value) {
  $('#pSplit').append('<div class="newS ' + value.className + '"></div>');
  $('.newS').hide();
  $('.newS').slideDown();
}
)};

//Money Bets/////////////////
function betOne() {
  if(playerMoney >= 1) {
    playerMoney -= 1;
    moneyPool += 1;
    $('#chipAudio').get(0).play();
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}


function betFive() {
  if(playerMoney >= 5) {
    playerMoney -= 5;
    moneyPool += 5;
    $('#chipAudio').get(0).play();
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}

function betTfive() {
  if(playerMoney >= 25) {
    playerMoney -= 25;
    moneyPool += 25;
    $('#chipAudio').get(0).play();
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}

function betOneHund() {
  if(playerMoney >= 100) {
    playerMoney -= 100;
    moneyPool += 100;
    $('#chipAudio').get(0).play();
    viewMoney();
  } else {
  $('#results').text('Not enough money...').fadeIn('slow').fadeOut('slow');
  }
}

function betFhund() {
  if(playerMoney >= 500) {
    playerMoney -= 500;
    moneyPool += 500;
    $('#chipAudio').get(0).play();
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

//Hover effects
function flipChips() { $('.chips').hover(function() {
  $(this).toggleClass('animated infinite flip')
})};
