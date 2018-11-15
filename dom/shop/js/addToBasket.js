const addButtons = document.getElementsByTagName('button'),
	  cartCount = document.getElementById('cart-count'),
	  cartPrice = document.getElementById('cart-total-price');
var cartCountVal = 0,
	cartPriceVal = 0; 

function addToBasket(event) {
	cartPriceVal += Number(event.currentTarget.dataset.price);
	cartCountVal += 1;
	cartCount.innerHTML = cartCountVal;
	cartPrice.innerHTML = getPriceFormatted(cartPriceVal);
}

for (let button of addButtons) {
	button.addEventListener('click', addToBasket);
}
