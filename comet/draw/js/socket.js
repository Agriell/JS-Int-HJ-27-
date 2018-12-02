'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

connection.addEventListener('open', (event) => {
	if (event.target.readyState == 1) {
		console.log('Соединение с сервером успешно установлено');
	} else {
		throw new Error('Какая-то ерудна с соединением..');
	}
});

connection.addEventListener('message', (event) => {
	console.log(event);
});

editor.addEventListener('update', (event) => {
	canvas.toBlob(blob => connection.send(blob))
});
