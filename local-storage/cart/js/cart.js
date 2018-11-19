'use strict';

// Запрашиваем варианты доступных цветов и размеров товара и состояние корзины
function doRequest(htmlAdrr) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', htmlAdrr, false);
	xhr.addEventListener('load', (res) => {
		let marker = htmlAdrr.split('/')[htmlAdrr.split('/').length - 1]
		responseHandler(JSON.parse(res.target.response), marker);
	});
	xhr.addEventListener('error', (err) => {console.log(err)});
	xhr.send();
}

function responseHandler(response, marker) {
	if (marker == 'colors') {
		colorsData = response;
	} else if (marker == 'sizes') {
		sizeData = response;
	} else if (marker == 'cart') {
		currentCart = response;
	}
}

let 	colorsData = {},
		sizeData = {},
		currentCart = {};

doRequest('https://neto-api.herokuapp.com/cart/colors');
doRequest('https://neto-api.herokuapp.com/cart/sizes');
doRequest('https://neto-api.herokuapp.com/cart');

// Заполняем варианты цветов

const colorSwatch = document.getElementById('colorSwatch');
let checkedColor = true;

for (let color of colorsData) {

	let contain, available, disable, check;
	if (color.isAvailable) {
		available = 'available';
		disable = null;
	} else {
		available = 'soldout';
		disable = ' disable';
	};
	if (checkedColor) {
		check = 'checked'
		checkedColor = false;
	} else {
		check = null;
	};

	colorSwatch.innerHTML += '<div data-value="' + color.type + '" class="swatch-element color ' + color.type + ' ' + available +'">' +
  		'<div class="tooltip">' + color.type + '</div>' +
  		'<input quickbeam="color" id="swatch-1-' + color.type + '" type="radio" name="color" value=' + color.type + '" ' + check + ' ' + disable + '>' +
   		'<label for="swatch-1-' + color.type + '" style="border-color: ' + color.code + ';">' +
    		'<span style="background-color: ' + color.code + ';"></span>' +
    		'<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">' +
  		'</label>' +
	'</div>';
}

// Заполняем варианты размеров

const sizeSwatch = document.getElementById('sizeSwatch');
let checkedSize = true;

for (let size of sizeData) {

	let contain, available, disable, check;
	if (size.isAvailable) {
		available = 'available';
		disable = null;
	} else {
		available = 'soldout';
		disable = ' disable';
	};
	if (checkedSize) {
		check = 'checked'
		checkedSize = false;
	} else {
		check = null;
	};

	sizeSwatch.innerHTML += '<div data-value="' + size.type + '" class="swatch-element plain ' + size.type + '' + available + '">' +
	  							'<input id="swatch-0-' + size.type + '" type="radio" name="size" value="' + size.type + '" ' + disable + ' ' + check + '>' +
	  							'<label for="swatch-0-' + size.type + '">' +
	    						size.title +
	    						'<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">' +
	  							'</label>' +
							'</div>';
}

const si = [
	{title: "S", type: "s", isAvailable: false},
	{title: "M", type: "m", isAvailable: true},
	{title: "L", type: "l", isAvailable: true},
	{title: "XL", type: "xl", isAvailable: true},
	{title: "XXL", type: "xxl", isAvailable: false}
 ];

// Для получения списка доступных цветов запросите JSON по адресу https://neto-api.herokuapp.com/cart/colors. Вам будут доступны следующие данные по каждому цвету:

// title — описание цвета;
// type — значение цвета, для сохранения в корзине;
// code — код цвета, для отображения фона;
// isAvailable — доступность товара в данном цвете.