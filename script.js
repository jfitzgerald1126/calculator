// globals
let first;
let second;
let operator;

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
        case '*':
            return multiply(f, s);
            break;
        case '/':
            return divide(f, s);
            break;
        default:
            break;
    }
}

function updateDisplay(numPressed) {
    const disp = document.querySelector('.display-text');
    if (disp.textContent.length >= 10) {
        return;
    }
    disp.textContent = (disp.textContent === '0') ? numPressed : `${disp.textContent}${numPressed}`;
}

// wire up event listeners for number buttons
const nums = document.querySelectorAll('.num');
// console.log(nums);
nums.forEach((num) => {
    // console.log(num.textContent)
    num.addEventListener('click', function(num) {
        // activate / deactivate button

        // apend num to display

        updateDisplay(this.textContent);
    })
})
