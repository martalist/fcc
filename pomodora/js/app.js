$(document).ready( function() {
  // start clock
  $('.clock').click(function() {
    // calculate # of seconds
    var seconds = $(this).text() * 60;
    // while remaining sec > 0
    var timer = setInterval( function() {
      seconds--;
      var minRemaining = Math.floor(seconds / 60);
      var secRemaining = seconds % 60;
      secRemaining = (secRemaining / 10 < 1) ? '0' + secRemaining : secRemaining;
      $('.clock').text(minRemaining + ':' + secRemaining);
      if (seconds === 0) {
        // TODO: trigger next timer (break or session)
        clearInterval(timer);
      }
    }, 1000);
  });
});
