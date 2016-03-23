var app = {};

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
    app.toggleDisable();
    var elem = document.getElementById('session-duration');
    // calculate # of seconds
    var sessSeconds = (+elem.innerText.slice(0, -3) * 60) + (+elem.innerText.slice(-2));
    var restSeconds = document.getElementById('break-duration').innerText.slice(0, -3) * 60;
    // while remaining sec > 0
    app.timer = setInterval( function() {
      sessSeconds--;
      var minRemaining = Math.floor(sessSeconds / 60);
      var secRemaining = sessSeconds % 60;
      secRemaining = (secRemaining / 10 < 1) ? '0' + secRemaining : secRemaining;
      elem.innerText = minRemaining + ':' + secRemaining;
      if (sessSeconds === 0) {
        // TODO: trigger next timer (break or session)
        clearInterval(timer);
      }
    }, 1000);
  });
});

app.timer = null;

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
