'use strict';

const 	user = {},
		urlUser = 'https://neto-api.herokuapp.com/profile/me';

function loadUserData() {
	function userDataParse() {};
	return new Promise((done, error) => {
		window.userDataParse = done;
		const script = document.createElement('script');
		script.src = `${urlUser}?callback=userDataParse`;
		document.body.appendChild(script);
	}).then((result) => {
		user.id = result.id;
		user.name = result.name;
		user.description = result.description;
		user.position = result.position;
		user.pic = result.pic;
		loadTechnologyData(user.id);
	});
}

loadUserData();

function loadTechnologyData(id) {
	const url = `https://neto-api.herokuapp.com/profile/${id}/technologies`;
	function technoDataParse() {};
	return new Promise((done, error) => {
		window.technoDataParse = done;
		const script = document.createElement('script');
		script.src = `${url}?callback=technoDataParse`;
		document.body.appendChild(script);
	}).then((result) => {
		profileFilling(result);
	});
}

const 	content = document.getElementsByClassName('content')[0],
		name = document.querySelector('[data-name]'),
		description = document.querySelector('[data-description]'),
		pic = document.querySelector('[data-pic]'),
		position = document.querySelector('[data-position]'),
		technologies = document.querySelector('[data-technologies]');

function profileFilling(userTech) {
	name.textContent = user.name;
	description.textContent = user.description;
	pic.src = user.pic;
	position.textContent = user.position;
	
	for (let item of userTech) {
		technologies.innerHTML += `<span class="devicons devicons-${item}"></span>`;
	};

	content.style = 'display: initial';
}