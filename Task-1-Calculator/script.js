const input = document.querySelector('input');
const buttons = document.querySelectorAll('button');
let expression = '';

document.addEventListener('keydown', handleKeyPress)

function handleKeyPress(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    }
}

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const buttonContent = btn.innerText;
        if (buttonContent === '=') {
            calculate();
        } else if (buttonContent === 'clear') {
            clearDisplay();
        } else if (btn.getAttribute('class') === 'backspace') {
            console.log(buttonContent)
            backspace();
        }
        else {
            appendToDisplay(buttonContent);
        }
    })
})

function appendToDisplay(value) {
    input.value += value;
}
function clearDisplay() {
    input.value = '';
}
function backspace() {
    input.value = display.value.slice(0, -1);
}
function calculate() {
    try {
        if (input.value === '') {
            input.value = 'Enter values'
            setTimeout(() => { input.value = '' }, 1000)
        } else {
            const result = eval(input.value);
            input.value = result;
        }
    } catch (error) {
        input.value = 'Error';
        setTimeout(() => { input.value = '' }, 1000)

    }
}