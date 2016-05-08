// Board constructor function. Creates an empty board, width/height = size
var Board = function(size) {
  // inherit from Array
  Array.call(this);
  this.length = size;
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


document.addEventListener("DOMContentLoaded", function() {

  var EMPTY = null;
  var BOARD_SIZE = 3;

  // define the playing board
  var board = new Board(BOARD_SIZE);
  board.init();

  // Player to select X or O
  // while (true):
    // Start game
      // Show who's move it is on screen
    // while (game is not drawn && game is not won)
      // Make computers move (calculate best position)
        // Check for winning move
      // Allow user to make their move
        // check for winning move
    // start new game, with alternate player getting first move

  board.clear();
});
