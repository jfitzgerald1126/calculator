// globals
let displayValue = '0'
let prev;
let operator;
let newPressed = false;


// math functions
function add (a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    if (b != 0) {
        return +a / +b;
    } else {
        return 'ERR';
    }    
}

function operate(f, s, op) {
    switch (op) {
        case '+':
            return add(f, s);
            break;
        case '-':
            return subtract(f, s);
            break;
        case '×':
            return multiply(f, s);
            break;
        case '÷':
            return divide(f, s);
            break;
        default:
            break;
    }
}

function clearDisplay() {
    const disp = document.querySelector('.display-text');
    disp.textContent = '0';
}

function updateDisplay(numPressed) {
    const disp = document.querySelector('.display-text');
    if (disp.textContent.length >= 10) {
        return;
    }
    disp.textContent = (disp.textContent === '0' || prev === displayValue) ? numPressed : `${disp.textContent}${numPressed}`;
    displayValue = disp.textContent;
}

// wire up event listeners for number buttons
const nums = document.querySelectorAll('.num');
nums.forEach((num) => {
    num.addEventListener('click', function(num) {
        // activate / deactivate button

        // apend num to display
        newPressed = true;
        updateDisplay(this.textContent);
    })
})

// wire up event listeners for operator buttons
const operators = document.querySelectorAll('.op');
operators.forEach((op) => {
    if (op.textContent !== '=') {
        op.addEventListener('click', function(op) {
            prev = displayValue;
            operator = this.textContent;
        })
    }
})

// clear
const clear = document.querySelector('#clear');
clear.addEventListener('click', (e) => {
    clearDisplay();
    displayValue = '0';
    prev = undefined;
});

function updatePrev() {
    if (newPressed) {
        prev = displayValue;
    }
}

// operate
const equals = document.querySelector('#equals');
equals.addEventListener('click', (e) => {
    console.log(prev)
    if (prev) {
        let res = '';
        if (newPressed) {
            res = operate(prev, displayValue, operator);
        } else {
            res = operate(displayValue, prev, operator);
        }
        
        clearDisplay();

        // check if new value should be stored for prev
        updatePrev();

        newPressed = false;
        updateDisplay(res); 
    }
})

