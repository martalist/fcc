import { combineReducers } from 'redux';
import board from './board';
import playing from './playing';

/* State should look something like this:
  {
    board: [
      [{ age: 0 }, { age: 1 }, { age: 0 }, ... ],
      [ ... ],
      ...
    ],
    playing: true,
    speed: 500,
    size: [50, 30]
  }
 */

const game = combineReducers({
  board,
  playing,
});

export default game;
