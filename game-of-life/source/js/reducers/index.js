import { combineReducers } from 'redux';
import board from './board';
import playing from './playing';
import speed from './speed';
import generations from './generations';

/* State should look something like this:
  {
    board: [
      [{ age: 0 }, { age: 1 }, { age: 0 }, ... ],
      [ ... ],
      ...
    ],
    playing: true,
    speed: 500,
    size: {width: 50, height: 30}
  }
 */

const game = combineReducers({
  board,
  playing,
  speed,
  generations,
});

export default game;
