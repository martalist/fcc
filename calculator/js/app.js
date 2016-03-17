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
    expArray = expression.match( /\d+(\.\d+)?|\.?\d+|(?:\+|-|\/|\*|\%)/g );
    expression = '' + solve(expArray);
    $('.display p').text(expression);
  }

  function solve(arr) {
    var newArr = arr.slice(0);
    var precedence = ['%', '/', '*', '-', '+'];
    for (var i = 0; i < precedence.length; i++) {
      var match = newArr.indexOf(precedence[i]);
      while (match > -1) {
        if (precedence[i] === '-') {
          newArr[match] = '+';
          newArr[match + 1] = '-' + newArr[match + 1];
        }
        else {
          var group = calculate(newArr.splice(match - 1, 3));
          newArr.splice(match - 1, 0, group);
        }
        match = newArr.indexOf(precedence[i]);
      }
    }
    return newArr[0];
  }

  function calculate(arr) {
    arr[0] = parseFloat(arr[0]);
    arr[2] = parseFloat(arr[2]);
    switch (arr[1]) {
      case '/':
        return arr[0] / arr[2];
      case '*':
        return arr[0] * arr[2];
      case '+':
        return arr[0] + arr[2];
      case '-':
        return arr[0] - arr[2];
      case '%':
        return arr[0] % arr[2];
      default:
        throw Error('That\'s not an operator!');
    }
  }
});
