import expect from 'expect';
import { newGame, reproduce, togglePlay, clearBoard, changeSpeed } from '../actions';

describe('Game of Life actions', () => {

  it('newGame should return a NEW_GAME action', () => {

    expect(newGame()).toEqual({
      type: 'NEW_GAME',
      width: 30,
      height: 30
    });

    expect(newGame(50, 100)).toEqual({
      type: 'NEW_GAME',
      width: 50,
      height: 100
    });
  });

  it('reproduce should return a REPRODUCE action', () => {

    expect(reproduce()).toEqual({
      type: 'REPRODUCE'
    });
  });

  it('togglePlay should return a TOGGLE_PLAY action', () => {

    expect(togglePlay()).toEqual({
      type: 'TOGGLE_PLAY'
    });
  });


  it('clearBoard should return a CLEAR_BOARD action', () => {

    expect(clearBoard()).toEqual({
      type: 'CLEAR_BOARD'
    });
  });

  it('changeSpeed should return a CHANGE_SPEED action', () => {

    expect(changeSpeed(300)).toEqual({
      type: 'CHANGE_SPEED',
      speed: 300
    });
  });
});
