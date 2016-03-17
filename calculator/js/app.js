$(document).ready( function() {
  var expression = '0';
  var clickActions = { 'AC': clearAll, 'C': clearLastChar, '=': evaluateExpression };
  var displayingResult = false;
  var operators = /\/|\*|\+|\%|-/;
  var operatorsNoMinus = /\/|\*|\+|\%/;
  var expressionComponents = /\d+(\.\d+)?|\.?\d+|(?:\+|-|\/|\*|\%)/g;
  var decimalAdded = false;

  $('button').click( function(e) {
    var val = e.currentTarget.value;
    evaluateInput(val);
  });

  $(document).keypress( function(e) {
    var val = String.fromCharCode(e.charCode);
    if (val === '\r') { val = '='; }
    evaluateInput(val);
  });

  function evaluateInput(val) {
    if (val in clickActions) { return clickActions[val](); }

    // only allow 1 decimal per number
    else if (val === '.') {
      if (decimalAdded === true) { return; }
      decimalAdded = true;
      return addToExpression(val);
    }

    // Ignore operator input if the input expression is empty, '0' or '-'
    else if (( /^(-|0)?$/.test(expression)) && operatorsNoMinus.test(val)) { return; }
    else {

      // if the input is directly following a result ("=")
      if (displayingResult) {
        if ( /\d/.test(val) ) { expression = ''; }  // reset to blank expression on numeric input
        displayingResult = false;                   // reset flag
      }
      // operator === number break, so allow '.' again
      if (operators.test(val)) { decimalAdded = false; }

      return addToExpression(val);
    }
  }

  function addToExpression(val) {
    if (expression === '0') { expression = val; }
    // if expression ends with an operator, and the new input is an opererator
    else if ( operators.test(expression.slice(-1)) && operatorsNoMinus.test(val) ) {
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
    // split expression into an array of numbers/flotas and operators
    expArray = expression.match( expressionComponents );

    // ensure the last character is not an operator
    if ( operators.test(expArray[expArray.length - 1])) {
      expArray.pop();
    }

    // solve and display
    expression = '' + solve(expArray);
    $('.display p').text(expression);
    displayingResult = true;
  }

  function solve(arr) {
    var newArr = arr.slice(0);
    // handle negative first number
    if (newArr[0] === '-') {
      newArr.splice(0, 2, '-' + newArr[1]);
    }
    console.log(newArr);
    // perform operations in order of precedence
    var precedence = ['-', '%', '/', '*', '+'];
    for (var i = 0; i < precedence.length; i++) {
      var match = newArr.indexOf(precedence[i]);
      while (match > -1) {
        console.log(newArr);
        // treat - operator as negative number
        if (precedence[i] === '-') {

          // if the previous array element isn't an operator replace - with +, otherwise remove it
          // then append - directly to the number
          if ( (operators.test(newArr[match - 1])) ) {  // previous element is operator
            newArr.splice(match, 1);                          // remove - element
            newArr[match] = '-' + newArr[match];              // append - to following number
          }
          else {                                              // previous element is number
            newArr[match] = '+';                              // change - to +
            newArr[match + 1] = '-' + newArr[match + 1];      // append - to following number
          }
        }
        else {
          // calculate this pair of numbers
          var answer = calculate(newArr.splice(match - 1, 3));

          // insert the answer in place
          newArr.splice(match - 1, 0, answer);
        }
        console.log(newArr);
        match = newArr.indexOf(precedence[i]);
      }
    }
    console.log(newArr[0]);
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
