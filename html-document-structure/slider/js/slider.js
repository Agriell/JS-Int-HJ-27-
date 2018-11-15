const slider = document.getElementsByClassName('slider')[0],
	  sliderNav = document.getElementsByClassName('slider-nav')[0],
	  slides = document.getElementsByClassName('slides')[0];
	  
for (nav of Array.from(sliderNav.children)) {
	if (nav.dataset.action == 'prev') {var prev = nav}
	if (nav.dataset.action == 'next') {var next = nav}
	if (nav.dataset.action == 'last') {var last = nav}
	if (nav.dataset.action == 'first') {var first = nav}
};

function handlerStates(currentSlide, activeSlide) {
	if (activeSlide) {
		currentSlide.classList.remove('slide-current');
		activeSlide.classList.add('slide-current');
	} else (activeSlide = currentSlide);

	if (!activeSlide.nextElementSibling) {next.classList.add('disabled')}
		else {next.classList.remove('disabled')};
	if (!activeSlide.nextElementSibling) {last.classList.add('disabled')}
		else {last.classList.remove('disabled')};
	if (!activeSlide.previousElementSibling) {prev.classList.add('disabled')}
		else {prev.classList.remove('disabled')};
	if (!activeSlide.previousElementSibling) {first.classList.add('disabled')}
		else {first.classList.remove('disabled')};
}

function slidesMover(direct) {
	let currentSlide = Array.from(slides.children).find((el) => (el.classList.contains('slide-current'))),
		activeSlides;

	switch(direct) {
		case 'next':
		activeSlide = currentSlide.nextElementSibling;
		break;
		case 'prev':
		activeSlide = currentSlide.previousElementSibling;
		break;
		case 'last':
		activeSlide = slides.lastElementChild;
		break;
		case 'first':
		activeSlide = slides.firstElementChild;
		break;
	};
	handlerStates(currentSlide, activeSlide);
}

function start() {
	slides.children[0].classList.add('slide-current');
	handlerStates(slides.children[0]);

	next.addEventListener('click', event => slidesMover('next'));
	prev.addEventListener('click', event => slidesMover('prev'));
	last.addEventListener('click', event => slidesMover('last'));
	first.addEventListener('click', event => slidesMover('first'));
}

start();