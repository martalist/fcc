// { 'esversion': 6 };

var Game = function(strict=false) {
  this.strict = strict;
  this.buttons = Array.prototype.slice.call(document.getElementsByClassName('input'));
  this.sequence = [];
  this.userCorrectCount = 0;
  this.presentingSequence = false;
  this.speed = 1000;
};

Game.prototype.startNewGame = function() {
  this.sequence = [];
  this.userCorrectCount = 0;
  this.levelUp();
};

Game.prototype.levelUp = function() {
  this.addToSequence();
  this.animateElements(this.sequence, true);
};

Game.prototype.addToSequence = function() {
  var index;
  // prevent the same item showing twice in a row
  do {
    index = Math.floor(Math.random() * 4);
  } while (this.sequence[this.sequence.length - 1] === this.buttons[index]);
  this.sequence.push( this.buttons[index] );
};

Game.prototype.animateElements = function(elems, isSequence=false) {
  // elems, Array of DOM elements to animate
  // recursively displays elements
  if (isSequence) { this.presentingSequence = true; }
  var wait,
      arr = elems.slice(0),                         // copy array, to prevent sequence mutation
      elem = arr.shift();                           // get first elem
  elem.classList.toggle('active');                  // add class
  wait = setTimeout( function(game, arr) {          // pause, then remove it
    elem.classList.toggle('active');
    if (arr.length === 0) {
      if (isSequence) {
      game.presentingSequence = false;              // presentation over
      }
    }
    else {
      return game.animateElements(arr, isSequence); // proceed to next elems
    }
  }, this.speed, this, arr);
};

Game.prototype.checkInput = function(input) {
  // animate user selection
  this.animateElements([input]);

  // check that user input matches next item in sequence
  var correct = this.sequence[this.userCorrectCount] === input;
  if (correct) {
    // TODO: show a success indicator (like a gree thumbs up, or something)
    // check if user successfully reached the end of the sequence
    if (this.userCorrectCount === this.sequence.length - 1) {
      this.userCorrectCount = 0;
      var pause = setTimeout(function(game) {
        game.levelUp(); // TODO: limit to 20 in sequence, to win the game
      }, 2500, this);
    }
    else {
      this.userCorrectCount++;
    }
  }
  else {
    // TODO: notify user of incorrect input
    var pauseToLetTheirFailureSinkIn = setTimeout(function(game) {
      if (game.strict) { this.startNewGame(); }
      else { game.animateElements(this.sequence, true); }
  }, 1000, this);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var strict = false;

  // start game
  var game = new Game(strict);
  var startBtn = document.getElementById('start');
  start.addEventListener('click', function (e) {
    startBtn.disabled = true;
    game.startNewGame();
  });

  // listen for user's input (four buttons)
  game.buttons.forEach( function(input) {
    input.addEventListener('click', function(e) {
      if (game.presentingSequence || game.sequence.length === 0) {
        return;
      }
      else {
        game.checkInput(input);
      }
    });
  });

  // other functions:
    // restart button
    // speed adjustment
});
