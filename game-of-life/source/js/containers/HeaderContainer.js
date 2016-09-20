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

const mapDispatchToProps = {
  togglePlay,
  changeSpeed,
  newGame,
  clearBoard,
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
