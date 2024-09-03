function Calculator(previosOperandText, currentOperandText) {
    this.previosOperandText = previosOperandText;
    this.currentOperandText = currentOperandText;
    this.readyToReset = false;
    this.allClear();
}
      
Calculator.prototype.allClear = function() {
    this.currentOperand = '';
    this.previosOperand = '';
    this.operation = undefined;
} 
    
Calculator.prototype.delete = function() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
}
    
Calculator.prototype.appendNumber = function(number) {
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
}
    
Calculator.prototype.chooseOperation = function(operation) {
    if(this.currentOperand === '') return;
    if(this.previosOperand !== '') {
        this.computeResult();
    }
    this.operation = operation;
    this.previosOperand = this.currentOperand;
    this.currentOperand = '';
}
    
Calculator.prototype.computeResult = function() {
    let calc;
    const prev = parseFloat(this.previosOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation) {
        case '+':
            calc = prev + current;
            break;
        case '-':
            calc = prev - current;
            break;
        case '*':
            calc = prev * current;
            break;
        case '÷':
            calc = prev / current;
            break;
        default:
            return;
    }
    this.readyToReset = true;
    this.currentOperand = calc;
    this.operation = undefined;
    this.previosOperand = '';
}
        
Calculator.prototype.updateView  = function() {
    this.currentOperandText.innerText = this.currentOperand;
    if(this.operation != null) {
        this.previosOperandText.innerText = `${this.previosOperand}
         ${this.operation}`;
    } else {
        this.previosOperandText.innerText = '';
    }
}
    
Calculator.prototype.changeNegative = function() {
    this.currentOperand *= -1;
}
    
Calculator.prototype.computePercent = function() {
    this.currentOperand = this.currentOperand * (this.previosOperand / 100);
}

const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const equalsBtns = document.querySelector(".equals");
const allClearBtns = document.querySelector(".all-clear");
const deleteBtns = document.querySelector(".delete");
const changeNegativeBtns = document.querySelector(".change-negative");
const percentBtns = document.querySelector(".percent");
const previosOperandText = document.querySelector(".previos-operand");
const currentOperandText  = document.querySelector(".current-operand");

const calculator = new Calculator(previosOperandText, currentOperandText);


numberBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if(calculator.previosOperand === '' && calculator.currentOperand !== '' && calculator.readyToReset) {
            calculator.currentOperand = '';
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateView();
    });
});

operationBtns.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateView();
    });
});

equalsBtns.addEventListener("click", () => {
    calculator.computeResult();
    calculator.updateView();
});

allClearBtns.addEventListener("click", () => {
    calculator.allClear();
    calculator.updateView();
});

deleteBtns.addEventListener("click", () => {
    calculator.delete();
    calculator.updateView();
});

changeNegativeBtns.addEventListener("click", () => {
    calculator.changeNegative();
    calculator.updateView();
});

percentBtns.addEventListener("click", () => {
    calculator.computePercent();
    calculator.updateView();
});