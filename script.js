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
    return +a / +b;
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