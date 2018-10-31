const thumbGall = document.getElementsByTagName('a'),
	  fullThumbPic = document.getElementById('view');

setCurrGallery = function(event) {
	for (let thumb of thumbGall) {
		thumb.classList.remove('gallery-current');
	}
	event.currentTarget.classList.add('gallery-current');
}

showFullPic = function(event) {
	event.preventDefault();
	fullThumbPic.src = event.currentTarget.href;
}

isChoose = function(event) {
	setCurrGallery(event);
	showFullPic(event);
}

for (let thumb of thumbGall) {
	thumb.addEventListener('click', isChoose);
}