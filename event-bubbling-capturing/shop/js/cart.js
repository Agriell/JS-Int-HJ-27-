'use strict';

const 	addTCart = document.getElementsByClassName('add-to-cart'),
		showMoreBtn = document.getElementsByClassName('show-more')[0];

function toAddCartAssign() {
	Array.from(addTCart)
		.forEach((item) => {
			item.addEventListener('click', addToCartCrutch);
		});
};

function addToCartCrutch(event) {
	let {dataset: item} = event.target;
	addToCart(item);
};

showMoreBtn.addEventListener('click', toAddCartAssign);
toAddCartAssign();
