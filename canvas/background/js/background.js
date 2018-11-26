const canvas = document.getElementById('wall');
const ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.strokeStyle = 'white';
const time = Date.now();

function randVal(from = 0, to = 1) {
	return Math.round(from + (to - from) * Math.random());
};

function nextPointOne(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
};

function nextPointAnother(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
};

function drawCross(item, time) {
	let {x, y} = item.nextPoint(item.baseX, item.baseY, time)
	ctx.save();
	ctx.translate(x, y)
	ctx.rotate(item.currRotatePos*Math.PI/180)
	ctx.beginPath();
	ctx.moveTo(x - item.dimension / 2, y);
	ctx.lineTo(x + item.dimension / 2, y);
	ctx.moveTo(x, y - item.dimension / 2);
	ctx.lineTo(x, y + item.dimension / 2);
	ctx.lineWidth = item.strokeStyle;
	ctx.stroke();
	ctx.restore();
	ctx.closePath();
};

function drawCircle(item, time) {
	let {x, y} = item.nextPoint(item.baseX, item.baseY, time)
	ctx.beginPath();
	ctx.arc(x, y, item.dimension / 2, 0, 2 * Math.PI);
	ctx.lineWidth = item.strokeStyle;
	ctx.stroke();
	ctx.closePath();
};

function createAsterisk(type) {
	const asterisk = {};
	asterisk.size = randVal(1, 6) / 10;
	asterisk.baseX = randVal (0, ctx.canvas.width);
	asterisk.baseY = randVal (0, ctx.canvas.height);
	randVal() ? asterisk.nextPoint = nextPointOne : asterisk.nextPoint = nextPointAnother;
	asterisk.strokeStyle = 5 * asterisk.size;
	if (type == 'cross') {
		asterisk.type = type;
		asterisk.dimension = 20 * asterisk.size
		asterisk.rotationRange = randVal(0, 360);
		randVal(0, 1) ? asterisk.rotationSpeed = randVal(0, 20) / 100 * -1 : asterisk.rotationSpeed = randVal(0, 20) / 100
		asterisk.currRotatePos = 0;
	};
	if (type == 'circle') {
		asterisk.type = type;
		asterisk.dimension = 12 * asterisk.size;
	}
	return asterisk;
};

// определяем количество звездочек

let asteriskQuantity = randVal(50, 200);
if (asteriskQuantity % 2 != 0 ) {asteriskQuantity--};

const sky = [];

// создаем небо

while (asteriskQuantity) {
	let item = createAsterisk('cross');
	sky.push(item);
	asteriskQuantity--;
	item = createAsterisk('circle');
	sky.push(item);
	asteriskQuantity--;
}

function drawSky(time) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let asterisk of sky) {
		if (asterisk.type == 'cross') {
			if (asterisk.rotationSpeed > 0) {
				asterisk.currRotatePos < asterisk.rotationRange ? asterisk.currRotatePos += asterisk.rotationSpeed :asterisk.rotationSpeed * -1
			};
			if (asterisk.rotationSpeed < 0) {
				asterisk.currRotatePos > asterisk.rotationRange ? asterisk.currRotatePos += asterisk.rotationSpeed :asterisk.rotationSpeed * -1
			};
			drawCross(asterisk, time);
		};
		if (asterisk.type == 'circle') {drawCircle(asterisk, time)}; 
	}
};


canvas.addEventListener('click', () => {clearInterval(timer)})

let timer = setInterval(() => {
	let time = Date.now();
	console.log(time);
	drawSky(time);
}, 50);
