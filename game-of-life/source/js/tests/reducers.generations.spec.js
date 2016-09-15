import expect from 'expect';
import generations from '../reducers/generations';
import { reproduce, newGame, clearBoard } from '../actions';

describe('The Speed reducer', () => {

  it('should be 1 by default', () => {
    
    expect(
      generations(undefined, { type: undefined })
    ).toEqual(1);

  });

  it('should increment by 1 with REPRODUCE', () => {

    expect(
      generations(250, reproduce())
    ).toEqual(251);
    
    expect(
      generations(1293029382, reproduce())
    ).toEqual(1293029383);
    
  });

  it('should reset to 1 when the board changes size', () => {

    expect(
      generations(250, newGame(30, 30))
    ).toEqual(1);
    
  });

  it('should reset to 1 when the board is cleared', function() {

    expect(
      generations(250, clearBoard())
    ).toEqual(1);
  });

});



