function add(a, b, operator) {
  operator = '+';
  return +a + +b; 
};

function subtract(a, b, operator) {
  operator = '-';
  return +a - +b; 
}

function multiply(a, b, operator) {
  operator = '×';
  return +a * +b; 
}

function divide(a, b, operator) {
  operator = '/';
  return +a / +b; 
}

// Takes two numbers and an operator
// Depending on what operator is passed
// Calls appropriate function
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

let firstValue;
let secondValue;
let operatorSign;
const displayExpression = document.querySelector('.display .expression');
const displayResult = document.querySelector('.display .result');
const numberButtons = document.querySelectorAll('.number');
const functionalButton = document.querySelectorAll('.functional-button');
const equalsButton = document.querySelector('#equalsButton');
let tempValue = '';

// Make digit appear on display, not in temp value
function populateDisplay(number) {
  if (displayExpression.textContent === '0') {
    displayExpression.textContent = '';
  }
  displayExpression.textContent += number;
}

// ON PRESSING NUMBER BUTTON
// Populate display and add this number to tempValue
for (let number of numberButtons) {
  number.addEventListener('click', (e) => {
    populateDisplay(e.target.textContent);
    tempValue += e.target.textContent;
  })
}

// ON PRESSING OPERATOR BUTTON
for (let operator of functionalButton) {
  operator.addEventListener('click', (e) => {
    if (!firstValue) {
      firstValue = tempValue;
      tempValue = '';
    }
    if (!secondValue && firstValue) {
      secondValue = tempValue;
      tempValue = '';
    }
    if (firstValue && secondValue) {
      firstValue = operate(firstValue, operatorSign, secondValue);
      displayExpression.textContent = firstValue;
      secondValue = '';
    }
    operatorSign = operator.innerText;
    if (firstValue === '' && secondValue) {
      firstValue = displayExpression.textContent;
      displayExpression.textContent += `${operatorSign}`; 
      tempValue = '';
      return;
    };
    displayExpression.textContent += `${operatorSign}`; 
  })
};

// ON PRESSING EQUALS BUTTON
equalsButton.addEventListener('click', () => {
  if (!secondValue) {
   secondValue = tempValue;
  }
  if (secondValue) {

  }
  const result = operate(+firstValue, operatorSign, +secondValue);
  displayExpression.textContent = result;
  firstValue = result;
  secondValue = '';
  tempValue = '';
})


//TO DO
//
// Change display when evaluating number!
// 
// Add +/- button
// Add remainder
// 