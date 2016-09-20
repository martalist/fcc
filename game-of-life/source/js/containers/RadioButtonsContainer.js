import { connect } from 'react-redux';
import { newGame } from '../actions';
import RadioButtons from '../components/RadioButtons';

const mapStateToProps = state => ({
  boardWidth: state.board[0].length,
  boardHeight: state.board.length,
});

// Longhand mapDispatchToProps
// const mapDispatchToProps = dispatch => ({
  // onChange: (width, height) => dispatch(newGame(width, height)),
// });

const RadioButtonsContainer = connect(
  mapStateToProps,
  { onChange: newGame }   // shorthand mapDispatchToProps
)(RadioButtons);

export default RadioButtonsContainer;


