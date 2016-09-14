import expect from 'expect';
import speed from '../reducers/speed';
import { changeSpeed } from '../actions';
import { MIN_SPEED, MAX_SPEED } from '../constants';

describe('The Speed reducer', () => {

  it('should be 250ms by default', () => {
    
    expect(
      speed(undefined, { type: undefined })
    ).toEqual(250);

  });

  it('should handle CHANGE_SPEED', () => {

    expect(
      speed(250, changeSpeed(300))
    ).toEqual(300);
    
    expect(
      speed(300, changeSpeed(100))
    ).toEqual(100);
    
  });

  it('CHANGE_SPEED should be bound by MIN_SPEED and MAX_SPEED', () => {

    expect(
      speed(250, changeSpeed(-300))
    ).toEqual(MIN_SPEED);
    
    expect(
      speed(300, changeSpeed(3000))
    ).toEqual(MAX_SPEED);
    
  });

});


