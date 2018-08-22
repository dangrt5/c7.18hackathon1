$(document).ready(initializeApp);

var gameBoardArray = [];
var gameBoardSize = 0;
function populateGameBoardArray(boardSize) {
    // resets gameboard Array, no visible front-end effect
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
    this.playerName = name;
    this.currentPlayerTurn = false;
    this.playerWonGame = false;
    this.playerSymbol;
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

var player1;
var player2;


function askForPlayerData() {
  player1 = prompt("Player 1: What is your name?");
  player1 = new CreateNewPlayer(1, player1);
  player1.symbol = prompt(player1.playerName, "would you like to be X's or O's?");

  player2 = prompt("Player 2: What is your name?");
  player2 = new CreateNewPlayer(2, player2);
  if (player1.symbol === "X" || player1.symbol === "x") {
    player2.symbol = "O";
  } else {
    player2.symbol = "X";
  }



  $(".p1Name").text(player1.playerName);
  $(".p2Name").text(player2.playerName);

}

function updateGameboardWithMove (playerNumber, nColumns, nRows) {
    var highestVectorSequence = 0;
    currentVectorSequence = 0;
    gameBoardArray[nColumns][nRows] = playerNumber;

     // ==== X axis checks ====
    currentVectorSequence =1;
    for (var i = nColumns-1; i>=0; i--) {
        //console.log (" x -checking "+gameBoardArray[i][nRows]);
        if (gameBoardArray[nRows][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }
    for (var i = nColumns+1; i<gameBoardSize; i++) {
        //console.log (" x +checking "+gameBoardArray[i][nRows]);
        if (gameBoardArray[nColumns][i]=== playerNumber) {
            currentVectorSequence ++;;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }

    // ==== Y axis checks ====
    currentVectorSequence =1;
    for (var i = nRows-1; i>=0; i--) {
        //console.log (" y -checking "+gameBoardArray[nColumns][i]);
        if (gameBoardArray[nRows][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }
    for (var i = nRows+1; i<gameBoardSize; i++) {
        //console.log (" y +checking "+gameBoardArray[nColumns][i])
        if (gameBoardArray[nColumns][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }



    // ==== XminYmin -> XmaxYmax upperBoundary axis check ====

    var checkLimits = 0;
    currentVectorSequence =1;
    if (nColumns<nRows) {
        checkLimits = nColumns;
    } else {
        checkLimits = nRows;
    }
    for (var i = 1; i<= checkLimits; i++) {
        //console.log (" XminYmin -checking "+gameBoardArray[nColumns-i][nRows-i]);
        if (gameBoardArray[nColumns-i][nRows-i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }
    currentVectorSequence =1;
    if (nColumns>nRows) {
        checkLimits = gameBoardSize-nColumns-1;
    } else {
        checkLimits = gameBoardSize- nRows-1;
    }
    for (var i = 1; i<= checkLimits; i++) {
        //console.log (" XmaxYmax +checking "+gameBoardArray[nColumns+i][nRows+i]);
        if (gameBoardArray[nColumns+i][nRows+i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }

    // ==== XmaxYmin -> XminYmax axis check ====
    currentVectorSequence =1;
    if (nColumns< gameBoardSize- nRows) {
        checkLimits = nColumns;
    } else {
        checkLimits = gameBoardSize - nRows -1;
    }

    for (var i = 1; i<= checkLimits; i++) {
        //console.log (" XmaxYmin -checking "+gameBoardArray[nColumns-i][nRows+i]);
        if (gameBoardArray[nColumns-i][nRows+i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }
    if (nRows< gameBoardSize- nColumns) {
        checkLimits = nRows;
    } else {
        checkLimits = gameBoardSize - nColumns -1;
    }
    for (var i = 1; i<= checkLimits; i++) {
        //console.log (" XmaxYmin +checking "+gameBoardArray[nColumns+i][nRows-i]);
        if (gameBoardArray[nColumns+i][nRows-i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            //break;
        }
    }
}