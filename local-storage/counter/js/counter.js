'use strict';

const 	counter = document.getElementById('counter'),
		incrementButton = document.getElementById('increment'),
		decrementButton = document.getElementById('decrement'),
		resetButton = document.getElementById('reset');
let counterValue;

function cookieParse(variable) {
	let list = Array.from(document.cookie.split(';'));
	for (let el of list) {
		if (String(el.split('=')[0]) == variable) {
			let val = el.split('=')[1];
			return val;
		};
	};
	return null;
};

if (cookieParse('countVal')) {
	counterValue = cookieParse('countVal');
} else {counterValue = 0};

counter.innerText = counterValue;

function countHandler(arg) {
	switch(arg) {
		case '+':
		counterValue++;
		break;
		case '-':
		counterValue--;
		break;
		case 'del':
		counterValue = 0;
		break;
	}
	if (counterValue < 0) {
		counterValue = 0
	} else {
		counter.innerText = counterValue;
		document.cookie = 'countVal=' + counterValue;
	};
};

incrementButton.addEventListener('click', event => countHandler('+'));
decrementButton.addEventListener('click', event => countHandler('-'));
resetButton.addEventListener('click', event => countHandler('del'));


