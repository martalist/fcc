var oKey = "7a791c81567505e17f2f6186800bef2e";
var skyconList = [
      undefined, undefined, "rain", "sleet", undefined, "rain", "snow",
      "fog", "clear-day", "cloudy", "clear-day", "wind",
      "clear-night", "partly-cloudy-day", "partly-cloudy-night"
    ];

$(document).ready( function() {
  var lat, lng, latlng, address;
  var celcius = true;

  // Weather icon prep
  var skycons = new Skycons({"color": "white"});

  // Get user's location, and use it
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( function(pos) {
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      latlng = lat + "," + lng;
      reverseGeolocate(latlng); // Get the address
      getWeather(lat, lng);
    });
  }

  // handle form submition
  $('.manual-location').submit( function(e) {
    e.preventDefault();
    if ( !!$( "input:first" ).val() ) {
      loading();
      $(this).children().blur();
      geolocate( $( "input" ).val() );
    } else {
      return false;
    }
  });

  // Bootstrap Switch settings (for °C <> °F)
  $.fn.bootstrapSwitch.defaults.size = 'small';
  $.fn.bootstrapSwitch.defaults.onColor = 'default';
  $.fn.bootstrapSwitch.defaults.onText = '°C';
  $.fn.bootstrapSwitch.defaults.offText = '°F';
  $.fn.bootstrapSwitch.defaults.labelText = '<span class="glyphicon glyphicon-chevron-left icon-xs" aria-hidden="true"></span>';
  $("[name='deg-switch']").bootstrapSwitch();
  // toggle left/right icon
  $("[name='deg-switch']").on("switchChange.bootstrapSwitch", function (e, s) {
    $('.icon-xs').toggleClass("glyphicon-chevron-right glyphicon-chevron-left");
    celcius = s;
    if (celcius) {
      toMetric();
    } else {
      toImperial();
    }
  });


  // Graceful input field handling when focussed
  $inputAddr = $('.loc-time input');
  $inputAddr.focus( function() {
    $(this).attr("placeholder", "");
    $(this).val("");
  });

  $inputAddr.blur( function () {
    var placeholder = !!address? address: "enter a location";
    $(this).attr("placeholder", placeholder);
  });

  // ============== Helper Functions ==============

  function reverseGeolocate(latlng) {
    var gMapsURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng={0}";
    address = "";
    $.getJSON( gMapsURL.format(latlng), function(json) {
      var loc = json.results[0].address_components;
      loc.forEach( function(gResult) {
        gResult.types.forEach( function(type) {
          if (type === "locality") {
            address += gResult.long_name + ", ";
          }
          else if (type === "administrative_area_level_1") {
            address += gResult.short_name;
          }
        });
      });
      setPageTitle(address);
      $("input:first").attr("placeholder", address);
    }).error( function () {
      setPageTitle("Interwebland");
      $("input:first").attr("placeholder", "?");
    });
  }

  function getWeather(lat, lng) {
    var openWeatherMapURL = "http://api.openweathermap.org/data/2.5/weather?lat={0}&lon={1}&units=metric&appid={2}";
    $.getJSON( openWeatherMapURL.format(lat, lng, oKey), function(json) {
      var temp = Math.floor(json.main.temp * 10) / 10;
      var min = Math.round(json.main.temp_min);
      var max = Math.round(json.main.temp_max);
      var progressBarValue = max - min === 0? 99: Math.round((temp - min) / (max - min) * 100);
      var humidity = json.main.humidity;
      var pressure = json.main.pressure;
      var windSpeed = json.wind.speed;
      var windDeg = json.wind.deg;
      var windMeasure = " km/hr";
      var windDir = degToCompass(windDeg);
      var desc = json.weather[0].description;
      if(!celcius) {
        temp = cToF(temp);
        min = cToF(min);
        max = cToF(max);
        windSpeed = kmToM(windSpeed);
        windMeasure = " MPH";
      }


      $('#temp').html(temp.toString().replace(".", '<span class="full-stop">.</span>'));
      $('#min').text(min + "°");
      $('#max').text(max + "°");
      $('#humidity').text(humidity + "%");
      $('#pressure').text(pressure + " hPa");
      $('#wind-speed').text(windSpeed + windMeasure);
      $('#wind-direction').text(windDir);
      $('.glyphicon-arrow-up').css('transform', 'rotate(' + (windDeg - 180) + 'deg)');
      $('.weather-description').text(desc);

      // update progress bar
      $('.progress-bar').css('width', progressBarValue + '%').attr("aria-valuenow", progressBarValue);

      // Set weather icon
      var wID = json.weather[0].id;
      wID = (wID <= 800)? Math.floor(parseInt(wID) / 100): 9;
      skycons.set("icon1",  skyconList[wID]);
      skycons.play();

      // clear loading status
      if ( !$('.outer').hasClass("hidden") ) {
        loading();
      }
    }).error( function() {
      // insert error message
      $('<div class="alert alert-danger alert-dismissible" role="alert">' +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span></button><strong>Oops!</strong> ' +
          'We couldn\'t fetch any data. Please try again.</div>').insertAfter( $('.loc-time') );
      // clear loading status
      if ( !$('.outer').hasClass("hidden") ) {
        loading();
      }
    });
  }

  function geolocate(loc) {
    address = loc;
    var gMapsURL = "https://maps.googleapis.com/maps/api/geocode/json?address={0}";
    $.getJSON( gMapsURL.format(address), function(json) {
      lat = json.results[0].geometry.location.lat;
      lng = json.results[0].geometry.location.lng;

      getWeather(lat, lng);
      setPageTitle(address);
    });
  }

  function degToCompass(d) {
    var deg = Math.floor(d/22.5 + 0.5);
    var arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[(deg % 16)];
  }

  function setPageTitle(address) {
    $("title").text("Weather in " + address);
  }

  function loading() {
    $(".loading-wrap").toggleClass("hidden");
    $(".outer").toggleClass("hidden");
  }

  function cToF(C, decimalPoints) {
    return Math.round( 9 / 5 * C + 32, decimalPoints);
  }

  function fToC(F, decimalPoints) {
    return Math.round( 5 / 9 * (F - 32), decimalPoints);
  }

  function mToKM(M, decimalPoints) {
    return Math.round( M / 0.62137, decimalPoints);
  }

  function kmToM(KM, decimalPoints) {
    return Math.round( KM * 0.62137, decimalPoints);
  }

  function toMetric() {
    var temp, min, max, wind;
    temp  = parseFloat( $('#temp').text() );
    min = parseFloat( $('#min').text().replace("°", "") );
    max = parseFloat( $('#max').text().replace("°", "") );
    wind = parseFloat( $('#wind-speed').text().replace(" MPH", "") );
    $('#temp').html( fToC(temp, 1).toString().replace(".", '<span class="full-stop">.</span>') );
    $('#min').text( fToC(min, 0) + "°" );
    $('#max').text( fToC(max, 0) + "°" );
    $('#wind-speed').text( mToKM(wind, 1) + " km/hr" );
  }

  function toImperial() {
    var temp, min, max, wind;
    temp  = parseFloat( $('#temp').text() );
    min = parseFloat( $('#min').text().replace("°", "") );
    max = parseFloat( $('#max').text().replace("°", "") );
    wind = parseFloat( $('#wind-speed').text().replace(" km/hr", "") );
    $('#temp').html( cToF(temp, 1).toString().replace(".", '<span class="full-stop">.</span>') );
    $('#min').text( cToF(min, 0) + "°" );
    $('#max').text( cToF(max, 0) + "°" );
    $('#wind-speed').text( kmToM(wind, 1) + " MPH" );
  }
});

String.prototype.format = function() {
  var args = arguments.length === 0? undefined: Array.prototype.slice.call(arguments, 0);
  var result = this;
  args.forEach( function(val, i) {
    result = result.replace("{" + i + "}", val);
  });
  return result;
};

String.prototype.capitalize = function() {
  var output = this.split(" ");
  output.forEach( function(val, i) {
    output[i] = val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase();
  });
  return output.join(" ");
};
