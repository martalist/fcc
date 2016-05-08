function checkIfEmpty(arr) {
  return arr.reduce( function(a, b) {
    if (Array.isArray(b)) { var newB = checkIfEmpty(b); return (a && newB); }
    return (a && !b);
  }, true);
}

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
