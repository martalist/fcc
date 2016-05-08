var BOARD_SIZE = 3;
var EMPTY = null;


// Board constructor function. Creates an empty board, width/height = size
var Board = function(size, empty) {
  this.positions = (function(size, empty) {
    positions = [];
    for (var i = 0; i < size; i++) {
      var row = [];
      for (var j = 0; j < size; j++) {
        row.push(empty);
      }
      positions[i] = row;
    }
    return positions;
  })(size, empty);
  this.firstMove = true;
  this.computerMovesFirst = true;
  this.humansTurn = false;
  this.gameOver = false;
};

Board.prototype.clearPositions = function(empty) {
  function clear(arr) {
    newArr = arr.map( function(value, i) {
      var reset = Array.isArray(value) ? clear(arr[i]) : empty;
      return reset;
    });
    return newArr;
  }
  this.positions = clear(this.positions);
};

Board.prototype.computerMove = function() {
  // Assess the positions on the board
  // Move to the most optimal position
  // return ['computer', board[row][column]]
};

Board.prototype.humanMove = function() {
  // get input from human player
  // add symbol to the board
  // return ['computer', board[row][column]]
};

Board.prototype.newWinner = function(latestMove) {
  // latestMove is an Array, consisting of the position of the last move, and the player who made it
  var player = latestMove[0], newMove = latestMove[1];
  // check the board, from the latestMove, to see if there's a winner
  // return true if game is won
};

Board.prototype.hasNoEmptyCells = function() {
  // determine whether any slots in the board are empty
  // return false if there are empty slots, true if not
  function isFull(arr) {
    var result = true;
    arr.forEach( function(v) {
      result = (Array.isArray(v)) ? (result && isFull(v)) : (result && !!v);
    });
    return result;
  }
  return isFull(this.positions);
};

/*
document.addEventListener("DOMContentLoaded", function() {

  // create the playing the playing board
  var board = new Board(BOARD_SIZE, EMPTY);

  // Player to select X or O
  // var humanSymbol;
  // do {
  //   humanSymbol = prompt('Play as X or O?', 'X').toUpperCase();
  // } while (humanSymbol !== 'X' || humanSymbol !== 'O');

  // Start game
  while (true) {
    board.gameOver = false;
    board.firstMove = true;

    // Show who's move it is on screen

    while (!board.gameOver) {

      if (board.firstMove) {
        // set who has first move
        board.humansTurn = board.computerMovesFirst ? false : true;
        board.firstMove = false;
      }

      // Make a move (computer or human)
      var newMove;
      if (board.humansTurn) {
        newMove = board.humanMove();
      }
      else {
        newMove = board.computerMove();
      }

      // Check for a winner
      if ( board.newWinner(newMove) || board.hasNoEmptyCells() ) {
        board.gameOver = true;

        // TODO: display who the winner is, and give the user the ability to start the next game
      }
      else {
        // toggle who's turn it is
        board.humansTurn = !board.humansTurn;
      }
    }

    // Alternate player who has the first move (before starting the next game)
    board.computerMovesFirst = !board.computerMovesFirst;

    // clear the board
    board.clearPositions(EMPTY);
  }
});
*/
