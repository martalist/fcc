import { MIN_SPEED, MAX_SPEED } from '../constants';

const speedLimit = speed => {
  return speed < MIN_SPEED ?
    MIN_SPEED : 
    (speed > MAX_SPEED ? MAX_SPEED : speed);
};

const speed = (state = 250, action) => {
  switch (action.type) {
    case 'CHANGE_SPEED':
      return speedLimit(action.speed);
    default:
      return state;
  }
};

export default speed;
