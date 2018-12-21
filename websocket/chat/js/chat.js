'use strict';

const chat = document.getElementsByClassName('chat')[0];
const messageBox = chat.getElementsByClassName('message-box')[0];
const messageInput = messageBox.getElementsByClassName('message-input')[0];
const messageSubmit = messageBox.getElementsByClassName('message-submit')[0];
const chatStatus = chat.getElementsByClassName('chat-status')[0];

const messageStatusTemp = chat.getElementsByClassName('message-status')[0];
const messageTemp = chat.getElementsByClassName('messages-templates')[0].children[1];
const messagePersonalTemp = chat.getElementsByClassName('message-personal')[0];
const messagesContent = chat.getElementsByClassName('messages-content')[0];
const messagesLoad = chat.getElementsByClassName('message loading')[0];

messagesContent.style.overflow = 'auto';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat')

function insertMessage(node, data) {
	let message = node.cloneNode(true);
	message.getElementsByClassName('message-text')[0].innerText = data;
	if (message.getElementsByClassName('timestamp')[0]) {
		let d = new Date();
		message.getElementsByClassName('timestamp')[0].innerText = d.getHours() +':'+ d.getMinutes();
	};
	messagesContent.appendChild(message);
	messageInput.value = '';
	messagesContent.scrollTop = messagesContent.scrollHeight;
}

function toOffConnection() {
	chatStatus.innerText = chatStatus.dataset.offline;;
	messageSubmit.setAttribute('disabled', true);
	messageSubmit.removeAttribute('enable');
	insertMessage(messageStatusTemp, 'Пользователь не в сети')
}

function newMessage(event) {
	if (event.data == '...') {
		let message = messagesLoad.cloneNode(true);
		messagesContent.appendChild(message);
	} else {
		if (messagesContent.lastChild.classList.contains('message loading')) {
			messagesContent.remove(messagesContent.lastChild);
		}
	insertMessage(messageTemp, event.data);
	}
};

function myMessageSend(event) {
	event.preventDefault();
	connection.send(messageInput.value);
	insertMessage(messagePersonalTemp, messageInput.value)
};

messageSubmit.addEventListener('click', myMessageSend);

connection.onopen = function() {
	chatStatus.innerText = chatStatus.dataset.online;
	messageSubmit.setAttribute('enable', true);
	messageSubmit.removeAttribute('disabled');
	let message = messageStatusTemp.cloneNode(true);
	message.children[0].innerText = 'Пользователь появился в сети';
	messagesContent.appendChild(message);
};

connection.onclose = function(event) {
	if (event.wasClean) {
		toOffConnection();
	} else {
		toOffConnection();
		throw new Error(`Обрыв соединения. Код ${event.data}`);
	}
};

connection.onerror = function(error) {
	throw new Error(error)
};

connection.onmessage = function(event) {
	newMessage(event);
};
