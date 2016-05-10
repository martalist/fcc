// { 'esversion': 6 };

var Game = function(strict=false) {
  this.strict = strict;
  this.buttons = Array.prototype.slice.call(document.getElementsByClassName('input'));
  this.sequence = [];
  this.userInputIndex = 0;
  this.presentingSequence = false;
  this.speed = 1000;
};

Game.prototype.startNewGame = function() {
  this.sequence = [];
  this.userInputIndex = 0;
  this.levelUp();
};

Game.prototype.levelUp = function() {
  this.addToSequence();
  this.playSequence();
};

Game.prototype.addToSequence = function() {
  var index;
  // prevent the same item showing twice in a row
  do {
    index = Math.floor(Math.random() * 4);
  } while (this.sequence[this.sequence.length - 1] === this.buttons[index]);
  this.sequence.push( this.buttons[index] );
};

Game.prototype.playSequence = function() {
  this.presentingSequence = true;
  var i = 0;

  // activate first button
  this.sequence[i].classList.toggle('active');

  var interval = setInterval( function(sequence) {
    sequence[i].classList.toggle('active');     // turn off active btn
    if (i >= sequence.length - 1) {             // stop at the end of sequence
      clearInterval(interval);
    }
    else {
      i++;
      sequence[i].classList.toggle('active');   // turn on next
    }
  }, this.speed, this.sequence);

  this.presentingSequence = false;
};

Game.prototype.checkInput = function(input) {
  // animate user selection
  input.classList.toggle('active');
  var removeClass = setTimeout( function() {
    input.classList.toggle('active');
  }, this.speed );

  // check that user input matches next item in sequence
  var match = this.sequence[this.userInputIndex] === input;
  if (match) {
    // TODO: show a success indicator (like a gree thumbs up, or something)
    // check if user successfully reached the end of the sequence
    if (this.userInputIndex === this.sequence.length - 1) {
      this.userInputIndex = 0;
      var pause = setTimeout(function(game) {
        game.addToSequence(); // TODO: limit to 20 in sequence, to win the game
        game.playSequence();
      }, 1500, this);
    }
    else {
      this.userInputIndex++;
    }
  }
  else {
    // TODO: notify user of incorrect input
    var pauseToLetTheirFailureSinkIn = setTimeout(function(game) {
      if (game.strict) { this.startNewGame(); }
      else { game.playSequence(); }
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
