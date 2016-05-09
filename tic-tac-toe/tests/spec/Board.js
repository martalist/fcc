describe("new Board", function() {
  var board;
  beforeEach(function() {
    board = new Board(3);
  });

  it("has a 'positions' property", function() {
    expect(board.positions).toBeDefined(true);
  });

  it("positions has three rows", function () {
    expect(board.positions.length).toBe(3);
  });

  it("positions has three columns", function () {
    var cols = board.positions.reduce( function(a, b) {
      return a + b.length;
    }, 0);
    expect(cols / BOARD_SIZE).toBe(BOARD_SIZE);
  });

  it("all cells are empty", function () {
    expect(checkIfEmpty(board.positions)).toBe(true);
  });
});

describe("cleared Board", function() {
  var board;
  beforeEach(function() {
    board = new Board(BOARD_SIZE);
    board.positions[0][0] = "X";
    board.positions[BOARD_SIZE - 1][BOARD_SIZE - 1] = "O";
    board.positions[1][1] = 23;
    board.positions[1][0] = 'hello';
    board.clearPositions();
  });

  it("has a 'positions' property", function() {
    expect(board.positions).toBeDefined(true);
  });

  it("has three rows", function () {
    expect(board.positions.length).toBe(3);
  });

  it("has three columns", function () {
    var cols = board.positions.reduce( function(a, b) {
      return a + b.length;
    }, 0);
    expect(cols / BOARD_SIZE).toBe(BOARD_SIZE);
  });

  it("cells are empty", function () {
    expect(checkIfEmpty(board.positions)).toBe(true);
  });
});

describe("game drawn", function() {
  var board;
  beforeEach(function() {
    board = new Board(BOARD_SIZE);
  });

  it("is false when all cells are empty", function () {
    expect(board.hasNoEmptyCells()).toBe(false);
  });

  it("is false when one row is full, all others empty", function () {
    board.positions[0] = board.positions[0].map(function(v) {
      return 'X';
    });
    expect(board.hasNoEmptyCells()).toBe(false);
  });

  it("is true when all cells are full", function() {
    for (var i = 0; i < BOARD_SIZE; i++) {
      for (var j = 0; j < BOARD_SIZE; j++) {
        board.positions[i][j] = 'X';
      }
    }
    expect(board.hasNoEmptyCells()).toBe(true);
  });
});

describe('Game won', function() {
  var board;
  beforeEach(function() {
    board = new Board(BOARD_SIZE);
  });

  it("with an empty board === false", function () {
    expect(board.checkForWinner()).toBe(false);
  });

  it("when two in a row === false", function () {
    board.positions[0][0] = 'X';
    board.positions[0][1] = 'X';
    expect(board.checkForWinner()).toBe(false);

    board.positions[0][1] = 'O';
    expect(board.checkForWinner()).toBe(false);
  });

  it("with three of a kind in a row", function () {
    board.positions[0][0] = 'X';
    board.positions[0][1] = 'X';
    board.positions[0][2] = 'X';
    expect(board.checkForWinner()).toBeTruthy();
  });

  it("with three in a row, of differing kinds === false", function () {
    board.positions[0][0] = 'X';
    board.positions[0][1] = 'O';
    board.positions[0][2] = 'X';
    expect(board.checkForWinner()).toBe(false);
  });

  it("with three of a kind in a column", function () {
    board.positions[0][1] = 'X';
    board.positions[1][1] = 'X';
    board.positions[2][1] = 'X';
    expect(board.checkForWinner()).toBeTruthy();
  });

  it("with three of differing kinds in a column === false", function () {
    board.positions[0][1] = 'X';
    board.positions[1][1] = 'X';
    board.positions[2][1] = ')';
    expect(board.checkForWinner()).toBe(false);
  });

  it("with three of a kind diagonal", function () {
    board.positions[0][0] = 'X';
    board.positions[1][1] = 'X';
    board.positions[2][2] = 'X';
    expect(board.checkForWinner()).toBeTruthy();
  });

});
