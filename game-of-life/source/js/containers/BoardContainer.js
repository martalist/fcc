import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleLife, reproduce } from '../actions';
import Board from '../components/Board';

class BoardContainer extends Component {
  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearTimeout(this.tick);
  }

  tick() {
    const { playing, reproduce } = this.props;
    this.speed = this.props.speed;
    setTimeout((board) => {
      if (playing) {
        reproduce();
      }
      board.tick();
    }, this.speed, this);
  }
  
  render() {
    const { board, toggleLife } = this.props
    return <Board 
        board={board}
        toggleLife={toggleLife}
      />
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
  playing: state.playing,
  speed: state.speed,
});

const mapDispatchToProps = (dispatch) => ({
  toggleLife: (row, column) => dispatch(toggleLife(row, column)),
  reproduce: () => dispatch(reproduce()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);
