import { connect } from 'react-redux';
import Header from '../components/Header';
import { togglePlay, changeSpeed } from '../actions';

const mapStateToProps = state => ({
  speed: state.speed,
  playing: state.playing,
  generations: state.generations,
});

const mapDispatchToProps = dispatch => ({
  togglePlay: () => dispatch(togglePlay()),
  changeSpeed: (newSpeed) => dispatch(changeSpeed(newSpeed)),
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
