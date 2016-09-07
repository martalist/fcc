import expect from 'expect';
import range from 'lodash/range';
import deepfreeze from 'deepfreeze';
import board, { Cell, neighbours, regenerateCell } from '../reducers/board';
import { newGame, reproduce } from '../actions';

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

describe('The board', () => {

  const WIDTH = 30
      , HEIGHT = 30
      , initBoard = board([], newGame(WIDTH,HEIGHT));
  deepfreeze(initBoard);

  it('should handle initial state')
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
