// globals
let displayValue = '0'
let prev;
let operator;
let newPressed = false;
let hasDecimal = false;

// math functions
function add (a, b) {
    const ans = +a + +b;
    return (ans.toString().length <= 10) ? ans : 'ERR';
}

function subtract(a, b) {
    const ans = +a - +b;
    return (ans.toString().length <= 10) ? ans : 'ERR';
}

function multiply(a, b) {
    const ans = +a * +b;
    return (ans.toString().length <= 10) ? ans : 'ERR';
}

function divide(a, b) {
    if (b != 0) {
        const ans = +a / +b;
        const decimalPlaces = 10 - Math.round(ans).toString().length;
        return Math.round(ans * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
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
        
        // check if decimal can be added
        if (this.textContent === '.') {
            if (hasDecimal) {
                return;
            } else {
                hasDecimal = true;
            }
        }

        // apend num to display
        newPressed = true;
        updateDisplay(this.textContent);
    })
})

// set up event listeners for operator buttons
const operators = document.querySelectorAll('.op');
operators.forEach((op) => {
    if (op.textContent !== '=') {
        op.addEventListener('click', function(op) {
            // check for err
            if (checkErr()) {
                clearDisplay();
                return;
            }

            // only operate on operator press if new operand is provided
            if (newPressed) executeEquals();
            hasDecimal = false;
            prev = displayValue;
            operator = this.textContent;
        })
    }
})

function checkErr() {
    const disp = document.querySelector('.display-text');
    return disp.textContent === 'ERR';
}

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

function executeEquals() {
    // check for err
    if (checkErr()) {
        clearDisplay();
        return;
    }

    console.log(prev)
    hasDecimal = false;
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
}

// operate
const equals = document.querySelector('#equals');
equals.addEventListener('click', executeEquals);

