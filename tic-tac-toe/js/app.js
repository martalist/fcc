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
  // this.firstMove = true;
  this.computerMovesFirst = false;
  this.humansTurn = false;
  this.gameOver = true;
  this.solutions = [
    ['00', '01', '02'],
    ['00', '11', '22'],
    ['00', '10', '20'],
    ['01', '11', '21'],
    ['02', '11', '20'],
    ['02', '12', '22'],
    ['10', '11', '12'],
    ['20', '21', '22']
  ];
};

Board.prototype.startGame = function() {
  this.clearPositions(EMPTY);
  this.computerMovesFirst = !this.computerMovesFirst;
  this.humansTurn = !this.computerMovesFirst;
  this.gameOver = false;
  // this.firstMove = true;
  //
  // if (this.firstMove) {
  // // set who has first move
  // this.humansTurn = this.computerMovesFirst ? false : true;
  // this.firstMove = false;
  // }

  if (!this.humansTurn) {
    this.computerMove();
  }
};

Board.prototype.clearPositions = function(empty) {
  // clear this.positions
  function clear(arr) {
    newArr = arr.map( function(value, i) {
      var reset = Array.isArray(value) ? clear(arr[i]) : empty;
      return reset;
    });
    return newArr;
  }
  this.positions = clear(this.positions);

  // clear DOM
  var cells = Array.prototype.slice.call(document.getElementsByClassName('cell'));
  cells.forEach( function(cell) {
    cell.innerHTML = '';
  });
};

Board.prototype.addNewMarker = function(cell, marker, row, col) {
  // append to DOM
  var html = document.createElement("i");
  html.innerText = marker;
  cell.appendChild(html);

  // add to 'positions'
  this.positions[row][col] = marker;
};

Board.prototype.computerMove = function() {
  // Assess the positions on the board
  // Move to the most optimal position
  // return ['computer', board[row][column]]
  var computer = this.humanPlayer === 'X' ? 'O' : 'X';

  // random for now
  var row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (this.positions[row][col] !== EMPTY);

  var cell = document.getElementById([row, col].join(''));

  var computerIsThinking = setTimeout(function(board) {
    board.addNewMarker(cell, computer, row, col);
    board.evaluate('computer');
  }, 500, this);

};

Board.prototype.humanMove = function(cell) {
  var row = cell.id[0],
      col = cell.id[1];

  this.addNewMarker(cell, this.humanPlayer, row, col);

  // check game status
  this.evaluate('human');
};

Board.prototype.checkForWinner = function() {
  // returns the winning cells, as an array or strings
  // otherwise returns false
  var s = this.solutions;
  var p = this. positions;
  for (var i = 0; i < this.solutions.length; i++) {
    // get rows and columns each cell in the possilbe solution
    var r0 = s[i][0][0], c0 = s[i][0][1],
        r1 = s[i][1][0], c1 = s[i][1][1],
        r2 = s[i][2][0], c2 = s[i][2][1];
    if ((!!p[r0][c0]) && (p[r0][c0] === p[r1][c1]) && (p[r1][c1] === p[r2][c2])) {
      return s[i];
    }
  }
  return false;
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

Board.prototype.evaluate = function(lastPlayer) {
  var winner = this.checkForWinner();
  if ( !!winner ) {
    // Highlight winning cells
    var winningCells = Array.prototype.slice.call(document.getElementsByClassName('cell'))
        .filter( function(cell) {
          switch (cell.id) {
            case winner[0]:
            case winner[1]:
            case winner[2]:
              return true;
            default:
              return false;
          }
        });
    var showWinner = function(cells) {
      cells.forEach( function(cell) {
        cell.classList.toggle('winner');
      });
    };
    showWinner(winningCells);

    // After a delay, remove highlighting and start the next game
    var shortDelay = setTimeout(function(cells, board) {
      showWinner(cells);
      board.startGame();
    }, 1500, winningCells, this);
  }
  else if (this.hasNoEmptyCells()) {
    var anotherDelay = setTimeout(function(board) {
      board.startGame();
    }, 1500, this);
  }
  else {
    this.humansTurn = !this.humansTurn;
    if (!this.humansTurn) {
      // give computer a go
      this.computerMove();
    }
  }
};

document.addEventListener("DOMContentLoaded", function() {

  // create the playing the playing board
  var board = new Board(BOARD_SIZE, EMPTY);

  // fetch and display the modal window
  var modal = document.getElementsByClassName("modal-container")[0];
  var showModal = window.setTimeout(function() {
    modal.classList.toggle('active');
  }, 1);

  // Add event listener for X / O buttons
  var buttons = document.getElementsByTagName('button');
  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function (e) {
      board.humanPlayer = e.target.name;

      // hide modal
      modal.classList.toggle('active');

      board.startGame();
    });
  });

  // Add event listener for cells
  var cells = document.getElementsByClassName('cell');
  Array.prototype.forEach.call(cells, function (cell) {
    cell.addEventListener('click', function (e) {
      var row = cell.id[0],
          col = cell.id[1];

      if (!!board.positions[row][col]) {  // cell is already populated
        return;
      }
      else if (board.humansTurn) {        // computer's turn
        board.humanMove(cell);
      }
    });
  });

});
