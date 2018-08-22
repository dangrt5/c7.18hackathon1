$(document).ready(initializeApp);

var gameBoardArray = [];
var gameBoardSize = 0;
var currentPlayer = 1; 

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

function initializeApp() {
    addEventListeners();
}
 
function addEventListeners() {
    $('.square').click(playerOneAndTwo);
}

function playerOneAndTwo() {
    var currentSquareClicked = $(this);

    if (currentPlayer === 1) {
        currentSquareClicked.text('X');
    } else {
        currentSquareClicked.text('O');
    }
    currentPlayer = 1 - currentPlayer;
}

function updateGameboardWithMove (playerNumber, xAxis, yAxis) {
    var highestSequence = 0;
    var currentSequence = 0;
    gameBoardArray[xAxis][yAxis] = playerNumber;

     // ==== X axis checks ====
    currentSequence =1;
    for (var i = xAxis-1; i>=0; i--) {
        console.log (" x -checking "+gameBoardArray[i][yAxis]);
        if (gameBoardArray[yAxis][i]=== playerNumber) {
            currentSequence ++;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
    for (var i = xAxis+1; i<gameBoardSize; i++) {
        console.log (" x +checking "+gameBoardArray[i][yAxis])
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
        console.log (" y -checking "+gameBoardArray[xAxis][i]);
        if (gameBoardArray[yAxis][i]=== playerNumber) {
            currentSequence ++;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
    for (var i = yAxis+1; i<gameBoardSize; i++) {
        console.log (" y +checking "+gameBoardArray[xAxis][i])
        if (gameBoardArray[xAxis][i]=== playerNumber) {
            currentSequence ++;;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }

    // ==== XminYmin -> XmaxYmax upperBoundary axis check ====

    var checkLimits = 0;
    currentSequence =1;
    if (xAxis<yAxis) {
        checkLimits = xAxis;
    } else {
        checkLimits = yAxis;
    }
    for (var i = 1; i<= checkLimits; i++) {
        console.log (" XminYmin -checking "+gameBoardArray[xAxis-i][yAxis-i]);
        if (gameBoardArray[xAxis-i][yAxis-i]=== playerNumber) {
            currentSequence ++;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
    currentSequence =1;
    if (xAxis>yAxis) {
        checkLimits = gameBoardSize-xAxis-1;
    } else {
        checkLimits = gameBoardSize- yAxis-1;
    }
    for (var i = 1; i<= checkLimits; i++) {
        console.log (" XmaxYmax +checking "+gameBoardArray[xAxis+i][yAxis+i]);
        if (gameBoardArray[xAxis+i][yAxis+i]=== playerNumber) {
            currentSequence ++;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }

    // ==== XmaxYmin -> XminYmax axis check ====
    currentSequence =1;
    // -x +y
    if (xAxis< gameBoardSize- yAxis) {
        checkLimits = xAxis;
    } else {
        checkLimits = gameBoardSize - yAxis -1;
    }

    for (var i = 1; i<= checkLimits; i++) {
        console.log (" XmaxYmin -checking "+gameBoardArray[xAxis-i][yAxis+i]);
        if (gameBoardArray[xAxis-i][yAxis+i]=== playerNumber) {
            currentSequence ++;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
    // +x -y
    if (yAxis< gameBoardSize- xAxis) {
        checkLimits = yAxis;
    } else {
        checkLimits = gameBoardSize - xAxis -1;
    }
    for (var i = 1; i<= checkLimits; i++) {
        console.log (" XmaxYmin +checking "+gameBoardArray[xAxis+i][yAxis-i]);
        if (gameBoardArray[xAxis+i][yAxis-i]=== playerNumber) {
            currentSequence ++;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            //break;
        }
    }
}
