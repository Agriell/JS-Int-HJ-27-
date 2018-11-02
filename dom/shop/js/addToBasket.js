const addButtons = document.getElementsByTagName('button'),
	  cartCount = document.getElementById('cart-count'),
	  cartPrice = document.getElementById('cart-total-price');
var cartCountVal = 0,
	cartPriceVal = 0,
	k; 

addToBasket = function(event) {
	if (event.shiftKey) {k = -1}
	else {k = 1};
	cartPriceVal += Number(event.currentTarget.dataset.price) * k;
	cartCountVal += 1 * k;
	cartCount.innerHTML = cartCountVal;
	cartPrice.innerHTML = getPriceFormatted(cartPriceVal);
}

for (let button of addButtons) {
	button.addEventListener('click', addToBasket);
}
