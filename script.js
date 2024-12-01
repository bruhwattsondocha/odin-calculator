function truncate(number) {
  return Math.floor(number * 100) / 100;
}
function add(a, b) {
  return +a + +b; 
};
function subtract(a, b) {
  return +a - +b; 
}
function multiply(a, b) {
  return +a * +b; 
}
function divide(a, b) {;
  return +a / +b; 
}

function operate(a, operator, b) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
}

const displayExpression = document.querySelector('.display .expression');
const displayResult = document.querySelector('.display .result');
const numberButtons = document.querySelectorAll('.number');
const functionalButtons = document.querySelectorAll('.functional-button');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const ERROR_MESSAGE = 'ERROR!';

// Create array
const expressionArray = [];
let buffer = '';
// Create temporary number holder
// When pressing NUMBER append it to buffer
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendToBuffer(button.textContent);
    refreshDisplay(button.textContent);
  })
});
// When pressing OPERATOR push tempNumber to array and OPERATOR itself
functionalButtons.forEach(button => {
  button.addEventListener('click', () => {
    pushValue();
    pushOperator(button.textContent)
    refreshDisplay(button.textContent);
  })
});
// 
// Do this how many times you want
// After pressing EQUALS sign loop through array to find operator with higher precedence
equalsButton.addEventListener('click', calculate);
// FOR NOW they are MULTIPLY or DIVIDE and after them SUM and SUBTRACT
// Take expressionArray[operatorIndex] and call a function that uses OPERATOR sign and operates expressionArray[operatorIndex - 1] and expressionArray[operatorIndex + 1] 
// and store it in expressionArray[operatorIndex - 1] and remove expressionArray[operatorIndex] and expressionArray[operatorIndex + 1]
// Loop again until there are no more MULTIPLY or DIVIDE operators
// Then loop through OPERATORS with lower precedence i.e. SUM and SUBTRACT
// Display expressionArray.join(' ') on display

function pushValue() {
  expressionArray.push(buffer);
  buffer = '';
}
function pushOperator(operator) {
  expressionArray.push(operator)
}
function appendToBuffer(number) {
  buffer += number;
}
function refreshDisplay(number) {
  displayExpression.textContent += number;
}
function displayFinalResult(number) {
  displayExpression.textContent = number;
}

function calculate() {
  pushValue();
  // operators: (× and /),(+ and -)
  do {
    // Find multiply or division operator index 
    let operatorIndex = expressionArray.findIndex(item => item === '×' || item === '/');
    // If operator is '×' call multiply function
    if (expressionArray[operatorIndex] === '×') {
      expressionArray[operatorIndex - 1] = multiply(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
      expressionArray.splice(operatorIndex, 2);
    }
    // If operator is '/' call divide function
    else if ((expressionArray[operatorIndex] === '/')) {
      expressionArray[operatorIndex - 1] = divide(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
      expressionArray.splice(operatorIndex, 2);
    }
    // If there are no more division and multiplication operators
    if (expressionArray.findIndex(item => item === '×' || item === '/') === -1) {
      // Find add and subtract operator index
      operatorIndex = expressionArray.findIndex(item => item === '+' || item === '-');
    }
    // If operator is '+' call add function
    if (expressionArray[operatorIndex] === '+') {
      expressionArray[operatorIndex - 1] = add(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
      expressionArray.splice(operatorIndex, 2);
    }
    // If operator is '-' call subtract function
    else if ((expressionArray[operatorIndex] === '-')) {
      expressionArray[operatorIndex - 1] = subtract(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
      expressionArray.splice(operatorIndex, 2);
    }
  } 
  while (expressionArray.length !== 1);
  const result = expressionArray[0];
  displayFinalResult(result);
}

// expressionArray.pop()
// '/'
// expressionArray
// (5) ['2', '+', '2', '×', '2']
// operatorIndex = expressionArray.findIndex(item => item === '×')
// 3
// expressionArray[operatorIndex - 1] = expressionArray[operatorIndex - 1] * expressionArray[operatorIndex + 1]
// 4
// expressionArray
// (5) ['2', '+', 4, '×', '2']
// expressionArray.splice(operatorIndex, 2)
// (2) ['×', '2']
// expressionArray
// (3) ['2', '+', 4]
// operatorIndex = expressionArray.findIndex(item => item === '+')
// 1
// expressionArray[operatorIndex - 1] = expressionArray[operatorIndex - 1] + expressionArray[operatorIndex + 1]
// '24'
// ﻿
