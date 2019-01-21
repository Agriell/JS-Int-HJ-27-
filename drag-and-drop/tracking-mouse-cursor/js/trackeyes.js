const eyes = document.querySelectorAll('.cat_eye');
const leftEyeCoord = eyes[0].getBoundingClientRect();
const rightEyeCoord = eyes[1].getBoundingClientRect();
let totalWidth = document.documentElement.clientWidth;
let totalHeight = document.documentElement.clientHeight;

window.onresize = () => {
	let totalWidth = document.documentElement.clientWidth;
	let totalHeight = document.documentElement.clientHeight;
};

function drawLeftEye(coord) {
	let {x, y} = coord;
	eyes[0].style.left = `${x}%`;
	eyes[0].style.top = `${y}%`;
}

function drawRightEye(coord) {
	let {x, y} = coord;
	eyes[1].style.left = `${x}%`;
	eyes[1].style.top = `${y}%`;
}

function calcCoord(cursor, eye) {
	function factorX() {
		if (cursor.x > eye.x + eye.width) {
			return (totalWidth - eye.x + eye.width) / 20
		} else {
			return eye.x / 20;
		}
	};

	function factorY() {
		if (cursor.y > eye.y + eye.height) {
			return (totalHeight - eye.y + eye.height) / 20
		} else {
			return eye.y / 20;
		}
	};

	let x = 25 + (cursor.x - eye.x) / factorX();
	let y = 25 + (cursor.y - eye.y) / factorY();

	return {x, y}
}

function drawEyes(event) {
	drawLeftEye(calcCoord(event, leftEyeCoord));
	drawRightEye(calcCoord(event, rightEyeCoord));
}


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

document.addEventListener('mousemove', 
	(event) => trottle(drawEyes(event), 1)
);
