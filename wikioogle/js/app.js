$(document).ready( function() {
  var resultHTML = '<div class="result"><h3><a href="{0}">{1}</a></h3>' +
    '<div class="search-content"><cite class="search-url">{2}</cite><p>{3}</p></div></div>';

  var noMatch = '<div class="result"><div class="no-result"><p>Your search - ' +
    '<strong>{0}</strong> - did not match any documents.</p><p>Suggestions:</p>' +
    '<ul><li>Make sure all words are spelled correctly.</li><li>Try different keywords.</li>' +
    '<li>Try more general keywords.</li><li>Try fewer keywords.</li></ul></div></div>';

  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search={0}&callback=?";

  $('#search-text').keyup( function () {
    var query = $(this).val();
    getWikipediaResults(query);

  });

  $('.btn-search').click( function (e) {
    e.preventDefault();
    var query = $('#search-text').val();
    getWikipediaResults(query);
  });

  function getWikipediaResults(query) {
    $.getJSON( url.format(query), function(json) {

      // remove existing results
      $('.result').each( function() {
        $(this).remove();
      });

      // add new results to the DOM
      var result = "", results = json.slice(1);
      numResults = results[0].length;
      if (numResults > 0) {
        for (var i = 0; i < numResults; i++) {
          var cite = results[2][i].replace("https://", "");
          result += resultHTML.format(results[2][i], results[0][i], cite, results[1][i]);
        }
      } else {
        result = noMatch.format(query);
      }
      $('.results').append(result);
    });
  }
});

String.prototype.format = function() {
  // replaces {index} in the string with arguments provided.
  // eg. "hello{0}".format(" world"); returns "hello world"
  // numbers between the brackets must correspond with the argument index
  var args = arguments.length === 0? undefined: Array.prototype.slice.call(arguments, 0);
  var result = this;
  args.forEach( function(val, i) {
    result = result.replace("{" + i + "}", val);
  });
  return result;
};
