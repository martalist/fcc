import React, { Component, PropTypes } from 'react';
import Cell from '../Cell';
import './index.scss';

class Board extends Component {
  render() {
    const { board } = this.props;
    return (
      <div className="board" >
        {board.map((row, ri) => row.map((cell, ci) => (
          <Cell 
            key={ri + ',' + ci}
            age={cell.age}
          />
        )))}
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
};

export default Board;
