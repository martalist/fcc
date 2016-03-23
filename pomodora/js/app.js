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

  document.getElementById('rest-minus').addEventListener('click', function() {
    var element = document.getElementById('rest-duration');
    app.updateTime(element, '-');
  });

  document.getElementById('rest-plus').addEventListener('click', function() {
    var element = document.getElementById('rest-duration');
    app.updateTime(element, '+');
  });

  // stop clocks
  document.getElementById('stop').addEventListener('click', function() {
    // TODO: handle stop<>start properly in all situations.
    clearInterval(app.timer);
    app.toggleDisable();
  });


  // start clock
  document.getElementById('start').addEventListener('click', function() {
    // disable all buttons, except stop
    app.toggleDisable();

    // fetch duration elements
    var session = document.getElementById('session-duration');
    var rest = document.getElementById('rest-duration');

    // set counters
    app.session.counter = app.session.total;
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
  app[elem.id.split('-')[0]].total = time * 60;
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
