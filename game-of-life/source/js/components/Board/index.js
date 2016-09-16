import React, { Component, PropTypes } from 'react';
import Cell from '../Cell';
import { SIZES } from '../../constants';
import './index.scss';

function boardClass(numberOfCells) {
  const sm = SIZES.small.width * SIZES.small.height
      , lg = SIZES.large.width * SIZES.large.height;

  if (numberOfCells === sm) {
    return "small";
  }

  if (numberOfCells === lg) {
    return "large";
  }

  return "";
}


class Board extends Component {
  render() {
    const { board, toggleLife } = this.props
        , width = board[0].length
        , height = board.length
        , currentSize = boardClass(width * height);
    
    return (
      <div className={"board-skirting " + currentSize}>
        <div className={"board " + currentSize}>
          {board.map((row, ri) => row.map((cell, ci) => (
            <Cell 
              key={ri + ',' + ci}
              age={cell.age}
              onClick={() => toggleLife(ri, ci)}
            />
          )))}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  toggleLife: PropTypes.func.isRequired,
};

export default Board;
