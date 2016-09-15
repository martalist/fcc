import React from 'react';
import { connect } from 'react-redux';
import { toggleLife } from '../actions';
import Board from '../components/Board';

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({
  toggleLife: (row, column) => dispatch(toggleLife(row, column)),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;
