'use strict';

const container = document.getElementsByClassName('container')[0];

const 	wallpaper = document.querySelector('[data-wallpaper]'),
		username = document.querySelector('[data-username]'),
		description = document.querySelector('[data-description]'),
		pic = document.querySelector('[data-pic]'),
		tweets = document.querySelector('[data-tweets]'),
		followers = document.querySelector('[data-followers]'),
		following = document.querySelector('[data-following]');


const htmlAdrr = 'https://neto-api.herokuapp.com/twitter/jsonp';

function loadData() {
	const functionName = 'tweetParse ';
	return new Promise((done, fail) => {
    	window.tweetParse = done;
    	const script = document.createElement('script');
    	script.src = `${htmlAdrr}?callback=${functionName}`;
    	document.body.appendChild(script);
	}).then((content) => {
		username.textContent = content.username;
		description.textContent = content.description;
		tweets.textContent = content.tweets;
		followers.textContent = content.followers;
		following.textContent = content.following;
		wallpaper.src = content.wallpaper;
		pic.src = content.pic;
	}); 
}

loadData();
