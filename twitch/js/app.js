$(document).ready( function() {
  var accounts =  ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
  var resultHTML = '<article class="media box {0}"><figure class="media-left">' +
    '<p class="image is-64x64"><img src="{1}" alt="{2}"></p></figure><div class="media-content">' +
    '<div class="content"><p><strong><a href="{3}" target="_blank">{4}</a></strong><br>{5}</p></div><nav class="navbar">' +
    '<div class="navbar-left"><p class="navbar-item tag" title="Followers">' +
    '<i class="fa fa-user"></i> {6}</p>' +
    '<p class="navbar-item tag" title="Views"><i class="fa fa-television"></i>' +
    ' {7}</p></div><div class="navbar-right">' +
    '<div class="navbar-item"><span class="tag {8}">{9}</span></div>' +
    '</div></nav></div></article>';
  var url = "https://api.twitch.tv/kraken/channels/{}?callback=?";

  accounts.forEach( function(acc) {
    $.getJSON( url.replace( "{}", acc ), function(json) {
      var bio, tagClass, status;
      if (!!json.status) {
        bio = json.status;
        tagClass = 'is-success';
        status = 'online';
      } else {
        bio = '<em>Not streaming at this time...</em>';
        tagClass = 'is-warning';
        status = 'offline';
      }
      var logo = (!!json.logo)? json.logo: "images/twitch.png";
      var result = resultHTML.format(status,
                                    logo,
                                    json.display_name + "'s logo",
                                    json.url,
                                    json.display_name,
                                    bio,
                                    json.followers,
                                    json.views,
                                    tagClass,
                                    status[0].toUpperCase() + status.slice(1)
                                  );
      $('.results').append(result);
    });
  });
});


String.prototype.format = function() {
  var args = arguments.length === 0? undefined: Array.prototype.slice.call(arguments, 0);
  var result = this;
  args.forEach( function(val, i) {
    result = result.replace("{" + i + "}", val);
  });
  return result;
};
