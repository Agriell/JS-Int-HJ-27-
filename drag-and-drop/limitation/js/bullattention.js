const bull = document.getElementsByClassName('block')[0];
const message = document.getElementsByClassName('message')[0];
const text = document.getElementsByClassName('textarea')[0];
let timerId;

text.addEventListener('input', (event) => {
	clearTimeout(timerId);
	message.classList.remove('view');
	bull.classList.add('active');
	
	let lastValue = text.value;

	timerId = setTimeout(function() {
	    if (text.value = lastValue) {
	        message.classList.add('view');
	        bull.classList.remove('active');
	      }
	    }, 2000);
});

text.addEventListener('blur', (event) => {
	console.log('фокус потерян')
	clearTimeout(timerId);
	message.classList.remove('view');
	bull.classList.remove('active');
});


