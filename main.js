var gameBoardArray = [];

function populateGameBoardArray(boardSize) {
    gameBoardArray = [];
    var counter = 0;
    for (var i = 0; i <= boardSize-1; i++) {
        gameBoardArray.push([counter]);
        counter++;
        for (var x = 0; x <= boardSize-2; x++) {
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
