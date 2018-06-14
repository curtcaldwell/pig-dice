//
//Back End Logic
//
var initialPlayerScore = 0;
var initialOpponentScore = 0;
var initialPlayerTurn = 1;
var initialTempScore = 0;
var initialPlayerRollCount = 0;
var initialGameType = 1;
//
//
function Game(playerScore, opponentScore, playerTurn, tempScore, playerRollCount, gameType)
{
  this.playerScore = playerScore;
  this.opponentScore = opponentScore;
  this.playerTurn = playerTurn;
  this.tempScore = tempScore;
  this.playerRollCount = playerRollCount;
  this.gameType = gameType;
};
//
//
var newGame = new Game(initialPlayerScore, initialOpponentScore, initialPlayerTurn, initialTempScore, initialPlayerRollCount, initialGameType);
//
//
Game.prototype.terminate = function(score)
{
  if(score >= 30)
  {
    $("#player-one-score").text(0);
    $("#player-two-score").text(0);
    $("#game-state").hide();
    $("#terminal-state").show();

    if(newGame.playerTurn === 1)
    {
      $("span#winner").text("Player 2");
    }
    else
    {
      $("span#winner").text("Player 1");
    }
  }
}
//
//
function dSix()
{
  return (Math.floor(Math.random() * 6 ) + 1);
}
//
//
function playerOneRoll()
{
  var playerRoll = dSix();
  if(playerRoll === 1)
  {
    alert("Player One rolled a 1.")
    newGame.tempScore = 0;
    newGame.playerTurn = 2;
    $("#current-total").text(0);
    $("#current-roll").text(0);
    $("#current-roll").text(playerRoll);
    $("#current-player").text("Player 2");
    $("#current-total").text(newGame.tempScore);
    if (newGame.gameType === 2)
    {
      playerTwoRoll()
      playerTwoRoll()
      playerTwoHold()
    }
  }
  else
  {
    newGame.tempScore += playerRoll;
    $("#current-roll").text(playerRoll);
    $("#current-total").text(newGame.tempScore);
  }
}
//
//
function playerTwoRoll()
{
  if (newGame.playerTurn != 1)
  {
    var opponentRoll = dSix();
    console.log(opponentRoll);
    if(opponentRoll === 1)
    {
      alert("Player Two rolled a 1.")
      newGame.tempScore = 0;
      newGame.playerTurn = 1;
      $("#current-total").text(0);
      $("#current-roll").text(0);
      $("#current-roll").text(opponentRoll);
      $("#current-player").text("Player 1");
      $("#current-total").text(newGame.tempScore);
    }
    else
    {
      newGame.tempScore += opponentRoll;
      $("#current-roll").text(opponentRoll);
      $("#current-total").text(newGame.tempScore);
    }
  }
}
//
//
function roll()
{
  if(newGame.playerTurn === 1)
  {
    playerOneRoll();
  }
  else
  {
    playerTwoRoll();
  }
}
//
//
function playerOneHold()
{
  newGame.playerScore += newGame.tempScore;
  newGame.playerTurn = 2;
  newGame.tempScore = 0;
  $("#current-total").text(0);
  $("#current-roll").text(0);
  $("#current-player").text("Player 2");
  $("#player-one-score").text(newGame.playerScore);
  newGame.terminate(newGame.playerScore);
}
//
//
function playerTwoHold()
{
  if (newGame.playerTurn != 1)
  {
    newGame.opponentScore += newGame.tempScore;
    newGame.playerTurn = 1;
    newGame.tempScore = 0;
    $("#current-total").text(0);
    $("#current-roll").text(0);
    $("#current-player").text("Player 1");
    $("#player-two-score").text(newGame.opponentScore);
    newGame.terminate(newGame.opponentScore);
  }
}
//
//
function hold()
{
  if(newGame.gameType === 1)
  {
    if (newGame.playerTurn === 1)
    {
      playerOneHold();
    }
    else
    {
      playerTwoHold();
    }

    newGame.tempScore = 0;
  }
  else if (newGame.gameType === 2)
  {
    playerOneHold();
    if (newGame.playerScore < 30)
    {
      playerTwoRoll()
      playerTwoRoll()
      playerTwoHold()
    }
  }
}
//
//Front End
//
$(document).ready(function(){
//
//
  $("button#play-button").click(function(event)
  {
    event.preventDefault();

    $("#initial-state").hide();
    $("#game-state").show();
    $("#current-player").text("Player 1");
    newGame.gameType = 1;
  });
//
//
  $("button#baby-play-button").click(function(event)
  {
    event.preventDefault();

    $("#initial-state").hide();
    $("#game-state").show();
    $("#current-player").text("Player 1");
    newGame.gameType = 2;
  });
//
//
  $("button#nightmare-play-button").click(function(event)
  {
    event.preventDefault();

    $("#initial-state").hide();
    $("#game-state").show();
    $("#current-player").text("Player 1");
    newGame.gameType = 3;
  });
//
//
  $("button#roll-button").click(function(event)
  {
    event.preventDefault();
    roll();
  });
//
//
  $("button#hold-button").click(function(event)
  {
    event.preventDefault();
    hold();
  });
//
//
  $("button#restart-game").click(function(event)
  {
    newGame.playerScore = 0;
    newGame.opponentScore = 0;
    newGame.playerTurn = 1;
    newGame.tempScore = 0;
    newGame.playerRollCount = 0;

    $("#initial-state").show();
    $("#terminal-state").hide();
  });
//
//
});
