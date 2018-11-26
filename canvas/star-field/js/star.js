'use strict'

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth * 0.9;
ctx.canvas.height = window.innerHeight * 0.9;
const PI = Math.PI;

function randomVal(from, to) {
	return from + Math.round(Math.random() * (to - from));
};

function createStar() {
	const star = {};
	star.x = randomVal(0, canvas.width),
	star.y = randomVal(0, canvas.height),
	star.radius = randomVal(0, 11) / 10,
	star.bright = randomVal(80, 100) / 100;

	switch (randomVal(1, 3)) {
	case 1:
		star.color = '#ffffff';
		break;
	case 2:
		star.color = '#ffe9c4';
		break;
	case 3:
		star.color = '#d4fbff';
		break;
	}
	return star
};

function drawStar(star) {
	ctx.beginPath();
	ctx.globalAlpha = star.bright;
	ctx.arc(star.x, star.y, star.radius, 0, 2 * PI);
	ctx.fillStyle = star.color;
	ctx.fill();
}

function drawSky() {
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = 'black';
	ctx.fill();

	let counter = randomVal(200, 400);
	while (counter) {
		drawStar(createStar());
		counter--;
	}
}

canvas.addEventListener('click', drawSky);

drawSky();

// При открытии и при клике на холст необходимо генерировать 
// новую картинку звёздного неба, отвечающую следующим требованиям:

// Количество звезд на картинке должно быть случайным в диапазоне
 // от 200 до 400 штук.
// Фон звездного неба должен быть чисто чёрным.
// Размер звезды – случайный от 0 до 1.1 точек.
// Цвет звезды – случайный из трёх возможных вариатов: 
// #ffffff, #ffe9c4, #d4fbff.
// Яркость звезды – случайная в диапазоне от 0.8 до 1. Яркость 
// задаётся свойством globalAlpha.
// Расположение каждой звезды – случайное, но в пределах холста.