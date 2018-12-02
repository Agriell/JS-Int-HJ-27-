'use strict';

const xhr = new XMLHttpRequest();
const containerPool = document.getElementsByClassName('pooling')[0].getElementsByTagName('div');

function sendRequest() {
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');

	xhr.addEventListener('load', (event) => {
		if (event.srcElement.response >= 1 &  event.srcElement.response <= 10 ) {
			Array.from(containerPool)
				.forEach(elem => elem.classList.remove('flip-it'));
			containerPool[event.srcElement.response - 1].classList.add('flip-it');
		} else throw new Error('Wrong data!');
	});
	xhr.send();
};

let timerId = setInterval(function() {
	// console.log('запрос пошел')
	sendRequest();
}, 5000);

