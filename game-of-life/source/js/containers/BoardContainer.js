import React from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;
