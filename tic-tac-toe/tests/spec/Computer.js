var board, computer;
beforeEach(function() {
  board = new Board(3);
  board.humanPlayer = 'X';
  computer = new Computer(board);
  board.computer = computer;
});

describe("new Computer", function() {

  it("has an associated board", function() {
    expect(computer.board.positions).toBeDefined(true);
  });

  it("has a marker the opposite of the human player", function () {
    if (board.humanPlayer === 'X') {
      expect(computer.marker).toBe('O');
    }
    else {
      expect(computer.marker).toBe('X');
    }
  });
});

describe("Computer can", function() {
  beforeEach(function() {
    board.clearPositions();
  });

  it("find no cause for concern when there's <= 1 oponent marker on the board", function () {
    expect(computer.detectImminentFailure()).toBe(false);
    board.positions[0][0] = 'X';
    expect(computer.detectImminentFailure()).toBe(false);
  });

  it("see when the human is about to win a row, and play defensively", function () {
    board.positions[0][0] = 'X';
    board.positions[0][1] = 'X';
    expect(computer.detectImminentFailure()).toBe('02');
  });

  it("see when the human is about to win a column, and play defensively", function () {
    board.positions[0][1] = 'X';
    board.positions[2][1] = 'X';
    expect(computer.detectImminentFailure()).toBe('11');
  });

  it("recognise a full line, and ignore it", function () {
    board.positions[0][1] = 'X';
    board.positions[1][1] = 'O';
    board.positions[2][1] = 'X';
    expect(computer.detectImminentFailure()).toBe(false);
  });
});
