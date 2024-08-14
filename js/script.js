const billInput = document.getElementById('bill-input');
const percentageButtons = document.querySelectorAll('div[data-percent]');
const percentageInput = document.getElementById('percentage-input');
const peopleInput = document.getElementById('people-input');
const errorDivPeople = document.getElementById('error-people')
const amountDisplay = document.getElementById('amount');
const totalDisplay = document.getElementById('total');
const resetButton = document.getElementById('reset-btn');

let percentage = 0;
let bill = 0;
let people = 1;
let tip = 0;
let total = 0;

function toggleActiveClass(target, elements) {
	elements.forEach(ele => ele.classList.remove('active'))
	target.classList.add('active');
}

function removeActiveClass(elements) {
	elements.forEach(ele => ele.classList.remove('active'))
}

function calcAmount(bill, percentage, people) {
	return (bill * percentage) / people
}

function calcTotal(bill, tip, people) {
	return (bill + tip * people) / people
}

function updateDisplay(display, value) {
	display.textContent = `$${value}`;
}

function calcAndDisplay() {
		tip = calcAmount(bill, percentage, people).toFixed(2)
		total = calcTotal(bill, tip, people).toFixed(2);
		updateDisplay(amountDisplay, tip);
		updateDisplay(totalDisplay, total);
}

function isValid(input, errorDiv) {
	if (Number.isNaN(Number(input.value))) {
		errorDiv.textContent = "Must be a number";
		errorDiv.classList.add('active');
		return false;
	} else if (Number(input.value) <= 0) {
		errorDiv.textContent = "Must be positive"
		errorDiv.classList.add('active');
		return false;
	}
	errorDiv.classList.remove('active');
	return true
}

function reset() {
	percentage = 0.15;
	bill = 0;
	people = 1;
	tip = 0;
	total = 0;
	removeActiveClass(percentageButtons);
	billInput.value = '';
	peopleInput.value = '';
	percentageInput.value = '';
	resetButton.setAttribute('disabled', "")
}

resetButton.addEventListener('click', reset);

percentageButtons.forEach(button => {
	button.addEventListener('click', (e) => {
		toggleActiveClass(e.target, percentageButtons)
		percentage = Number(e.target.dataset.percent);
		resetButton.removeAttribute('disabled')
		if (isValid(peopleInput, errorDivPeople)) {
			calcAndDisplay();
		}
	});
});

percentageInput.addEventListener('focus', (e) => {
	percentage = Number(e.target.value) / 100;
	if (isValid(peopleInput, errorDivPeople)) {
		calcAndDisplay();
	}
})
percentageInput.addEventListener('input', (e) => {
	percentage = Number(e.target.value) / 100;
	resetButton.removeAttribute('disabled')
	if (isValid(peopleInput, errorDivPeople)) {
		calcAndDisplay();
	}
})

peopleInput.addEventListener('input', (e) => {
	people = Number(e.target.value);
	resetButton.removeAttribute('disabled')
	if (isValid(peopleInput, errorDivPeople)) {
		calcAndDisplay();
	}
})

billInput.addEventListener('input', (e) => {
	bill = Number(e.target.value);
	resetButton.removeAttribute('disabled')
	if (isValid(peopleInput, errorDivPeople)) {
		calcAndDisplay();
	}
})
