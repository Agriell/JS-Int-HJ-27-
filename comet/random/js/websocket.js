'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const containerWeb = document.getElementsByClassName('websocket')[0].getElementsByTagName('div');

connection.addEventListener('message', (event) => {
	if (event.data >= 1 &  event.data <= 10 ) {
		Array.from(containerWeb).forEach(elem => elem.classList.remove('flip-it'))
		containerWeb[event.data - 1].classList.add('flip-it');
	} else throw new Error('Wrong data!');
})
