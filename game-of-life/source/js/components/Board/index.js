import React, { Component, PropTypes } from 'react';
import Cell from '../Cell';
// import './index.scss';

const boardStyles = {
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap"
};

class Board extends Component {
  render() {
    const { board, width, height } = this.props;
    const arrHeight = board.length
        , arrWidth = board[0].length
        , cellHeight = 100 / arrHeight
        , cellWidth = 100 / arrWidth;
    return (
      <div 
        className="board"
        style={Object.assign({}, boardStyles, {width, height})}
      >
        {board.map((row, ri) => row.map((cell, ci) => (
          <Cell 
            key={ri + ',' + ci}
            age={cell.age}
            style={{
              "width": cellWidth + '%',
              "height": cellHeight + '%'
            }}
          />
        )))}
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
};

Board.defaultProps = {
  width: 500,
  height: 500
};

export default Board;
