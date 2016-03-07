$(document).ready(function() {
  var name = 'alistairmartin01';
  var domain = '@gmail.com';
  $('.fa-envelope-o').parent().attr("href", ('mailto:' + name + domain));


  /*
   * Open the drawer when the menu ison is clicked.
   */
  function toggleMenu() {
    if ($( window ).width() < 600) {
      $('.menu').toggleClass('open');
    }
  };

  $('.menu-btn').click( function() {
    toggleMenu();
  });

  $('.menu-item').click( function() {
    toggleMenu();
  })
});
