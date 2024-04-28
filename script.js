document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    let currentNumber = '';
    let firstNumber = '';
    let operator = '';
    let waitingForSecondNumber = false;
  
    function updateDisplay() {
      display.textContent = currentNumber;
    }
  
    function clear() {
      currentNumber = '';
      firstNumber = '';
      operator = '';
      waitingForSecondNumber = false;
      updateDisplay();
    }
  
    function backspace() {
      currentNumber = currentNumber.slice(0, -1);
      updateDisplay();
    }
  
    function appendNumber(number) {
      if (currentNumber === '0' || waitingForSecondNumber) {
        currentNumber = '';
        waitingForSecondNumber = false;
      }
      currentNumber += number;
      updateDisplay();
    }
  
    function setOperator(op) {
      if (waitingForSecondNumber) {
        operator = op;
      } else {
        firstNumber = currentNumber;
        operator = op;
        waitingForSecondNumber = true;
      }
    }
  
    function calculate() {
      let result;
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(currentNumber);
      if (operator === '+') {
        result = num1 + num2;
      } else if (operator === '-') {
        result = num1 - num2;
      } else if (operator === '*') {
        result = num1 * num2;
      } else if (operator === '/') {
        if (num2 === 0) {
          alert("Error: Cannot divide by zero!");
          clear();
          return;
        }
        result = num1 / num2;
      }
      currentNumber = result.toString();
      firstNumber = '';
      operator = '';
      waitingForSecondNumber = false;
      updateDisplay();
    }
  
    document.querySelectorAll('.number').forEach(button => {
      button.addEventListener('click', () => {
        appendNumber(button.value);
      });
    });
  
    document.querySelectorAll('.operator').forEach(button => {
      button.addEventListener('click', () => {
        setOperator(button.value);
      });
    });
  
    document.querySelector('.equals').addEventListener('click', () => {
      calculate();
    });
  
    document.querySelector('.clear').addEventListener('click', () => {
      clear();
    });
  
    document.querySelector('.backspace').addEventListener('click', () => {
      backspace();
    });
  
    document.querySelector('.decimal').addEventListener('click', () => {
      if (!currentNumber.includes('.')) {
        appendNumber('.');
      }
    });
  });
  