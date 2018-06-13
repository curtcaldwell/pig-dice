//Back End Logic

var playerScore = 0;
var opponentScore = 0;
var playerTurn = 1;
var tempScore = 0;
var rollCount = 0;
var gameType = 0;
var newGameState = new GameState(playerScore, opponentScore, playerTurn, tempScore, rollCount, gameType);

function GameState(playerScore, opponentScore, playerTurn, tempScore, rollCount, gameType)
{
  this.playerScore = playerScore;
  this.opponentScore = opponentScore;
  this.playerTurn = playerTurn;
  this.tempScore = tempScore;
  this.rollCount = rollCount;
  this.gameType = gameType;
};

GameState.prototype.meatBagRoll1 = function(playerTurn, gameType)
{
  var playerRoll = dSix();
  if(playerRoll === 1 || playerRoll === 7)
  {
    newGameState.tempScore = 0;
    newGameState.playerTurn = 2;
    $("#current-roll").text(playerRoll);
    $("#current-player").text("Player 2");
    $("#current-total").text(newGameState.tempScore);
  }
  else
  {
    newGameState.tempScore += playerRoll;
    $("#current-roll").text(playerRoll);
    $("#current-player").text("Player 1");
    $("#current-total").text(newGameState.tempScore);
  }
}


GameState.prototype.meatBagRoll2 = function(playerTurn, gameType)
{
  var opponentRoll = dSix();
  if(opponentRoll === 1 || opponentRoll === 7)
  {
    newGameState.tempScore = 0;
    newGameState.playerTurn = 1;
    $("#current-roll").text(opponentRoll);
    $("#current-player").text("Player 1");
    $("#current-total").text(newGameState.tempScore);
  }
  else
  {
    newGameState.tempScore += opponentRoll;
    $("#current-roll").text(opponentRoll);
    $("#current-player").text("Player 2");
    $("#current-total").text(newGameState.tempScore);
  }
}

GameState.prototype.babyRoll = function(playerTurn, gameType)
{
  if (newGameState.playerTurn === 2)
  {
    for (index = 0; index > 2; index++)
    {
      var opponentRoll = dSix();
      if(opponentRoll === 1 || opponentRoll === 7)
      {
        newGameState.tempScore = 0;
        newGameState.playerTurn = 1;
        $("#current-roll").text(opponentRoll);
        $("#current-player").text("Player 1");
        $("#current-total").text(newGameState.tempScore);
        index = 2;
      }
      else
      {
        newGameState.tempScore += opponentRoll;
        $("#current-roll").text(opponentRoll);
        $("#current-player").text("Player 2");
        $("#current-total").text(newGameState.tempScore);
      }
    }
  }
}

GameState.prototype.roll = function(playerTurn, gameType)
{
  if (newGameState.gameType === 0)
  {
    if(newGameState.playerTurn === 1)
    {
      newGameState.meatBagRoll1(newGameState.playerTurn, newGameState.gameType);
    }
    else
    {
      newGameState.meatBagRoll2(newGameState.playerTurn, newGameState.gameType);
    }
  }
  else if (newGameState.gameType === 1)
  {
    if(newGameState.playerTurn === 1)
    {
      newGameState.meatBagRoll1(newGameState.playerTurn, newGameState.gameType);
    }
    else
    {
      newGameState.babyRoll(newGameState.playerTurn, newGameState.gameType);
      newGameState.hold(newGameState.playerTurn, newGameState.tempScore, newGameState.opponentScore, newGameState.playerScore, newGameState.gameType);
    }
  }
}







GameState.prototype.hold = function(playerTurn, tempScore, opponentScore, playerScore, gameType)
{
  if (newGameState.playerTurn === 1)
  {
    newGameState.playerScore += newGameState.tempScore;
    newGameState.playerTurn = 2;
    $("#current-player").text("Player 2");
    $("#player-one-score").text(newGameState.playerScore)
    newGameState.terminate(newGameState.playerScore);
  }
  else
  {
    newGameState.opponentScore += newGameState.tempScore;
    newGameState.playerTurn = 1;
    $("#current-player").text("Player 1");
    $("#player-two-score").text(newGameState.opponentScore);
    newGameState.terminate(newGameState.opponentScore);
  }
  $("#current-total").text(0)
  $("#current-roll").text(0)
  newGameState.tempScore = 0;
}



GameState.prototype.terminate = function(score)
{
  if(score <= 100){
    //
  }
  else
  {
    $("#player-one-score").text(0)
    $("#player-two-score").text(0)
    $("#game-state").hide();
    $("#terminal-state").show();
    if(newGameState.playerTurn === 1)
    {
      $("span#winner").text("Player 2");
    }
    else
    {
      $("span#winner").text("Player 1");
    }
  }
}





function dSix()
{
  return (Math.floor(Math.random() * 6 ) + 1)
}






//Front End
$(document).ready(function(){

  $("button#play-button").click(function(event)
  {
    event.preventDefault();

    $("#initial-state").hide();
    $("#game-state").show();
    $("#current-player").text("Player 1");
    newGameState.gameType = 0;
    alert(newGameState.gameType);
  });

  $("button#baby-play-button").click(function(event)
  {
    event.preventDefault();
    $("#initial-state").hide();
    $("#game-state").show();
    $("#current-player").text("Player 1");
    newGameState.gameType = 1;
    alert(newGameState.gameType);
  });

  $("button#nightmare-play-button").click(function(event)
  {
    event.preventDefault();

    $("#initial-state").hide();
    $("#game-state").show();
    $("#current-player").text("Player 1");
    newGameState.gameType = 2;
    alert(newGameState.gameType);
  });

  $("button#roll-button").click(function(event)
  {
    event.preventDefault();
    newGameState.roll(newGameState.playerTurn, newGameState.gameType);
  });

  $("button#hold-button").click(function(event)
  {
    event.preventDefault();
    newGameState.hold(newGameState.playerTurn, newGameState.tempScore, newGameState.opponentScore, newGameState.playerScore, newGameState.gameType);
  });

  $("button#restart-game").click(function(event)
  {
    playerScore = 0;
    opponentScore = 0;
    playerTurn = 1;
    tempScore = 0;
    rollCount = 0;
    gameType = 0;

    $("#initial-state").show();
    $("#terminal-state").hide();

  });




});
