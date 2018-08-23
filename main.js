$(document).ready(initializeApp);

// === globals ===
var gameBoardArray = [];
var gameBoardSize = 0;
var currentPlayer = 1;
var winCondition = 3;

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
    if (boardSize === "3") {
      $(".gameBoard").css({
        "width": "40vw",
        "height": "65vh"
      });
      $(".square").css({
        "width": "33.3%",
        "height": "100%",
        "font-size": "9vw"
      });
    }
    else if (boardSize === "4") {
      $(".gameBoard").css({
        "width": "50vw",
        "height": "51vh"
      });
      $(".square").css({
        "width": "24.3%",
        "height": "100%",
        "font-size": "7vw"
      });
    }
    else if (boardSize === "5") {
      $(".gameBoard").css({
        "width": "52vw",
        "height": "41vh"
      });
      $(".square").css({
        "width": "19.1%",
        "height": "100%",
        "font-size": "5vw"
      });
    }
  }
}

function initializeApp() {
    addEventListeners();
    populateGameBoardArray(3);
}

function addEventListeners() {
    $('.gameBoard').on('click', '.square', playerOneAndTwo);
    $('.resetButtons:not(.reset)').on('click', 'button' ,gridSize);
    $('button.reset').click(newGame);
}

function playerOneAndTwo() {
    var currentSquareClicked = $(this);
    var columnCoordinate = parseInt(currentSquareClicked.attr('columns'));
    var rowCoordinate = parseInt(currentSquareClicked.parent().attr('rows'));
    if ($(this).hasClass("notAvailable")) {
        return;
    }
    $(this).addClass("notAvailable");
    if (currentPlayer === 1) {
        currentSquareClicked.text('X');
    } else {
        currentSquareClicked.addClass("O");
        currentSquareClicked.text('O');
    }
    playClickSoundEffect();
    currentPlayer = 1 - currentPlayer;
    if  (updateGameboardWithMove(currentPlayer, columnCoordinate, rowCoordinate) >= winCondition) {
        reportWinner (currentPlayer);
    }
}

function playClickSoundEffect() {
  $(".clickSound").get(0).play();
}

function reportWinner (currentPlayer) {
    var modalDiv = $("#myModal");
    $("#winnerInformation").text("Winner is " + currentPlayer);
    modalDiv.css("display","block");
    modalDiv.click( function () {
        modalDiv.css("display","none");
    })
    playSound('sounds/joker.mp3');
}

function gridSize() {
    var gridSizeButton = $(this).attr('gridSize');
    $('.gameBoard').empty();
    createGameBoard(gridSizeButton);

}

function newGame() {
    $('.square').remove();
    gameBoardArray.splice(0);
    populateGameBoardArray(3);
}

function playSound(sound) {
    var audio = new Audio(sound);
    audio.play();
}

function updateGameboardWithMove (playerNumber, nRows, nColumns) {
    console.log ("nColumn:"+ nColumns);
    console.log("nRows:" +nRows);
    console.log("player:" + playerNumber);

    //var tempSwitchValues =  nRows;
    //nColumns = nRows;
    //nRows = nColumns;


    var highestVectorSequence = 1;
    currentVectorSequence = 1;
    gameBoardArray[nColumns][nRows] = playerNumber;

     // ==== column connector checks ====
    currentVectorSequence =1;
    for (var i = nColumns-1; i>=0; i--) {
        console.log (" column -checking "+gameBoardArray[i][nRows]);
        if (gameBoardArray[nRows][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }
    for (var i = nColumns+1; i<gameBoardSize; i++) {
        console.log (" column +checking "+gameBoardArray[i][nRows]);
        if (gameBoardArray[nColumns][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }

    // ==== row connector checks ====
    currentVectorSequence =1;
    for (var i = nRows-1; i>=0; i--) {
        console.log (" row -checking "+gameBoardArray[nColumns][i]);
        if (gameBoardArray[nRows][i]=== playerNumber) {
            currentVectorSequence ++;
            if (currentVectorSequence > highestVectorSequence) {highestVectorSequence=currentVectorSequence}
        } else {
            break;
        }
    }
    for (var i = nRows+1; i<gameBoardSize; i++) {
        console.log (" row +checking "+gameBoardArray[nColumns][i])
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
    console.log("Highest sequence: "+ highestVectorSequence);
    return highestVectorSequence;
}
