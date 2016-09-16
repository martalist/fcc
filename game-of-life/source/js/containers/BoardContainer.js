import React from 'react';
import { connect } from 'react-redux';
import { toggleLife, reproduce } from '../actions';
import Board from '../components/Board';

const mapStateToProps = (state) => ({
  board: state.board,
  playing: state.playing,
  speed: state.speed,
});

const mapDispatchToProps = (dispatch) => ({
  toggleLife: (row, column) => dispatch(toggleLife(row, column)),
  reproduce: () => dispatch(reproduce()),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;
