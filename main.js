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

    var loopCounter = 0;
    var checkLimits = 0;
    // ==== XY0 -> XY upperBoundary axis check ====
    currentSequence =1;
    loopCounter = 0;
    if (xAxis<yAxis) {
        checkLimits = xAxis;
    } else {
        checkLimits = yAxis;
    }


    for (checkLimits; checkLimits>=0; checkLimits--) {
        console.log (" x0y0 -checking "+gameBoardArray[i][yAxis])
        if (gameBoardArray[i][yAxis]=== playerNumber) {
            currentSequence ++;;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            break;
        }
    }
    for (var i = xAxis+1; i<gameBoardSize-1; i++) {
        console.log (" x0y0 +checking "+gameBoardArray[i][yAxis])
        if (gameBoardArray[i][yAxis]=== playerNumber) {
            currentSequence ++;;
            if (currentSequence > highestSequence) {highestSequence=currentSequence}
        } else {
            break;
        }
    }
}