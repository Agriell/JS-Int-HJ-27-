'use strict';

const 	addTCart = document.getElementsByClassName('add-to-cart'),
		showMoreBtn = document.getElementsByClassName('show-more')[0];

document.querySelector('.items-list').addEventListener('click', addToCartCrutch)

function addToCartCrutch(event) {
	let {dataset: item} = event.target;
	addToCart(item);
};
