import { connect } from 'react-redux';
import Header from '../components/Header';
import { togglePlay, newGame, changeSpeed, clearBoard } from '../actions';

const mapStateToProps = state => ({
  speed: state.speed,
  playing: state.playing,
  generations: state.generations,
  boardWidth: state.board[0].length,
  boardHeight: state.board.length,
});

const mapDispatchToProps = dispatch => ({
  togglePlay: () => dispatch(togglePlay()),
  changeSpeed: (newSpeed) => dispatch(changeSpeed(newSpeed)),
  newGame: (width, height) => dispatch(newGame(width, height)),
  clearBoard: () => dispatch(clearBoard()),
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
