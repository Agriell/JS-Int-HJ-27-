'use strict';

const containerLongPool = document.getElementsByClassName('long-pooling')[0].getElementsByTagName('div');

function subscribe() {
  	let xhrLong = new XMLHttpRequest();
  	
  	xhrLong.open("GET", 'https://neto-api.herokuapp.com/comet/long-pooling', true);

  	xhrLong.addEventListener('readystatechange', (event) => {
  		if (event.target.readyState != 4) return;
  		
  		let value = Number(event.target.response.split(' ').join(''));
	  	
	    if (value >= 1 & value <= 10 ) {
			Array.from(containerLongPool).forEach(elem => elem.classList.remove('flip-it'));
			containerLongPool[value - 1].classList.add('flip-it');
		} else throw new Error('Wrong data!');
		
		subscribe();
	});
  	
  	xhrLong.send();
};


subscribe();
