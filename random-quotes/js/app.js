
$(document).ready( function() {
  "use strict";
  newQuote();

  $('#new-quote').click( function() {
    loading($(this));
    newQuote($(this));
  });

});

function loading(btn) {
  // change button loading state
  btn.toggleClass("is-loading is-inverted is-outlined");
}

function changeBackground() {
  var hero = $('.hero');
  var heroClasses = ["is-primary", "is-info", "is-success", "is-warning", "is-danger"];
  var oldClass, newClass;

  // pick a random index in heroClasses
  var index = Math.floor(Math.random() * heroClasses.length);

  // Establish old & new classes
  heroClasses.forEach( function(val, valIndex) {
    if (hero.hasClass(val)) {
      oldClass = val;
      // Ensure the new class is not the same as the old one
      if (index === valIndex) {
        index = (index + 1) % heroClasses.length;
      }
      newClass = heroClasses[index];
    }
  });
  // Add new class
  hero.removeClass(oldClass).addClass(newClass);

  // change button colors for "is-warning" hero class
  if (oldClass === "is-warning" || newClass === "is-warning") {
    $.each( $('.nav-item a'), function() {
      $(this).toggleClass("brown-buttons");
    });
  }
}

function updateSocialLinks(quote, author) {
  quote = quote.replace(/[<](\/p|p)[>]/g, "") + " - " + author;
  tweet = "https://twitter.com/intent/tweet?text=" + quote;
  email = "mailto:?subject=A brilliant quote&body=" + quote;
  $('.twitter-share-button').attr('href', tweet);
  $('.email-share-button').attr('href', email);
}

function newQuote(btn) {
  var settings = {
    cache: false,
    url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
    crossDomain: true,
    success: function(json) {
      var quote = json[0].content;
      var author = json[0].title;
      var link = json[0].link;
      $("blockquote").html(quote).attr("cite", link);
      $("cite").html("-- " + author);
      updateSocialLinks(quote, author);
      changeBackground();
      if (btn !== undefined) {
        loading(btn);
      }
    }
  };
  $.ajax(settings);
}
