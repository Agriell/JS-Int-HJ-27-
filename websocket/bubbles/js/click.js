'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

window.addEventListener('click', (event) => {
	// console.log(event)
	let mess = {'x': event.offsetX, 'y': event.offsetY};
	connection.send(JSON.stringify(mess));
})

showBubbles(connection);