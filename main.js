$(document).ready(initializeApp);

var gameBoardArray = [];
var gameBoardSize = 0;
var currentPlayer = 1; 

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

function createGameBoard(boardSize) {
  for(var x = 0 ; x < boardSize; x++) {
     var row = $("<div>").addClass("row").attr('rows', x);
     for(var y = 0; y < boardSize; y++) {
       var squares = $("<div>").addClass("square").attr('columns', y);
       squares.appendTo(row);
    }
    row.appendTo(".gameBoard");
  }
}

function initializeApp() {
    createGameBoard(3);
    addEventListeners();
    populateGameBoardArray(3);
}

function addEventListeners() {
    $('.row').on("click", ".square", playerOneAndTwo);
}

function playerOneAndTwo() {
    if ($(this).hasClass("notAvailable")) {return}
    $(this).addClass("notAvailable");
    var currentSquareClicked = $(this);
    var columnCoordinate = currentSquareClicked.attr('columns');
    var rowCoordinate = currentSquareClicked.parent().attr('rows');

    if (currentPlayer === 1) {
        currentSquareClicked.text('X');
    } else {
        currentSquareClicked.text('O');
    }
    currentPlayer = 1 - currentPlayer;

    updateGameboardWithMove(currentPlayer, columnCoordinate, rowCoordinate);
}

function updateGameboardWithMove (playerNumber, nColumns, nRows) {
    var highestVectorSequence = 1;
    currentVectorSequence = 1;
    gameBoardArray[nColumns][nRows] = playerNumber;

     // ==== X axis checks ====
    currentVectorSequence =1;
    for (var i = nColumns-1; i>=0; i--) {
        console.log (" x -checking "+gameBoardArray[i][nRows]);
        if (gameBoardArray[nRows][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }
    for (var i = nColumns+1; i<gameBoardSize; i++) {
        console.log (" x +checking "+gameBoardArray[i][nRows]);
        if (gameBoardArray[nColumns][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }

    // ==== Y axis checks ====
    currentVectorSequence =1;
    for (var i = nRows-1; i>=0; i--) {
        console.log (" y -checking "+gameBoardArray[nColumns][i]);
        if (gameBoardArray[nRows][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }
    for (var i = nRows+1; i<gameBoardSize; i++) {
        console.log (" y +checking "+gameBoardArray[nColumns][i])
        if (gameBoardArray[nColumns][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
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
        console.log (" XminYmin -checking "+gameBoardArray[nColumns-i][nRows-i]);
        if (gameBoardArray[nColumns-i][nRows-i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }
    currentVectorSequence =1;
    if (nColumns>nRows) {
        checkLimits = gameBoardSize-nColumns-1;
    } else {
        checkLimits = gameBoardSize- nRows-1;
    }
    for (var i = 1; i<= checkLimits; i++) {
        console.log (" XmaxYmax +checking "+gameBoardArray[nColumns+i][nRows+i]);
        if (gameBoardArray[nColumns+i][nRows+i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
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
        console.log (" XmaxYmin -checking "+gameBoardArray[nColumns-i][nRows+i]);
        if (gameBoardArray[nColumns-i][nRows+i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }
    if (nRows< gameBoardSize- nColumns) {
        checkLimits = nRows;
    } else {
        checkLimits = gameBoardSize - nColumns -1;
    }
    for (var i = 1; i<= checkLimits; i++) {
        console.log (" XmaxYmin +checking "+gameBoardArray[nColumns+i][nRows-i]);
        if (gameBoardArray[nColumns+i][nRows-i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }
    return highestVectorSequence;
}
