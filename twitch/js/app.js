$(document).ready( function() {
  var accounts =  ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "brunofin"];
  var resultHTML = '<article class="media box {0}"><figure class="media-left">' +
    '<p class="image is-64x64"><img src="{1}" alt="{2}"></p></figure><div class="media-content">' +
    '<div class="content"><p><strong><a href="{3}" target="_blank">{4}</a></strong><br>{5}</p></div><nav class="navbar">' +
    '<div class="navbar-left"><p class="navbar-item tag" title="Followers">' +
    '<i class="fa fa-user"></i> {6}</p>' +
    '<p class="navbar-item tag" title="Views"><i class="fa fa-television"></i>' +
    ' {7}</p></div><div class="navbar-right">' +
    '<div class="navbar-item"><span class="tag {8}">{9}</span></div>' +
    '</div></nav></div></article>';
  var url = "https://api.twitch.tv/kraken/streams/{0}?callback=?";

  accounts.forEach( function(acc) {
    $.getJSON(url.format(acc), function(j) {
      var url, views, followers, status, tagClass, tagLabel, bio, logo, result,
          alt = acc + "'s logo";
          name = acc;
      if (j.hasOwnProperty('status') && j.status === 422) {
        bio = '<em>This account no longer exists</em>';
        status = 'offline';
        tagClass = 'is-danger';
        tagLabel = "Removed";
        url = "#";
        views = 0;
        followers = 0;
        logo = "images/twitch.png";
        result = resultHTML.format(status, logo, acc, url, name, bio, followers, views, tagClass, tagLabel);
        $('.results').append(result);
      }
      else if (j.stream === null) {
        $.getJSON(j._links.channel, function(j2) {
          var bio;
          var url = j2.url;
          var alt = acc + "'s logo";
          var name = j2.display_name;
          var views = j2.views;
          var followers = j2.followers;
          var status = 'offline';
          var tagClass = 'is-warning';
          var tagLabel = 'Offline';
          if (!!j2.status) {
            bio = j2.status;
          } else {
            bio = '<em>Not streaming at this time...</em>';
          }
          var logo = (!!j2.logo)? j2.logo: "images/twitch.png"; // check for a logo, or use default
          var result = resultHTML.format(status, logo, acc, url, name, bio, followers, views, tagClass, tagLabel);
          $('.results').append(result);
        });
      }
      else {
        url = j.url;
        alt = acc + "'s logo";
        name = j.stream.channel.display_name;
        views = j.stream.channel.views;
        followers = j.stream.channel.followers;
        status = 'online';
        tagClass = 'is-success';
        tagLabel = 'Online';
        bio = 'Streaming: <em>' + j.stream.game + '</em>';
        logo = (!!j.stream.channel.logo)? j.stream.channel.logo: "images/twitch.png"; // check for a logo, or use default
        result = resultHTML.format(status, logo, acc, url, name, bio, followers, views, tagClass, tagLabel);
        $('.results').append(result);
      }
    });
  });

  // Animate tabs

  $('#online').click( function() {
    if ( $(this).hasClass('is-active') ) return;
    filter('online');
  });

  $('#offline').click( function() {
    if ( $(this).hasClass('is-active') ) return;
    filter('offline');
  });

  $('#all').click( function() {
    if ( $(this).hasClass('is-active') ) return;
    filter('all');
  });

  function filter(tab) {
    $('li.is-active').removeClass('is-active');
    $('#' + tab).addClass('is-active');
    $('.results').children().each( function() {
      if ( tab === "all" || $(this).hasClass(tab) ) {
        $(this).css("display", "flex");
      } else {
        $(this).css("display", "none");
      }
    });
  }

  // search bar
  $('input.search').keyup( function() {
    var tab = $('.is-active a').text().toLowerCase();
    if ( !$(this).val() ) {
      filter(tab);
    }
    else {
      var term = new RegExp( $(this).val(), 'gi' );
      $('.results').children().each( function() {
        if ( !( $(this).find('strong a').text().match(term) ) ) {
          $(this).css("display", "none");
        } else {
          var status = ($(this).hasClass("online"))? "online": "offline";
          if (tab === status || tab === "all") {
            $(this).css("display", "flex");
          }
        }
      });
    }
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
