'use strict';

const canvas = document.getElementById('draw');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function clearCanvas() {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.rect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = 'white';
	ctx.fill();
};

function setCanvasSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

function doNewCanvas() {
	clearCanvas();
	setCanvasSize();

};

window.onresize = doNewCanvas;

let brushRad = 5;
let tone = 0;
let brushMark = true;
let change = false;
let drawing = false;
let toneDir = false;


function draw(point) {
	ctx.beginPath();
	ctx.arc(point.x, point.y, brushRad, 0, 2 * Math.PI);
	ctx.fillStyle = 'HSL(' + tone +', 100%, 50%)';
	ctx.fill();
};

canvas.addEventListener("dblclick", doNewCanvas);

canvas.addEventListener("mousedown", (event) => {
  toneDir = event.shiftKey;	
  drawing = true;
  draw(event.offsetX, event.offsetY);
  change = true;
});

canvas.addEventListener("mouseup", (event) => {
  drawing = false;
});

canvas.addEventListener("mouseout", (event) => {
  drawing = false;
});

canvas.addEventListener("mousemove", (event) => {
  if (drawing) {
  	toneDir = event.shiftKey;	
    const nextPoint = {'x':event.offsetX, 'y': event.offsetY};
    draw(nextPoint);
    change = true;
    tick();
  }
});

function tick () {
  if(change) {
  	
  	if (toneDir) {
  		tone += 1
  	} else {tone -= 1};
  	if (tone == 360 || tone == -360) {tone = 0};

  	if (brushMark) {
  		brushRad += 1
  	} else {brushRad -= 1}
  	if (brushRad == 100) {brushMark = false};
  	if (brushRad == 5) {brushMark = true};

    change = false;
  }
}
// Функционал

// +При открытии страницы необходимо установить размер холста равным размеру окна браузера. 
// +При изменении размеров окна бразуера необходимо обновить размер холста и очистить его.
// При движении по холсту мыши с нажатой левой кнопкой необходимо рисовать на холсте линию. 
// +Если кнопка мыши отпущена, то линия не рисуется. Если мышь вышла за пределы холста и потом 
// +вернулась, линия не рисуется. Для рисования используются координаты положения мыши.
// +При двойном клике холст необходимо очищать.

// Характеристики линии

// +Цвет линии задается с помощью цветовой модели HSL. Насыщенность 100%, светлота 50%.
// +Оттенок меняется при каждом тике на единицу в диапазоне от 0 до 359 включительно. 
// +При этом, если нажата клавиша Shift, то он уменьшается, иначе увеличивается. Если 
// +оттенок достиг максимума или минимума, то значение устанавливается в минимум или максимум 
// +соответственно.
// +Толщина линии меняется при каждом тике на единицу в диапазоне от 5 до 100 включительно. 
// +Начинать нужно со 100. При достижении максимума толщина должна уменьшаться. При достижении 
// +минимума — увеличиваться.
// +Необходимо скруглить края линии, задав свойствам контекста lineJoin и lineCap значение round.

