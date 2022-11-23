class Calculator { // Declaring a class that will hold the calculator and its functions
	constructor(previousOperandTextElement, currentOperandTextElement) { // Creating and initializing the calculator output
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear () { // This function clears the value in the variables of the calculator and serves as an AC button
		this.currentOperand = ""
		this.previousOperand = ""
		this.operation = undefined
	}
	
	delete () { // This function deletes the last digit of a number and serves as DEL button
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	
	appendNumber (number) { // This function adds every clicked number to the screen for calculation
		if (number == '.' && this.currentOperand.includes('.')) return

		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperation(operation) { // This function stores the particular operator to be used for computation
		if (this.currentOperand === '') return

		if (this.previousOperand !== '') {
			this.compute()
		}

		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() { // This function takes the values of the calculator and computes a single value number depending on the selected operator
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)

		if (isNaN(prev) || isNaN(current)) return

		switch (this.operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				return
		}

		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	getDisplayNumber(number) { // This function separates decimal numbers correctly with a comma
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay

		if (isNaN(integerDigits)) {
			integerDisplay = ''
		}
		else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0
			})
		}
		
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		}
		else {
			return integerDisplay
		}
	}

	updateDisplay() { // This function updates the values inside the output of the calculator
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
		}
		else {
			this.previousOperandTextElement.innerText = ''
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => { // This event listener on click over a number, performs appendNumber and updateDisplay functions to add each selected number and update the output display
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => { // This event listener on click over operator, performs chooseOperation and updateDisplay functions to add the selected operator and update the output display
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', button => { // This event listener on click over the equals button, performs compute and updateDisplay functions to do computation and update the output display
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => { // This event listener on click over the AC button, performs clear and updateDisplay functions to clear all values and update the output display
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => { // This event listener on click over the DEL button, performs delete and updateDisplay functions to delete the last digit of a number and update the output display
	calculator.delete()
	calculator.updateDisplay()
})