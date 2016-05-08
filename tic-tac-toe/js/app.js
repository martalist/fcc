// Board constructor function. Creates an empty board, width/height = size
var Board = function(size) {
  // inherit from Array
  Array.call(this);
  this.length = size;
  this.firstMove = true;
  this.computerMovesFirst = true;
  this.humansTurn = false;
  this.gameOver = false;
};
Board.prototype = Object.create(Array.prototype);
Board.prototype.constuctor = Board;

Board.prototype.init = function() {
  for (var i = 0; i < this.length; i++) {
    var row = [];
    for (var j = 0; j < this.length; j++) {
      row.push(EMPTY);
    }
    this[i] = row;
  }
};

Board.prototype.clear = function() {
  // Recursively makes all values in the board empty
  for (var i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) {
      Board.prototype.clear.call(this[i]);
    } else {
      this[i] = EMPTY;
    }
  }
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
  // check the board, from the latestMove, to see if there's a winner
  // return true if game is won
};

Board.prototype.gameDrawn = function() {
  // determine whether any slots in the board are empty
  // return false if there are empty slots, true if not
  function checkIfFull(arr) {
    return arr.reduce( function(a, b) {
      if (Array.isArray(b)) {
        b = checkIfFull(b);
      }
      return (a && b);
    }, true);
  }

  return checkIfFull(this);
};

document.addEventListener("DOMContentLoaded", function() {

  var EMPTY = null;
  var BOARD_SIZE = 3;

  // create the playing the playing board
  var board = new Board(BOARD_SIZE);
  board.init();

  // Player to select X or O
  var humanSymbol;
  do {
    humanSymbol = prompt('Play as X or O?', 'X').toUpperCase();
  } while (humanSymbol !== 'X' || humanSymbol !== 'O');

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
      if ( board.newWinner(newMove) || board.gameDrawn() ) {
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
    board.clear();
  }
});
