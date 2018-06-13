//Back End Logic

var playerScore = 0;
var opponentScore = 0;
var playerTurn = 1;
var tempScore = 0;
var playerRollCount = 0;
var newGameState = new GameState(playerScore, opponentScore, playerTurn, tempScore,  playerRollCount);

function GameState(playerScore, opponentScore, playerTurn, tempScore, playerRollCount)
{
  this.playerScore = playerScore;
  this.opponentScore = opponentScore;
  this.playerTurn = playerTurn;
  this.tempScore = tempScore;
  this.playerRollCount = playerRollCount;
};





GameState.prototype.roll = function(playerTurn, tempScore)
{
  if(newGameState.playerTurn === 1)
  {
    var playerRoll = dSix();
    if(playerRoll === 1)
    {
      newGameState.tempScore = 0;
      newGameState.playerTurn = 2;
      alert("Player One temp score = " + newGameState.tempScore);
    }
    else
    {
      newGameState.tempScore += playerRoll;
      alert("Player One temp score = " + newGameState.tempScore);
    }
  }
  else
  {
    var opponentRoll = dSix();
    if(opponentRoll === 1)
    {
      newGameState.tempScore = 0;
      newGameState.playerTurn = 1;
      alert("Player Two temp score = " + newGameState.tempScore);
    }
    else
    {
      newGameState.tempScore += opponentRoll;
      alert("Player Two temp score = " + newGameState.tempScore);
    }
  }
}







GameState.prototype.hold = function(playerTurn, tempScore, opponentScore, playerScore)
{
  if (newGameState.playerTurn === 1)
  {
    newGameState.playerScore += newGameState.tempScore;
    newGameState.playerTurn = 2;
    alert("Player One Score = " + newGameState.playerScore);
    $("#player-one-score").text(newGameState.playerScore)
  }
  else
  {
    newGameState.opponentScore += newGameState.tempScore;
    newGameState.playerTurn = 1;
    alert("Player Two Score = " + newGameState.opponentScore);
    $("#player-two-score").text(newGameState.opponentScore);
  }
  newGameState.tempScore = 0;
}

GameState.prototype.switchTurn = function(playerTurn, tempScore)
{

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
  });

  $("button#roll-button").click(function(event)
  {
    event.preventDefault();
    newGameState.roll(newGameState.playerTurn, 0);
  });

  $("button#hold-button").click(function(event)
  {
    event.preventDefault();
    newGameState.hold(newGameState.playerTurn, newGameState.tempScore, newGameState.opponentScore, newGameState.playerScore);
  });




});
