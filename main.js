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
  constructor(playerNumber) {
    this.player = playerNumber;
    this.currentPlayerTurn = false;
    this.playerWonGame = false;
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
