import deepfreeze from 'deepfreeze';

// generate a new game, with random objects
export const NEW_GAME = 'NEW_GAME'; 

// The main game event
export const REPRODUCE = 'REPRODUCE';

// controls
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const CHANGE_SPEED = 'CHANGE_SPEED';
export const MIN_SPEED = 16;
export const MAX_SPEED = 500;

// allow user to set cells
export const TOGGLE_LIFE = 'TOGGLE_LIFE';

// Board sizes
export const SIZES = {  
  small: {
    label: "Small",
    width: 32,
    height: 18,
  },
  medium: {
    label: "Medium",
    width: 48,
    height: 27,
  },
  large: {
    label: "Large",
    width: 64,
    height: 36,
  }
};
