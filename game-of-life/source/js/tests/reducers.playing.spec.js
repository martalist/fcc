import expect from 'expect';
import playing from '../reducers/playing';
import { togglePlay } from '../actions';

describe('The Playing reducer', () => {

  it('should be true by default', () => {
    
    expect(
      playing(undefined, { type: undefined })
    ).toEqual(true);

  });

  it('should handle TOGGLE_PLAY', () => {

    expect(
      playing(true, togglePlay())
    ).toEqual(false);
    
    expect(
      playing(false, togglePlay())
    ).toEqual(true);
    
  });

});

