'use strict';

const pupil = document.querySelector('.big-book__pupil');
let pupilCoord = pupil.getBoundingClientRect();
let eyeCoord = pupil.parentElement.getBoundingClientRect();

let pupilXFact = pupilCoord.x + pupilCoord.width;
let pupilYFact = pupilCoord.y + pupilCoord.width;

let totalWidth = document.documentElement.clientWidth;
let totalHeight = document.documentElement.clientHeight;

window.onresize = () => {
	let totalWidth = document.documentElement.clientWidth;
	let totalHeight = document.documentElement.clientHeight;
};

function toMoveEye(x, y, size) {
	pupil.style.setProperty('--pupil-x', `${x}px`);
	pupil.style.setProperty('--pupil-y', `${y - pupilCoord.width}px`);
	pupil.style.setProperty('--pupil-size', size);	
}

// версия 4 - полярные координаты

function calculateParam(cursorX, cursorY) {
	let eyeX, eyeY, pupilX, pupilY, size, fi, radius, maxRadius;
	// определяем координаты центра глаза
	eyeX = eyeCoord.x + eyeCoord.width / 2;
	eyeY = eyeCoord.y + eyeCoord.width / 4;
	// парамаетры в радиальной сист коорд
	maxRadius = Math.max(eyeX, eyeY, totalWidth - eyeX, totalHeight - eyeY);
	fi = Math.atan((cursorY - eyeY) / (cursorX - eyeX));
	radius = Math.sqrt((cursorX - eyeX) * (cursorX - eyeX) + (cursorY - eyeY) * (cursorY - eyeY));
	let eyeRadInt = 25 * radius / maxRadius;
	// параметры зрачка
	if (cursorX <= eyeX) {
		pupilX = - eyeRadInt * Math.cos(fi);
		if (cursorY <= eyeY) {
			pupilY = - eyeRadInt * Math.sin(fi);
		} else {
			pupilY = - eyeRadInt * Math.sin(fi);
		}
	} else {
		pupilX = eyeRadInt * Math.cos(fi)
		if (cursorY <= eyeY) {
			pupilY = eyeRadInt * Math.sin(fi);
		} else {
			pupilY = eyeRadInt * Math.sin(fi);
		}
	}
	size = 3 - 3 * radius / maxRadius;
	if (size < 1) size = 1;
	
	toMoveEye(pupilX, pupilY + eyeCoord.width / 4 - pupilCoord.width/2, size);
}

document.addEventListener('mousemove', (event) => {
	calculateParam(event.x, event.y)
});
