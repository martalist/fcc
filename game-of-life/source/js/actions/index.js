import * as t from '../constants';

const { medium } = t.SIZES;

export const newGame = (width = medium.width, height = medium.height) => ({
  type: t.NEW_GAME,
  width,
  height
});

export const reproduce = () => ({
  type: t.REPRODUCE
});

export const togglePlay = () => ({
  type: t.TOGGLE_PLAY
});

export const clearBoard = () => ({
  type: t.CLEAR_BOARD
});

export const changeSpeed = (speed) => ({
  type: t.CHANGE_SPEED,
  speed
});
