// 1. DOM References
const displayExpression = document.getElementById('expression');
const displayCurrent = document.getElementById('current-value');
const btnClear = document.getElementById('btn-clear');
const btnDelete = document.getElementById('btn-delete');
const btnEquals = document.getElementById('btn-equals');
const buttonsNumber = document.querySelectorAll('[data-action="number"]');
const buttonsOperator = document.querySelectorAll('[data-action="operator"]');
const btnDecimal = document.querySelector('[data-action="decimal"]');

// 2. Calculator State
let previousValue = '';
let currentValue = '0';
let operator = null;
let expression = '';
let shouldResetScreen = false;
let hasError = false;

// 3. Display Functions
function updateDisplay() {
    if (hasError) {
        displayCurrent.textContent = 'Error';
        displayExpression.textContent = '';
        return;
    }
    
    // Format long numbers by limiting decimal places or using scientific notation if extremely long
    let formattedCurrent = currentValue;
    if (currentValue.length > 12 && !currentValue.includes('e')) {
        const num = parseFloat(currentValue);
        if (!isNaN(num)) {
            // Avoid formatting while the user is typing decimals
            if (!currentValue.endsWith('.')) {
                 formattedCurrent = num.toPrecision(12).replace(/\.?0+$/, '');
                 // Fix scientific notation e+ formatting if needed
                 if (formattedCurrent.includes('e')) {
                     formattedCurrent = num.toExponential(6);
                 }
            }
        }
    }
    
    displayCurrent.textContent = formattedCurrent;
    displayExpression.textContent = expression;
}

// 4. Number Input
function inputNumber(number) {
    if (hasError) clearCalculator();
    
    if (currentValue === '0' || shouldResetScreen) {
        currentValue = number;
        shouldResetScreen = false;
    } else {
        // Prevent extremely long numbers
        if (currentValue.length < 15) {
            currentValue += number;
        }
    }
    updateDisplay();
}

// 5. Decimal Input
function inputDecimal() {
    if (hasError) clearCalculator();
    
    if (shouldResetScreen) {
        currentValue = '0';
        shouldResetScreen = false;
    }
    
    if (!currentValue.includes('.')) {
        currentValue += '.';
    }
    updateDisplay();
}

// 6. Operator Input
function chooseOperator(selectedOperator) {
    if (hasError) clearCalculator();
    
    if (operator !== null && !shouldResetScreen) {
        calculate();
    }
    
    if (selectedOperator === '%') {
        calculatePercentage();
        return;
    }
    
    previousValue = currentValue;
    operator = selectedOperator;
    expression = `${previousValue} ${getOperatorSymbol(operator)}`;
    shouldResetScreen = true;
    updateDisplay();
}

function getOperatorSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    if (op === '-') return '−';
    if (op === '+') return '+';
    return op;
}

// 7. Calculation
function calculate() {
    if (operator === null || shouldResetScreen || hasError) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result = 0;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                hasError = true;
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Fix floating point issues
    result = Math.round(result * 10000000000) / 10000000000;
    
    currentValue = result.toString();
    expression = `${previousValue} ${getOperatorSymbol(operator)} ${current} =`;
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function calculatePercentage() {
    if (currentValue === '0' || hasError) return;
    
    const current = parseFloat(currentValue);
    if (isNaN(current)) return;
    
    const result = current / 100;
    currentValue = result.toString();
    shouldResetScreen = true;
    updateDisplay();
}

// 8. Clear
function clearCalculator() {
    previousValue = '';
    currentValue = '0';
    operator = null;
    expression = '';
    shouldResetScreen = false;
    hasError = false;
    updateDisplay();
}

// 9. Delete
function deleteLast() {
    if (hasError) {
        clearCalculator();
        return;
    }
    
    if (shouldResetScreen) {
        // If we just calculated and pressed delete, maybe clear the expression but keep the result editable?
        // Usually, calculators clear the screen if delete is pressed right after equals.
        clearCalculator();
        return;
    }
    
    currentValue = currentValue.toString().slice(0, -1);
    
    if (currentValue === '' || currentValue === '-') {
        currentValue = '0';
    }
    
    updateDisplay();
}

// 10. Keyboard Input
function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') inputNumber(e.key);
    if (e.key === '.') inputDecimal();
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission or button clicking if focused
        calculate();
    }
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearCalculator();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperator(e.key);
    }
    if (e.key === '%') chooseOperator('%');
}

// 11. Event Listeners
buttonsNumber.forEach(btn => {
    btn.addEventListener('click', () => inputNumber(btn.dataset.value));
});

buttonsOperator.forEach(btn => {
    btn.addEventListener('click', () => chooseOperator(btn.dataset.value));
});

btnDecimal.addEventListener('click', inputDecimal);
btnEquals.addEventListener('click', calculate);
btnClear.addEventListener('click', clearCalculator);
btnDelete.addEventListener('click', deleteLast);

window.addEventListener('keydown', handleKeyboardInput);
