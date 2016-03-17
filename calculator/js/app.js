$(document).ready( function() {
  var expression = '0';
  var clickActions = { 'AC': clearAll, 'C': clearLastChar, '=': evaluateExpression };

  $('button').click( function(e) {
    var val = e.currentTarget.value;
    if (val in clickActions) { clickActions[val](); }
    else { addToExpression(val); }
  });

  $(document).keypress( function(e) {
    var val = String.fromCharCode(e.charCode);
    if (val === '\r') {
      evaluateExpression();
    }
    else if (!!val.match( /(?:\/|\*|\+|\%|-)|\d/ )) {
      addToExpression(val);
    }
  });

  function addToExpression(val) {
    if (expression === '0') { expression = val; }
    else if (!!expression.slice(-1).match( /\/|\*|\+|\%|-/ ) &&
             !!val.match( /\/|\*|\+|\%|-/ )) {
      expression = expression.slice(0, -1) + val;
    }
    else { expression += val; }
    $('.display p').text(expression);
  }

  function clearLastChar() {
    expression = expression.length === 1? '0' : expression.slice(0, -1);
    $('.display p').text(expression);
  }

  function clearAll() {
    expression = '0';
    $('.display p').text(expression);
  }

  function evaluateExpression() {
    // TODO: evaluate the expression!
    $('.display p').text(expression);
  }
});
