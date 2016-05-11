// { 'esversion': 6 };

var Game = function(strict=false) {
  this.strict = strict;
  this.buttons = Array.prototype.slice.call(document.getElementsByClassName('input'));
  this.sequence = [];
  this.userCorrectCount = 0;
  this.rounds = 20;
  this.presentingSequence = false;
  this.speed = 1000;
  this.msgBoard = document.getElementById('msg');
  this.level = document.getElementById('level');
  this.btn = {
    start: document.getElementById('start'),
    restart: document.getElementById('restart')
  };
};

Game.prototype.startNewGame = function() {
  this.sequence = [];
  this.userCorrectCount = 0;
  this.levelUp();
};

Game.prototype.levelUp = function() {
  // limit to 20 levels, to win the game
  if (this.sequence.length >= this.rounds) {
    this.showMessage('You win! ... starting a new game...');
    var baskInYourGlory = setTimeout( function(game) {
      game.startNewGame();
    }, this.speed * 2, this);
  }
  else {
    this.addToSequence();
    // display new level
    this.level.innerText = this.sequence.length;
    this.animateElements(this.sequence, true);
  }
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
        game.levelUp();
      }, this.speed * 2.5, this);
    }
    else {
      this.userCorrectCount++;
    }
  }
  else {
    // TODO: notify user of incorrect input
    this.showMessage('That is incorrect');
    var pauseToLetTheirFailureSinkIn = setTimeout(function(game) {
      if (game.strict) { this.startNewGame(); }
      else { game.animateElements(game.sequence, true); }
  }, this.speed * 2, this);
  }
};

Game.prototype.showMessage = function(msg) {
  this.msgBoard.innerText = msg;
  var remove = setTimeout( function(msgBoard) {
    msgBoard.innerText = '';
  }, this.speed * 2, this.msgBoard);
};

document.addEventListener('DOMContentLoaded', function() {
  var strict = false;

  // start game
  var game = new Game(strict);
  game.btn.start.addEventListener('click', function (e) {
    game.btn.start.disabled = true;
    game.btn.restart.disabled = false;
    game.startNewGame();
  });

  // restart
  game.btn.restart.addEventListener('click', function(e) {
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
