// { 'esversion': 6 };

var Game = function(strict=false) {
  this.strict = strict;
  this.buttons = Array.prototype.slice.call(document.getElementsByClassName('input'));
  this.sequence = [];
  this.userCorrectCount = 0;
  this.rounds = 20;
  this.progress = [];
  this.presentingSequence = false;
  this.speed = 1000;
  this.msgBoard = document.getElementById('msg');
  this.level = document.getElementById('level');
  this.btn = {
    start: document.getElementById('start'),
    restart: document.getElementById('restart')
  };
  this.sounds = {
    monkey: new Audio('files/monkey.mp3'),
    dog: new Audio('files/dog.mp3'),
    pig: new Audio('files/pig.mp3'),
    elephant: new Audio('files/elephant.mp3')
  };
};

Game.prototype.startNewGame = function() {
  this.sequence = [];
  this.removeIndicators();
  this.userCorrectCount = 0;
  this.showMessage('start', 'Starting a new game.');
  var wait = setTimeout(function(game) {
    game.levelUp();
  }, this.speed * 2.2, this);
};

Game.prototype.levelUp = function() {
  // limit to 20 levels, to win the game
  if (this.sequence.length >= this.rounds) {
    this.showMessage('success', 'You win! ... starting a new game...');
    var baskInYourGlory = setTimeout( function(game) {
      game.startNewGame();
    }, this.speed * 2, this);
  }
  else {
    this.addToSequence();
    // display new level
    this.level.innerText = this.sequence.length;
    this.resetIndicators();
    this.addIndicator();

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
  if (isSequence) {
    this.presentingSequence = true;
    this.showMessage('playing', "Playing now. Watch carefully!");
  }
  var wait,
      arr = elems.slice(0),                         // copy array, to prevent sequence mutation
      elem = arr.shift(),                           // get first elem
      animal = elem.id;
  elem.classList.toggle('active');
  this.sounds[animal].play();
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
    // Show a success indicator
    this.progress[this.userCorrectCount].classList.add('correct');

    // check if user successfully reached the end of the sequence
    if (this.userCorrectCount === this.sequence.length - 1) {
      this.userCorrectCount = 0;          // reset the counter
      var resetIndicators = setTimeout( function(game) {
        game.resetIndicators();           // reset the visual success indicators
      }, this.speed * 1.5, this);
      var levelUp = setTimeout(function(game) {
        game.levelUp();                   // progress to the next level
      }, this.speed * 2.5, this);
    }
    else {
      this.userCorrectCount++;
    }
  }
  else {
    // notify user of incorrect input
    this.showMessage('error', 'That is incorrect');
    this.presentingSequence = true;       // prevent more incorrect inputs
    this.resetIndicators();
    this.userCorrectCount = 0;
    var pauseToLetTheirFailureSinkIn = setTimeout(function(game) {
      if (game.strict) { game.startNewGame(); }
      else { game.animateElements(game.sequence, true); }
  }, this.speed * 2.5, this);
  }
};

Game.prototype.showMessage = function(msgType, msg) {
  var status = {
    error: 'fa-exclamation-triangle',
    success: 'fa-trophy',
    playing: 'fa-play',
    start: 'fa-cog'
  };

  // Set the message
  var icon = this.msgBoard.querySelectorAll('i')[0],
      text = this.msgBoard.querySelectorAll('p')[0];
  icon.classList = 'fa ' + status[msgType];
  text.innerText = msg;
  this.msgBoard.classList.add(msgType);
  this.msgBoard.classList.add('on-screen');
  var remove = setTimeout( function(msgBoard) {
    msgBoard.classList = 'msg';
  }, this.speed * 2, this.msgBoard);
};

Game.prototype.addIndicator = function() {
  var i = document.createElement('div');
  i.classList.add('progress');
  document.getElementsByClassName('progress-bar')[0].appendChild(i);
  this.progress.push(i);
  var oneMoment = setTimeout(function() {
    i.classList.add('inserted');
  }, 10);
};

Game.prototype.resetIndicators = function() {
  this.progress.forEach( function(elem) {
    elem.classList.remove('correct');
  });
};

Game.prototype.removeIndicators = function() {
  while (this.progress.length > 0 ) {
    var elem = this.progress.pop();
    elem.parentNode.removeChild(elem);
  }
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

  // get & set strict mode
  document.getElementsByTagName('input')[0].addEventListener('change', function(e) {
    game.strict = e.target.checked;
  });

  // other functions:
    // speed adjustment
});
