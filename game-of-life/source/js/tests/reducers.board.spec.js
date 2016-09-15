import expect from 'expect';
import range from 'lodash/range';
import deepfreeze from 'deepfreeze';
import board, { Cell, neighbours, regenerateCell } from '../reducers/board';
import { newGame, reproduce, clearBoard, toggleLife } from '../actions';

describe('A cell', () => {

  it('should have an age property', () => {
    expect(new Cell).toIncludeKey('age');
    expect((new Cell).age)
      .toBeGreaterThanOrEqualTo(0)
      .toBeLessThanOrEqualTo(2);
  });
});

describe('A cell, on REPRODUCE', () => {

  it('if dead, should resurect with exactly 3 live neighbours', () => {
    
    expect(
      regenerateCell(0, 3).age
    ).toEqual(1)
    
    // make sure it stays dead with any other number
    expect(
      regenerateCell(0, 2).age
    ).toEqual(0)
    
    expect(
      regenerateCell(0, 4).age
    ).toEqual(0)
  });

  it('if alive, should die with fewer than 2 neighbours', () => {
    
    expect(
      regenerateCell(1, 1).age
    ).toEqual(0)
  });

  it('if alive, should survive with 2 or 3 neighbours', () => {
    
    expect(
      regenerateCell(2, 2).age
    ).toEqual(3)
    
    expect(
      regenerateCell(1, 3).age
    ).toEqual(2)
  });

  it('if alive, should die with more than 3 neighbours', () => {

    expect(
      regenerateCell(1, 4).age
    ).toEqual(0)
  });
});

describe('A cell, on TOGGLE_LIFE', function() {
  let tinyBoard;

  beforeEach(function() {
    tinyBoard = [
      [new Cell()], 
      [new Cell(1)]
    ];
  });

  it('should come to life, if it is dead', function() {

    expect(tinyBoard[0][0].age).toEqual(0);
    tinyBoard = board(tinyBoard, toggleLife(0, 0));
    expect(tinyBoard[0][0].age).toEqual(2);
    expect(tinyBoard[1][0].age).toEqual(1);
   
  });

  it('should die, if it is alive', function() {
    
    expect(tinyBoard[1][0].age).toEqual(1);
    tinyBoard = board(tinyBoard, toggleLife(1, 0));
    expect(tinyBoard[1][0].age).toEqual(0);
    
  });
});

describe('The board', () => {

  const WIDTH = 5
      , HEIGHT = 5
      , initBoard = board([], newGame(WIDTH,HEIGHT));
  deepfreeze(initBoard);

  it('should handle initial state', function() {
    const fromUndefined = board(undefined, newGame(WIDTH, HEIGHT));
    
    expect(fromUndefined.length).toEqual(WIDTH);
    expect(fromUndefined[0].length).toEqual(HEIGHT);
    expect(fromUndefined[0][0]).toBeA(Cell);
  });

  it('NEW_GAME should generate a new board', () => {

    expect(initBoard.length).toEqual(WIDTH);
    expect(initBoard[0].length).toEqual(HEIGHT);
    expect(initBoard[0][0]).toBeA(Cell);
    expect(initBoard[WIDTH - 1][HEIGHT - 1]).toBeA(Cell);

  });

  it('REPRODUCE should generate a new object (board)', () => {

    const newBoard = board(initBoard, reproduce());

    expect(newBoard).toNotEqual(initBoard);
    expect(newBoard.length).toEqual(WIDTH);
    expect(newBoard[0].length).toEqual(HEIGHT);
    expect(newBoard[0][0]).toBeA(Cell);

  });

  it('CLEAR_BOARD should kill all cells', () => {

    const init = board([], newGame(10, 10))
        , newBoard = board(init, clearBoard());

    expect(
      newBoard.reduce((total, row) => {
        return row.reduce((count, cell) => cell.age + count, 0) + total
      }, 0)
    ).toEqual(0);

    expect(newBoard.length).toEqual(10);
    expect(newBoard[0].length).toEqual(10);
    expect(newBoard[0][0]).toBeA(Cell);
  });
});

describe('neighbours function', () => {

  const board = range(3).map(row => range(3).map(cell => new Cell()));

  it('should calculate the correct number of neighbours per cell', () => {
    let newBoard = board.slice();
    newBoard[1][1].age = 1;
    const height = newBoard.length
        , width = newBoard[0].length;
    // const decorated = decorateBoard(newBoard);

    expect(
      neighbours(1, 1, width, height, newBoard)
    ).toEqual(0);

    expect(
      neighbours(0, 0, width, height, newBoard)
    ).toEqual(1);

    newBoard[0][1].age = 2;

    expect(
      neighbours(1, 1, width, height, newBoard)
    ).toEqual(1);

    expect(
      neighbours(1, 0, width, height, newBoard)
    ).toEqual(2);

    expect(
      neighbours(2, 1, width, height, newBoard)
    ).toEqual(2);

  });
});

/* const b1 = board(undefined, newGame(5, 5));
console.log(boardToString(b1), '\n')
const b2 = board(b1, reproduce());
console.log(boardToString(b2), '\n');
const b3 = board(b2, reproduce());
console.log(boardToString(b3), '\n');
const b4 = board(b3, reproduce());
console.log(boardToString(b4), '\n'); */

function boardToString(board) {
  return board.reduce(
    (output, row) => output + row.reduce(
      (line, cell) => line + ` ${(!!cell.age ? (cell.age > 1 ? '@' : 'O') : '.')} `
      , ""
    ) + '\n'
    , ""
  );
}
