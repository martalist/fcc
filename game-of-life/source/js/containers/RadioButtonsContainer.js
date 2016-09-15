import { connect } from 'react-redux';
import { newGame } from '../actions';
import RadioButtons from '../components/RadioButtons';

const mapStateToProps = state => ({
  boardWidth: state.board[0].length,
  boardHeight: state.board.length,
});

const mapDispatchToProps = dispatch => ({
  onChange: (width, height) => dispatch(newGame(width, height)),
});

const RadioButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioButtons);

export default RadioButtonsContainer;


