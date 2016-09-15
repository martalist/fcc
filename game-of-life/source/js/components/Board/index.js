import React, { Component, PropTypes } from 'react';
import Cell from '../Cell';
import './index.scss';

class Board extends Component {
  render() {
    const { board, toggleLife } = this.props;
    return (
      <div className="board" >
        {board.map((row, ri) => row.map((cell, ci) => (
          <Cell 
            key={ri + ',' + ci}
            age={cell.age}
            onClick={() => toggleLife(ri, ci)}
          />
        )))}
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  toggleLife: PropTypes.func.isRequired,
};

export default Board;
