import range from 'lodash/range';
/* Rules: 
  
  1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.

  2. Any live cell with two or three live neighbours lives on to the next generation.

  3. Any live cell with more than three live neighbours dies, as if by over-population.

  4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. */

export class Cell {
  constructor(age=0) {
    this.age = age;
  }
}

// Calc # of neighbours in the cells hood
export const neighbours = (row, col, width, height, board) => {
  let count = 0;
  for (let r = row-1; r < row + 2; r++) {
    for (let c = col-1; c < col + 2; (r === row ? c += 2 : c++)) {
      count = !!board[(r + height) % height][(c + width) % width].age ? count + 1 : count;
    }
  }
  return count;
};

export const regenerateCell = (age, neighbours) => {
  // returns a new Cell, alive or dead based on it's age (int) and
  // number of neighbours (int) in its immediate vicinity
  if (!age && neighbours === 3) {
    // conditions are right; come alive!
    return new Cell(1);
  }
  if (!!age && neighbours >= 2 && neighbours <= 3) {
    // stay alive
    return new Cell(age + 1)
  }
  // perish
  return new Cell();
};

const board = (state=[], action) => {
  switch (action.type) {
    case 'REPRODUCE':
      const height = state.length
          , width = state[0].length;
      return state.map(
        (row, ri) => row.map(
          (cell, ci) => regenerateCell(
            cell.age, 
            neighbours(ri, ci, width, height, state)
          )
        )
      );

    case 'NEW_GAME':
      return range(action.height).map(
        row => range(action.width).map(
          c => new Cell(Math.floor(Math.random() * 2))
        )
      );
      
    case 'CLEAR_BOARD':
      return state.map(r => r.map(c => new Cell()));
      
    case 'TOGGLE_LIFE':
      return state.map((r, ri) => r.map((c, ci) => {
        if (action.row === ri && action.column === ci) {
          return new Cell(!!c.age ? 0 : 2)
        }
        return new Cell(c.age)
      }));
      
    default:
      return state;
  }
};

export default board;
