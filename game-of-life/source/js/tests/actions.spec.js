import expect from 'expect';
import * as t from '../constants';
import { newGame, reproduce, togglePlay, clearBoard, changeSpeed, toggleLife } from '../actions';

describe('Game of Life actions', () => {

  it('newGame should return a NEW_GAME action', () => {

    expect(newGame()).toEqual({
      type: 'NEW_GAME',
      width: t.SIZES.medium.width,
      height: t.SIZES.medium.height,
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

  it('toggleLife should return a TOGGLE_LIFE action', () => {

    expect(toggleLife(11, 31)).toEqual({
      type: 'TOGGLE_LIFE',
      row: 11,
      column: 31
    });
  });

});
