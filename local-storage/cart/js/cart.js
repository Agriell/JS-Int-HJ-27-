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
};

function responseHandler(response, marker) {
	if (marker == 'colors') {
		colorsData = response;
	} else if (marker == 'sizes') {
		sizeData = response;
	} else if (marker == 'cart') {
		// console.log(response);
		currentCart = response;
	}
};

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

// Заполняем корзину

const 	quickCart = document.getElementById('quick-cart');
let		emptyCart = 'open',
		summPrice = 0; // здесь надо поменять на запись в куки или локалсторэйдж

function addToCart(event = null) {
	if (event) {event.target.preventdefault()};

	if (currentCart.length) {
		emptyCart = null
	} else {
		emptyCart = 'open'
	};
	
	for (let item of currentCart) {
		quickCart.innerHTML += '<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-' + item.id + '" style="opacity: 1;">' +
	  		'<div class="quick-cart-product-wrap">' +
	    		'<img src="' + item.pic + '" title="' + item.title + '">' +
	    		'<span class="s1" style="background-color: #000; opacity: .5">$800.00</span>' +
	    		'<span class="s2"></span>' +
	  		'</div>' +
	  		'<span class="count hide fadeUp" id="quick-cart-product-count-' + item.id + '">' + item.quantity + '</span>' +
	  		'<span class="quick-cart-product-remove remove" data-id="' + item.id + '"></span>' +
		'</div>';
		summPrice += item.price;
	};

	quickCart.innerHTML += '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ' + emptyCart + '">'
		'<span>'
    		'<strong class="quick-cart-text">Оформить заказ<br></strong>'
    		'<span id="quick-cart-price">$' + summPrice + '.00</span>'
		'</span>'
	'</a>'

}

addToCart();

document.getElementById('AddToCart').addEventListener('click', addToCart);







// Object
// id: "2721888517"
// pic: "https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png"
// price: 800
// productId: "2721888517"
// quantity: 5
// title: "Tony Hunfinger T-Shirt New York"























