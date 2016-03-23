var app = {};
app.timer = null;
app.session = {};
app.rest = {};
app.paused = false;

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
  });

  document.getElementById('session-plus').addEventListener('click', function() {
    var element = document.getElementById('session-duration');
    app.updateTime(element, '+');
  });

  document.getElementById('rest-minus').addEventListener('click', function() {
    var element = document.getElementById('rest-duration');
    app.updateTime(element, '-');
  });

  document.getElementById('rest-plus').addEventListener('click', function() {
    var element = document.getElementById('rest-duration');
    app.updateTime(element, '+');
  });

  // pause clocks
  document.getElementById('pause').addEventListener('click', function() {
    // TODO: handle pause<>start properly in all situations.
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
    }

    // start the clock
    app.timer = setInterval(app.countDown, 1000, sessionOrRest, {'session': app.session.elem, 'rest': app.rest.elem });

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

  if (app[elem].counter <= 0) {
    // clear this timer
    clearInterval(app.timer);
    app[elem].counter = app[elem].total;

    // start the next
    if (elem === 'session') {
      app.timer = setInterval(app.countDown, 1000, 'rest', elems);
    }
    else {
      app.timer = setInterval(app.countDown, 1000, 'session', elems);
    }
  }
};
