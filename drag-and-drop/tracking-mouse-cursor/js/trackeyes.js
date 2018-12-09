const eyes = document.querySelectorAll('.cat_eye');
const leftEyeCoord = eyes[0].getBoundingClientRect();
const rightEyeCoord = eyes[1].getBoundingClientRect();
let totalWidth = document.documentElement.clientWidth;
let totalHeight = document.documentElement.clientHeight;

eyes[0].style.left = `25%`;
eyes[0].style.top = `25%`;
eyes[1].style.left = `25%`;
eyes[1].style.top = `25%`;

function XY(eyeX, eyeY, curX, curY) {
	let x, y;
	if (curX < eyeX) x = -1 * 25 * (eyeX - curX) / eyeX;
	if (curX > eyeX) x = 25 * (curX - eyeX) / (totalWidth - eyeX);
	if (curY < eyeY) y = -1 * 25 * (eyeY - curY) / eyeY;
	if (curY > eyeY) y = 25 * (curY - eyeY) / (totalHeight - eyeY);
	return {x, y};
};

function drawEyes(event) {
	let leftX = leftEyeCoord.left + leftEyeCoord.width / 2;
	let leftY = leftEyeCoord.top + leftEyeCoord.height / 2;
	let rightX = rightEyeCoord.left + rightEyeCoord.width / 2;
	let rightY = rightEyeCoord.top + rightEyeCoord.height / 2

	let coordL = XY(leftX, leftY, event.offsetX, event.offsetY);

	eyes[0].style.left = `${25 + coordL.x}%`;
	eyes[0].style.top = `${25 + coordL.y}%`;

	let coordR = XY(rightX, rightY, event.offsetX, event.offsetY);

	eyes[1].style.left = `${25 + coordR.x}%`;
	eyes[1].style.top = `${25 + coordR.y}%`;
};

function trottle(callback, delay) {
	let isWaiting = false;
	return function() {
		if (!isWaiting) {
			callback.apply(this, arguments);
			isWaiting = true;
			setTimeout(() => {
				isWaiting = false;
			}, delay);
		}
	}
};

window.onresize = () => {
	let totalWidth = document.documentElement.clientWidth;
	let totalHeight = document.documentElement.clientHeight;
};

document.addEventListener('mousemove', 
	(event) => trottle(drawEyes(event), 16)
);
