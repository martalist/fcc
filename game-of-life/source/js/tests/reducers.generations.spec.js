import expect from 'expect';
import generations from '../reducers/generations';
import { reproduce } from '../actions';

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

});



