'use strict';

const 	recipe = {},
		recipeRating = {};
let		url,
		userList = [];

function loadDataRecipe() {
	function dataRecipeParse() {};
	url = 'https://neto-api.herokuapp.com/food/42';
	return new Promise((done, error) => {
		window.dataRecipeParse = done;
		const script = document.createElement('script');
		script.src = `${url}?callback=dataRecipeParse`;
		document.body.appendChild(script);
	}).then((result) => {
		// console.log(result)
		recipe.id = result.id;
		recipe.title = result.title;
		recipe.ingredients = result.ingredients;
		recipe.pic = result.pic;
	});
}

function loadRecipeRating() {
	function dataRecipeRating() {};
	url = 'https://neto-api.herokuapp.com/food/42/rating';
	return new Promise((done, error) => {
		window.dataRecipeRating = done;
		const script = document.createElement('script');
		script.src = `${url}?callback=dataRecipeRating`;
		document.body.appendChild(script);
	}).then((result) => {
		// console.log(result)
		recipeRating.rating = result.rating;
		recipeRating.votes = result.votes;
	});
}

function loadUserList() {
	function userListeParse() {};
	url = 'https://neto-api.herokuapp.com/food/42/consumers';
	return new Promise((done, error) => {
		window.userListeParse = done;
		const script = document.createElement('script');
		script.src = `${url}?callback=userListeParse`;
		document.body.appendChild(script);
	}).then((result) => {
		// console.log(result)
		userList = result;
	});
}


const	pic = document.querySelector('[data-pic]'),
		title = document.querySelector('[data-title]'),
		ingredients = document.querySelector('[data-ingredients]'),
		rating = document.querySelector('[data-rating]'),
		star = document.querySelector('[data-star]'),
		votes = document.querySelector('[data-votes]'),
		consumers = document.querySelector('[data-consumers]');


function profileFilling() {
	pic.style = `background: url(${recipe.pic});`;
	title.textContent = recipe.title;
	
	let text = '';
	for (let i = 0; i < recipe.ingredients.length; i++) {
		if (i != recipe.ingredients.length - 1) {
			text += recipe.ingredients[i] + ', ';
		} else { 
			text += recipe.ingredients[i] + '.'; 
		}
	}
	ingredients.textContent = text;

	rating.textContent = Math.round(recipeRating.rating * 100) / 100;
	star.style = `width: ${Math.round(recipeRating.rating * 10)}%;`;
	votes.textContent = `${recipeRating.votes} оценок`;


	for (let user of userList.consumers) {
		consumers.innerHTML += 
			`<img src="${user.pic}" title="${user.name}">`;
	};

	consumers.innerHTML += `<span>(+${userList.total})</span>`;
}

// function start() {
// 	return new Promise((done, error) => {
// 		loadDataRecipe();
// 		loadRecipeRating();
// 		loadUserList();
// 		// done()
// 	})
// }

// start().then((done) => {profileFilling()})


loadDataRecipe();
loadRecipeRating();
loadUserList();


window.addEventListener('load', profileFilling);
