describe("new Game", function() {
  var game;
  beforeEach( function() {
    game = new Game();
  });

  it("has a an empty sequence list", function() {
    expect(Array.isArray(game.sequence)).toBe(true);
    expect(game.sequence.length).toBe(0);
  });

  it("has expected properties", function () {
    expect(game.hasOwnProperty('buttons')).toBe(true);
    expect(game.userInputIndex).toBe(0);
    expect(game.hasOwnProperty('speed')).toBe(true);
    expect(game.hasOwnProperty('presentingSequence')).toBe(true);
    expect(game.hasOwnProperty('strict')).toBe(true);
  });
});

describe("new Game", function() {
  var game;
  beforeEach( function() {
    game = new Game();
  });

  it("has a an empty sequence list", function() {
    expect(Array.isArray(game.sequence)).toBe(true);
    expect(game.sequence.length).toBe(0);
  });
});
