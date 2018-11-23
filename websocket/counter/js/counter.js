'use strict';

let	counter = document.getElementsByClassName('counter')[0],
	errorQnty = document.getElementsByClassName('errors')[0];

function createConnection() {
	const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
	
	connection.onmessage = function(event) {
		counter.textContent = JSON.parse(event.data).connections;
		errorQnty.textContent = JSON.parse(event.data).errors;
	};
	connection.onerror = function(event) {console.log(event.data)};
	connection.onclose = function() {counter.textContent = 0};
}

function closeConnection() {
	console.log('Завершаю соединение ')
	counter.textContent = 0;
}

window.addEventListener('beforeunload', (event) => {
	connection.onclose = closeConnection(event.currentTarget);
	connection.close(1000, 'Соединение завершено.')
})

createConnection()
