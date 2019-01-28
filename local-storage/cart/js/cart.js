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
		currentCart = response;
	}
};

let 	colorsData = {},
		sizeData = {},
		currentCart = {};

doRequest('https://neto-api.herokuapp.com/cart/colors');
doRequest('https://neto-api.herokuapp.com/cart/sizes');
doRequest('https://neto-api.herokuapp.com/cart');


function cookieParse(variable) {
	let list = Array.from(document.cookie.split(';'));
	for (let el of list) {
		if (String(el.split('=')[0]) == variable) {
			let val = el.split('=')[1];
			return val;
		};
	};
	return null;
};


// Заполняем варианты цветов

const colorSwatch = document.getElementById('colorSwatch');
let color = true;

if (cookieParse('color')) {color = cookieParse('color')};

for (let colorItem of colorsData) {

	let contain, available, disable, check;
	if (colorItem.isAvailable) {
		available = 'available';
		disable = '';
	} else {
		available = 'soldout';
		disable = ' disable';
	};
	if (color == colorItem.code & colorItem.isAvailable) {
		check = 'checked'
		color = false;
	} else {
		check = '';
	};

	colorSwatch.innerHTML += '<div data-value="' + colorItem.type + 
		'" class="swatch-element color ' + colorItem.type + ' ' + available +'">' +
  		'<div class="tooltip">' + colorItem.type + '</div>' +
  		'<input quickbeam="color" id="swatch-1-' + colorItem.type + 
  		'" type="radio" name="color" value=' + colorItem.type + ' ' + check + ' ' + 
  		disable + '>' + '<label for="swatch-1-' + colorItem.type + '" style="border-color: ' + 
  		colorItem.code + ';">' + '<span style="background-color: ' + colorItem.code + ';"></span>' +
    	'<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">' +
  		'</label>' + '</div>';
}

 // {title: "Голубой", type: "blue", code: "blue", isAvailable: true}
 // {title: "Красный", type: "red", code: "red", isAvailable: true}
 // {title: "Желтый", type: "yellow", code: "yellow", isAvailable: true}
 // {title: "Белый", type: "white", code: "white", isAvailable: false}


// Заполняем варианты размеров

const sizeSwatch = document.getElementById('sizeSwatch');
let size = true;

if (cookieParse(' size')) {size = cookieParse(' size')};


for (let sizeItem of sizeData) {

	let contain, available, disable, check;
	if (sizeItem.isAvailable) {
		available = ' available';
		disable = '';
	} else {
		available = ' soldout';
		disable = ' disable';
	};
	if (size == sizeItem.type & sizeItem.isAvailable) {
		check = ' checked'
		size = false;
	} else {
		check = '';
	};

	sizeSwatch.innerHTML += '<div data-value="' + sizeItem.type + '" class="swatch-element plain ' + 
		sizeItem.type + '' + available + '">' +	'<input id="swatch-0-' + sizeItem.type + 
		'" type="radio" name="size" value="' + sizeItem.type + '" ' + disable + ' ' + check + '>' +
	  	'<label for="swatch-0-' + sizeItem.type + '">' + sizeItem.title +
	    '<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">' +
	  	'</label>' + '</div>';
}

// [
//  {title: "S", type: "s", isAvailable: false},
//  {title: "M", type: "m", isAvailable: true},
//  {title: "L", type: "l", isAvailable: true},
//  {title: "XL", type: "xl", isAvailable: true},
//  {title: "XXL", type: "xxl", isAvailable: false}
// ]


// Заполняем корзину

const 	quickCart = document.getElementById('quick-cart');
let		emptyCart = 'open',
		summPrice = 0;

function createCart(event = null) {
	if (event) {event.target.preventdefault()};

	if (currentCart.length) {
		emptyCart = ''
	} else {
		emptyCart = 'open'
	};
		
	if (quickCart.children.length > 0) {
		while (quickCart.children.length > 0) {
			quickCart.lastElementChild.remove();
		}
	};

	for (let item of currentCart) {
		summPrice = item.price * item.quantity;

		quickCart.innerHTML += 
		`<div class="quick-cart-product quick-cart-product-static" 
			id="quick-cart-product-${item.id}" style="opacity: 1;">
			<div class="quick-cart-product-wrap">
				<img src="${item.pic}" title="${item.title}">
				<span class="s1" style="background-color: #000; opacity: .5">
					$${summPrice}
				</span>
				<span class="s2"></span>
			</div>
			<span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">
				${item.quantity}
			</span>
			<span class="quick-cart-product-remove remove" data-id="${item.id}">
			</span>
		</div>`;
		
		document.getElementsByClassName('remove')[0].addEventListener('click', removeCurrentItem);

	};

	quickCart.innerHTML += '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ' + emptyCart + '">' +
		'<span>' + '<strong class="quick-cart-text">Оформить заказ<br></strong>' +
    		'<span id="quick-cart-price">$' + summPrice + '</span>' + '</span>' + '</a>';
};

// Object
// id: "2721888517"
// pic: "https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png"
// price: 800
// productId: "2721888517"
// quantity: 5
// title: "Tony Hunfinger T-Shirt New York"

createCart();

const addToCartForm = document.getElementById('AddToCartForm');
const checkedItems = document.getElementsByClassName('swatch-element');
let removeProduct = document.getElementsByClassName('quick-cart-product-remove')[0];

function saveCurrentItem(event) {
	event.preventDefault()

	let currentState = new FormData(addToCartForm);
	for (let item of checkedItems) {
		let check = item.getElementsByTagName('input');
		if (check[0].checked) {
			currentState[check[0].name] = check[0].value
			document.cookie = encodeURIComponent(check[0].name) + '=' + encodeURIComponent(check[0].value);
		};
	}
	currentState.append('productId', event.target.getAttribute('data-product-id'));

	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', onLoad)
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
    xhr.send(currentState);
    
    function onLoad() {
        const serverRequest = JSON.parse(xhr.responseText);
        currentCart = serverRequest;
        createCart();
    }
}

function removeCurrentItem(event) {
	// console.log(event.target)
	
	let currentState = new FormData(addToCartForm);
	for (let item of checkedItems) {
		let check = item.getElementsByTagName('input');
		if (check[0].checked) {
			currentState[check[0].name] = check[0].value
		};
	}
	currentState.append('productId', event.currentTarget.getAttribute('data-id'));

	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', onLoad)
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    xhr.send(currentState);
    
    function onLoad() {
        const serverRequest = JSON.parse(xhr.responseText);
        currentCart = serverRequest;
        createCart();
	}
	document.getElementsByClassName('remove')[0].addEventListener('click', removeCurrentItem);    
}

addToCartForm.addEventListener('submit', saveCurrentItem);
document.getElementsByClassName('remove')[0].addEventListener('click', removeCurrentItem);

