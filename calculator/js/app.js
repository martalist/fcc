$(document).ready( function() {
  var MAX_LENGTH = 13, DISPLAY_MAX = 35;
  var expression = '0';
  var clickActions = { 'AC': clearAll, 'C': clearLastChar, '=': evaluateExpression };
  var displayingResult = false;
  var decimalAdded = false;
  var defaultFontSize = $('.display').css('font-size').slice(0, -2);
  var operators = /\/|\*|\+|\%|-/;
  var operatorsNoMinus = /\/|\*|\+|\%/;
  var expressionComponents = /\d+(\.\d+)?|\.?\d+|(?:\+|-|\/|\*|\%)/g;

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
    if ((val !== 'C'&& val !== 'AC') && expression.length >= DISPLAY_MAX) { return; }    // disallow formula's that are too long
    else if (val in clickActions) { return clickActions[val](); }

    // Ignore operator input if the input expression is empty, '0' or '-'
    else if (( /^(-|0)?$/.test(expression)) && operatorsNoMinus.test(val)) { return; }
    else {

      // if the input is directly following a result ("=")
      if (displayingResult) {
        if ( /\d/.test(val) ) { expression = ''; }  // reset to blank expression on numeric input
        displayingResult = false;                   // reset flag
      }

      return addToExpression(val);
    }
  }

  function addToExpression(val) {
    if (expression === '0') { expression = val; }
    // if expression ends with an operator, and the new input is an opererator
    else if ( operators.test(expression.slice(-1)) && operatorsNoMinus.test(val) ) {
      expression = expression.slice(0, -1) + val;
    }
    // only allow 1 decimal per number
    else if (val === '.') {
      if (decimalAdded === true) { return; }
      decimalAdded = true;
      expression += val;
    }
    else {
      decimalAdded = (!decimalAdded || operators.test(val) ? false: true);
      expression += val;
    }
    adjustFontSize(expression);
    $('.display p').text(expression);
  }

  function clearLastChar() {
    var lastChar = expression.slice(-1);
    if (lastChar === '.') { decimalAdded = false; }   // allow decimals again
    expression = expression.length === 1? '0' : expression.slice(0, -1);
    adjustFontSize(expression);
    $('.display p').text(expression);
  }

  function clearAll() {
    expression = '0';
    decimalAdded = false;   // allow decimals again
    adjustFontSize(expression);
    $('.display p').text(expression);
  }

  function evaluateExpression() {
    // split expression into an array of numbers/flotas and operators
    expArray = expression.match( expressionComponents );

    // ensure the last character is not an operator
    if ( operators.test(expArray[expArray.length - 1])) { expArray.pop(); }

    // solve and display
    expression = '' + solve(expArray);

    // handle zero division
    if ( /(infinity)|(nan)/i.test(expression) ) { expression = '0'; }
    // handle float rounding
    else if (isFloat(+expression)) { expression = '' + stripFloat(+expression); }

    adjustFontSize(expression);
    $('.display p').text(expression);
    displayingResult = true;
  }

  function solve(arr) {
    var newArr = arr.slice(0);
    // handle negative first number
    if (newArr[0] === '-') {
      newArr.splice(0, 2, '-' + newArr[1]);
    }
    // perform operations in order of precedence
    var precedence = ['-', '%', '/', '*', '+'];
    for (var i = 0; i < precedence.length; i++) {
      var match = newArr.indexOf(precedence[i]);
      while (match > -1) {
        // treat - operator as negative number
        if (precedence[i] === '-') {

          // if the previous array element isn't an operator replace - with +, otherwise remove it
          // then append - directly to the number
          if (newArr[match + 1] === '-') {                    // two - operators in a row
            newArr.splice(match, 2, '+');                     // replace them with a +
          }
          else if ( (operatorsNoMinus.test(newArr[match - 1])) ) {  // previous element is operator
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
        match = newArr.indexOf(precedence[i]);
      }
    }
    return newArr[0];
  }

  function calculate(arr) {
    arr[0] = +arr[0];
    arr[2] = +arr[2];
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

  function isFloat(num) {
    return num % 1 !== 0;
  }

  function stripFloat(num) {
    return (parseFloat(num.toPrecision(MAX_LENGTH - 2)));
  }

  function adjustFontSize(exp) {
    if (exp.length > MAX_LENGTH) {
      var sizeMap = { 14: 29, 15: 28, 16: 26, 17: 24, 18: 22, 19: 22, 20: 20, 21: 20,
                      22: 18, 23: 18, 24: 16, 25: 16, 26: 16, 27: 14, 28: 14, 29: 14,
                      30: 13, 31: 13, 32: 13 };
      var size = (exp.length in sizeMap ? sizeMap[exp.length] : 12);
      $('.display').css('font-size', size + 'px');
    }
    else {
      // reset font size
      $('.display').removeAttr('style');
    }
  }
});
