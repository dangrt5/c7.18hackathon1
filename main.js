$(document).ready(initializeApp);

var gameBoardArray = [];
var gameBoardSize = 0;
function populateGameBoardArray(boardSize) {
    gameBoardSize = boardSize;
    gameBoardArray = [];
    var counter = 10;
    for (var i = 0; i < boardSize; i++) {
        gameBoardArray.push([]);
        for (var x = 0; x < boardSize; x++) {
            gameBoardArray[i].push(counter);
            counter++;
        }
    }
}

class CreateNewPlayer {
  constructor(playerNumber, name) {
    this.player = playerNumber;
    this.playerName = this.name;
    this.currentPlayerTurn = false;
    this.playerWonGame = false;
  }
}

function initializeApp() {
    addEventListeners();
}
 
function addEventListeners() {
    $('.square').click(changeToXorO);
}

function changeToXorO() {
    console.log('testing');
    var squaresClicked = $(this);
    $(squaresClicked).text('X');
}

function askForPlayerData() {
  var player1 = prompt("Player 1: What is your name?");
  player1 = new CreateNewPlayer(1, player1);
  player1.symbol = prompt(player1.playerName, "would you like to be X's or O's?");

  var player2 = prompt("Player 2: What is your name?");
  player2 = new CreateNewPlayer(2, player2);
  if (player1.symbol === "X" || player1.symbol === "x") {
    player2.symbol = "O";
  }
}

function updateGameboardWithMove (playerNumber, xAxis, yAxis) {
    var highestSequence = 0;
    var currentSequence = 0;
    gameBoardArray[xAxis][yAxis] = playerNumber;

     // ==== X axis checks ====
    currentSequence =1;
    for (var i = xAxis-1; i>=0; i--) {
        console.log (" x -checking "+gameBoardArray[xAxis][i])
        if (gameBoardArray[xAxis][i]=== playerNumber) {
            currentSequence ++;;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
    for (var i = xAxis+1; i<gameBoardSize; i++) {
        console.log (" x +checking "+gameBoardArray[xAxis][i])
        if (gameBoardArray[xAxis][i]=== playerNumber) {
            currentSequence ++;;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }

    // ==== Y axis checks ====
    currentSequence =1;
    for (var i = yAxis-1; i>=0; i--) {
        console.log (" y -checking "+gameBoardArray[i][yAxis])
        if (gameBoardArray[i][yAxis]=== playerNumber) {
            currentSequence ++;;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
    for (var i = xAxis+1; i<gameBoardSize; i++) {
        console.log (" y +checking "+gameBoardArray[i][yAxis])
        if (gameBoardArray[i][yAxis]=== playerNumber) {
            currentSequence ++;;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }

    var checkLimits = 0;
    // ==== XY0 -> XY upperBoundary axis check ====
    currentSequence =1;
    if (xAxis<yAxis) {
        checkLimits = xAxis;
    } else {
        checkLimits = yAxis;
    }
    console.log("checklimits "+checkLimits);
    for (var i = 1; i<= checkLimits; i++) {
        console.log (" x0y0 -checking "+gameBoardArray[xAxis-i][yAxis-i]);
        if (gameBoardArray[xAxis-i][yAxis-i]=== playerNumber) {
            currentSequence ++;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
}
