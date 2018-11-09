const 	content = document.getElementById('content'),
		quantity = document.getElementById('source'),
		from = document.getElementById('from'),
		to = document.getElementById('to'),
		loader =  document.getElementById('loader'),
		result = document.getElementById('result');
var currData;


function fillSelect(event) {
	for (elem of currData) {
		let newpoint = new Option (elem.code, elem.value);
		event.appendChild(newpoint);
	}
}

function calculation() {
	function searchSelect(arr) {
		for (el of arr) {
			if (el.selected) return el.value;
		}
	}
	let actFrom = searchSelect(from),
		actTo = searchSelect(to),
		whatQnty = quantity.value;
	result.value = Math.round((actFrom / actTo * whatQnty) * 100) / 100;
}

function loadCurrencyData() {
	var xhrCurrency = new XMLHttpRequest();
	xhrCurrency.open('GET', 'https://neto-api.herokuapp.com/currency', true);
	loader.classList.toggle('hidden');
	xhrCurrency.send();
	// console.log('запрос ушел')
	xhrCurrency.addEventListener('load', function() {
		// console.log('запрос пришел')
		currData = JSON.parse(xhrCurrency.responseText);
		fillSelect(from);
		fillSelect(to);
		calculation();
		loader.classList.toggle('hidden');
		content.classList.toggle('hidden');
	});
}

loadCurrencyData();

quantity.addEventListener('change', calculation);
from.addEventListener('change', calculation);
to.addEventListener('change', calculation);
