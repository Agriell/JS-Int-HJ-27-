'use strict';

const 	signInHtm = document.getElementsByClassName('sign-in-htm')[0],
		buttons = document.getElementsByClassName('button'),
		signUpHtm = document.getElementsByClassName('sign-up-htm')[0],
		// signUpButton = signUpHtm.getElementsByClassName('button')[0],
		signInHtml = 'https://neto-api.herokuapp.com/signin',
		signUpHtml = 'https://neto-api.herokuapp.com/signup';

let		signOutput, statusUser, htmlAdress;

function formFilling(form) {
	let formData = new FormData(form),
		forRequest = {};
	for (let [k, v] of formData) {
		forRequest[k] = v;
	};
	return JSON.stringify(forRequest);
};

function varAssignment(event) {
	if (event.target.parentElement.parentElement.classList.contains('sign-in-htm')) {
		htmlAdress = 'https://neto-api.herokuapp.com/signin';
		signOutput = signInHtm.getElementsByTagName('output')[0];
		statusUser = 'авторизован'
	};
	if (event.target.parentElement.parentElement.classList.contains('sign-up-htm')) {
		htmlAdress = 'https://neto-api.herokuapp.com/signup';
		signOutput = signUpHtm.getElementsByTagName('output')[0];
		statusUser = 'зарегистрирован'
	};
};

function responseHandler(response) {
	if (response.error) {
		signOutput.value = response.message;
		return;
	}
	signOutput.value = 'Пользователь ' + response.name + ' успешно ' + statusUser;
};

function sendRequest(event) {
	const 	xhr = new XMLHttpRequest(),
			form = event.target.parentElement.parentElement;
	varAssignment(event);
	
	xhr.addEventListener('load', (event) => {
		responseHandler(JSON.parse(xhr.response));
	});
	xhr.addEventListener('error', (event) => {
		throw new Error(xhr.error);
	});
	xhr.open('POST', htmlAdress);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(formFilling(form));
}

for (let button of buttons) {
	button.addEventListener('click', event => {
		event.preventDefault();
		sendRequest(event);
	});
};


// function sendRequest(event) {
// 	const form = event.target.parentElement.parentElement;
// 	varAssignment(event);
// 	fetch (htmlAdress, {
// 		body: formFilling(form),
// 		credentials:'same-origin',
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 	})
// 		.then ((result) => {JSON.parse(result)})
// 		.then ((response) => responseHandler(response))
// 		.catch ((error) => {
// 			throw new Error(error);
// 		})
// };
