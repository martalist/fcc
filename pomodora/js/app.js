var app = {};
app.timer = null;
app.session = {};
app.rest = {};

document.addEventListener("DOMContentLoaded", function() {

  // incrementing time buttons
  document.getElementById('session-minus').addEventListener('click', function() {
    var element = document.getElementById('session-duration');
    app.updateTime(element, '-');
  });

  document.getElementById('session-plus').addEventListener('click', function() {
    var element = document.getElementById('session-duration');
    app.updateTime(element, '+');
  });

  document.getElementById('break-minus').addEventListener('click', function() {
    var element = document.getElementById('break-duration');
    app.updateTime(element, '-');
  });

  document.getElementById('break-plus').addEventListener('click', function() {
    var element = document.getElementById('break-duration');
    app.updateTime(element, '+');
  });

  // stop clocks
  document.getElementById('stop').addEventListener('click', function() {
    clearInterval(app.timer);
    app.toggleDisable();
  });


  // start clock
  document.getElementById('start').addEventListener('click', function() {
    // disable all buttons, except stop
    app.toggleDisable();

    // fetch duration elements
    var session = document.getElementById('session-duration');
    var rest = document.getElementById('break-duration');

    // calculate # of seconds, and store them in app obj.
    app.session.total = (+session.innerText.slice(0, -3) * 60) + (+session.innerText.slice(-2));
    app.session.counter = app.session.total;
    app.rest.total = (+rest.innerText.slice(0, -3) * 60) + (+rest.innerText.slice(-2));
    app.rest.counter = app.rest.total;

    // start the clock
    app.timer = setInterval(app.countDown, 1000, 'session', {'session': session, 'rest': rest });

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
};

app.toggleDisable = function() {
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.btn'));
  buttons.forEach( function(v) {
    v.disabled = (!!v.disabled ? false : true);
  });
};

app.countDown = function(elem, elems) {
  app[elem].counter--;
  minRemaining = Math.floor(app[elem].counter / 60);
  var sec = app[elem].counter % 60;
  secRemaining = (sec / 10 < 1) ? '0' + sec : sec;

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
