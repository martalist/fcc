// { "esversion": 6 };
var BOARD_SIZE = 3;
var EMPTY = null;

// Board constructor function. Creates an empty board, width/height = size
var Board = function(size, empty=EMPTY) {
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
  this.computerMovesFirst = false;
  this.humansTurn = false;
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
  if (!this.humansTurn) {
    this.computerMove();
  }
};

Board.prototype.clearPositions = function(empty=EMPTY) {
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
  var move = this.computer.makeAMove(this),
      cell = document.getElementById(move),
      row = move[0],
      col = move[1];

  var computerIsThinking = setTimeout(function(board) {
    board.addNewMarker(cell, board.computer.marker, row, col);
    board.evaluate();
  }, 500, this);

};

Board.prototype.humanMove = function(cell) {
  var row = cell.id[0],
      col = cell.id[1];

  this.addNewMarker(cell, this.humanPlayer, row, col);

  // check game status
  this.evaluate();
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

Board.prototype.evaluate = function() {
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

var Computer = function(board) {
  this.board = board;
  this.marker = board.humanPlayer === 'X' ? 'O' : 'X';
};

Computer.prototype.detectImminentFailure = function(board=this.board) {
  var nextMove;

  // iterate through the possible winning cell-sets
  board.solutions.forEach(function(solution) {

    // map cells to cell ids for this cell-set
    var cells = { 'empty': [], 'X': [], 'O':[] };
    solution.forEach(function(id) {
      var cell = board.positions[id[0]][id[1]];
      if (cell === EMPTY) { cells.empty.push(id); }
      else { cells[cell].push(id); }
    });

    // if the human has 2 markers in line, and there's an empty 3rd cell...
    if (cells[board.humanPlayer].length === 2 && cells.empty.length === 1) {
      nextMove = cells.empty[0];
    }
  });
  return (!!nextMove ? nextMove : false);
};

Computer.prototype.makeAMove = function(board=this.board) {
  // returns a cell id for Board to position a marker if defenseive action required
  // otherwise picks a cell randomly
  var defence = this.detectImminentFailure(board);
  if (!!defence) {
    return defence;
  }

  var row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (board.positions[row][col] !== EMPTY);

  return [row, col].join('');
};


document.addEventListener("DOMContentLoaded", function() {
  // create the playing the playing board
  var board = new Board(BOARD_SIZE, EMPTY);

  // fetch and display the modal window on page load
  var modalBackground = document.getElementsByClassName("modal-container")[0];
  var modal = document.getElementsByClassName("modal")[0];
  var show = window.setTimeout(function() {
    modalBackground.classList.toggle('dim');
    modal.classList.toggle('modal-active');
  }, 1);

  // Set user's choice of marker (X or O)
  var buttons = document.getElementsByTagName('button');
  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function (e) {
      board.humanPlayer = e.target.name;
      board.computer = new Computer(board);

      // hide modal
      modalBackground.classList.toggle('dim');
      modal.classList.toggle('modal-active');

      board.startGame();
    });
  });

  // Monitor for user cell selection, and act appropriately
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
