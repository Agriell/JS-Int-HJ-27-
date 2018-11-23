'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

window.addEventListener('click', (event) => {
	let mess = {'x': event.screenX, 'y': event.screenY};
	connection.send(JSON.stringify(mess));
})

showBubbles(connection);