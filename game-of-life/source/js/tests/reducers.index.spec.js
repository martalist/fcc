import expect from 'expect';
import game from '../reducers';

describe('The root reducer', function() {

  it('should contain "board", "playing"', function() {

    expect(
      game(undefined, { type: undefined })
    ).toIncludeKeys([
      'board', 
      'playing'
    ]);
  });

});
