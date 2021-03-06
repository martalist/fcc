// 'use strict';
'esversion: 6';

var app = {};
app.timer = null;
app.session = {};
app.rest = {};
app.paused = false;
app.secondsRotation = 0;

document.addEventListener("DOMContentLoaded", function() {
  // fetch duration elements
  app.session.elem = document.getElementById('session-duration');
  app.rest.elem = document.getElementById('rest-duration');

  // set clock totals
  app.session.total = +app.session.elem.innerText.slice(0, -3) * 60;
  app.rest.total = +app.rest.elem.innerText.slice(0, -3) * 60;

  // incrementing time buttons
  document.getElementById('session-minus').addEventListener('click', function() {
    var element = document.getElementById('session-duration');
    app.updateTime(element, '-');
    document.querySelector('.remaining-minutes').innerText = app.session.total / 60;
    app.moveMinutes(app.session.total / 60);
  });

  document.getElementById('session-plus').addEventListener('click', function() {
    var element = document.getElementById('session-duration');
    app.updateTime(element, '+');
    document.querySelector('.remaining-minutes').innerText = app.session.total / 60;
    app.moveMinutes(app.session.total / 60);
  });

  document.getElementById('rest-minus').addEventListener('click', function() {
    var element = document.getElementById('rest-duration');
    app.updateTime(element, '-');
    app.moveBreak(app.rest.total / 60);
  });

  document.getElementById('rest-plus').addEventListener('click', function() {
    var element = document.getElementById('rest-duration');
    app.updateTime(element, '+');
    app.moveBreak(app.rest.total / 60);
  });

  // pause clocks
  document.getElementById('pause').addEventListener('click', function() {
    clearInterval(app.timer);
    app.toggleDisable();
    app.paused = true;
  });

  // stop clocks
  document.getElementById('stop').addEventListener('click', function() {
    clearInterval(app.timer);
    app.toggleDisable();
    app.session.elem.innerText = (app.session.total / 60) + ':00';
    app.rest.elem.innerText = (app.rest.total / 60) + ':00';
    document.querySelector('.remaining-minutes').innerText = app.session.total / 60;
    app.stopSecondHand();
    app.moveMinutes(app.session.total / 60);
    app.moveBreak(app.rest.total / 60);
    app.toggleFade('none');
    app.paused = false;
  });

  // start clock
  document.getElementById('start').addEventListener('click', function() {
    // disable all buttons, except stop
    app.toggleDisable();

    var sessionOrRest = 'session';
    if (app.paused) {
      // determine which timer to restart from
      sessionOrRest = (app.rest.counter % 60 > 0 ? 'rest' : sessionOrRest);
    }
    else {
      // set counters
      app.session.counter = app.session.total;
      app.rest.counter = app.rest.total;
      app.toggleFade(sessionOrRest);    // fade non-active counter
    }

    // start the clock
    var elems = {'session': app.session.elem, 'rest': app.rest.elem };
    app.countDown(sessionOrRest, elems);
    app.timer = setInterval(app.countDown, 1000, sessionOrRest, elems);

  });
});

app.updateTime = function updateTime(elem, sign) {
  var time = +elem.innerText.slice(0, -3);
  if (sign === '-' && time > 1) {
      elem.innerText = --time + ':00';
  }
  else if (sign === '+' && time < 60) {
    elem.innerText = ++time + ':00';
  }
  app[elem.id.split('-')[0]].total = time * 60;
  app.paused = false;
};

app.toggleDisable = function() {
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.btn'));
  buttons.forEach( function(v) {
    v.disabled = (!!v.disabled ? false : true);
  });
};

app.countDown = function(elem, elems) {
  app[elem].counter--;
  var minRemaining = Math.floor(app[elem].counter / 60);
  var sec = app[elem].counter % 60;
  var secRemaining = (sec / 10 < 1) ? '0' + sec : sec;

  // update relevant display time
  elems[elem].innerText = minRemaining + ':' + secRemaining;
  if (minRemaining === 0) {
    document.querySelector('.remaining-minutes').innerText = secRemaining;
    document.querySelector('.remaining-time p:last-child').innerText = 'sec';
  }
  else {
    document.querySelector('.remaining-minutes').innerText = minRemaining;
    document.querySelector('.remaining-time p:last-child').innerText = 'min';
  }
  app.moveSecondHand(1);
  if (elem === 'session') { app.moveMinutes(minRemaining); }
  else { app.moveBreak(minRemaining); }

  // when the current counter as reached 0
  if (app[elem].counter <= 0) {
    // clear this timer
    clearInterval(app.timer);
    app[elem].counter = app[elem].total;

    // set up for the next timer
    if (elem === 'session') {
      app.rest.elem.innerText = app.rest.total / 60 + ':00';
      app.moveBreak(app.rest.total / 60);
      document.querySelector('.remaining-minutes').innerText = app.rest.total / 60;
    }
    else {
      app.session.elem.innerText = app.session.total / 60 + ':00';
      app.moveMinutes(app.session.total / 60);
      document.querySelector('.remaining-minutes').innerText = app.session.total / 60;
    }
    document.querySelector('.remaining-time p:last-child').innerText = 'min';
    app.toggleFade();

    // start the next
    if (elem === 'session') {
      app.timer = setInterval(app.countDown, 1000, 'rest', elems);
    }
    else {
      app.timer = setInterval(app.countDown, 1000, 'session', elems);
    }
  }
};

app.moveSecondHand = function(sec) {
  var hand = document.getElementById('second-hand');
  app.secondsRotation -= sec * 6;
  hand.style.transform = 'rotate(' + app.secondsRotation + 'deg)';
};

app.stopSecondHand = function() {
  var hand = document.getElementById('second-hand');
  hand.style.transitionTimingFunction = "ease-out";
  app.secondsRotation -= (app.secondsRotation % 360);
  hand.style.transform = 'rotate(' + app.secondsRotation + 'deg)';
  var replaceTransition = setTimeout( function() {
    hand.style.transitionTimingFunction = "cubic-bezier(.4,2.08,.55,.44)";
  }, 600);
};

app.moveMinutes = function(minutes) {
  var thirtyMinMask = document.getElementById('00-30'),
      sixtyMinMask = document.getElementById('30-60'),
      thirtyMin = document.querySelector('.minutes:last-child'),
      deg = minutes * 6;
  if (deg > 180) {
    thirtyMinMask.style.transform = 'rotate(180deg)';
    thirtyMinMask.style.zIndex = 0;
    sixtyMinMask.style.transform = 'rotate(' + deg + 'deg)';
    thirtyMin.style.zIndex = 4;
  }
  else {
    sixtyMinMask.style.transform = 'rotate(180deg)';
    thirtyMinMask.style.transform = 'rotate(' + deg + 'deg)';
    thirtyMinMask.style.zIndex = 3;
    thirtyMin.style.zIndex = 1;
  }
};

app.moveBreak = function(minutes) {
  var thirtyMinMask = document.getElementById('break-00-30'),
      sixtyMinMask = document.getElementById('break-30-60'),
      thirtyMin = document.querySelector('.break:last-child'),
      deg = minutes * 6;
  if (deg > 180) {
    thirtyMinMask.style.transform = 'rotate(180deg)';
    thirtyMinMask.style.zIndex = 0;
    sixtyMinMask.style.transform = 'rotate(' + deg + 'deg)';
    thirtyMin.style.zIndex = 9;
  }
  else {
    sixtyMinMask.style.transform = 'rotate(180deg)';
    thirtyMinMask.style.transform = 'rotate(' + deg + 'deg)';
    thirtyMinMask.style.zIndex = 8;
    thirtyMin.style.zIndex = 6;
  }
};

app.toggleFade = function(timer = 'session') {
  var rest = app.rest.elem.parentNode,
      session = app.session.elem.parentNode;
  if (timer === 'none') {
    rest.classList.remove('faded');
    session.classList.remove('faded');
  }
  else if (rest.classList.contains('faded') || session.classList.contains('faded')) {
    rest.classList.toggle('faded');
    session.classList.toggle('faded');
  }
  else if (timer === 'session') {
    rest.classList.add('faded');
    session.classList.remove('faded');
  }
  else {
    rest.classList.add('faded');
    session.classList.remove('faded');
  }
};
