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
  else
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
}







GameState.prototype.hold = function(playerTurn, tempScore, opponentScore, playerScore)
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
  if(score <= 15){
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

  $("button#restart-game").click(function(event)
  {
    playerScore = 0;
    opponentScore = 0;
    playerTurn = 1;
    tempScore = 0;
    playerRollCount = 0;

    $("#initial-state").show();
    $("#terminal-state").hide();

  });




});
