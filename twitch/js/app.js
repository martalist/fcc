$(document).ready( function() {
  var accounts =  ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
  var url = "https://api.twitch.tv/kraken/streams/{}?callback=?";

  accounts.forEach( function(acc) {
    $.getJSON( url.replace( "{}", acc ), function(json) {
      console.log(json);
      if (json.stream === null) {
        // offline: do something
      } else {
        // online: do something else
      }
    });
  });
});
