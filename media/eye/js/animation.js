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

function calculateParam(cursorX, cursorY) {
	let factorX = totalWidth / pupilXFact;
	let factorY = totalHeight / pupilYFact;
	let pupilX = Math.round(1000 * (cursorX	- pupilXFact) / totalWidth / 30 * factorX);
	let pupilY = Math.round(1000 * (cursorY - pupilYFact) / totalHeight / 30 * factorY);
	
	if (pupilX > 30) pupilX = 30;
	if (pupilX < -30) pupilX = -30;
	if (pupilY > 30 + pupilCoord.width) pupilY = 30 + pupilCoord.width;
	if (pupilY < -30 + pupilCoord.width) pupilY = -30 + pupilCoord.width;

	let xMax = Math.max((totalWidth - pupilXFact), pupilXFact);
	let yMax = Math.max((totalHeight - pupilYFact), pupilYFact);
	let maxDist = Math.sqrt(xMax * xMax + yMax * yMax) / 3;

	let eyeDist = Math.sqrt((cursorX - pupilXFact) * (cursorX - pupilXFact) + (cursorY - pupilYFact) *(cursorY - pupilYFact));

	let size = 4 - eyeDist / maxDist;

	if (size < 1) size = 1;
	if (size > 3) size = 3;

	toMoveEye(pupilX, pupilY, size);
}

document.addEventListener('mousemove', (event) => {
	calculateParam(event.x, event.y)
});
