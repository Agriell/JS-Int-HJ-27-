'use strict';

let nextBtn = document.getElementById('nextPhoto'),
	prevBtn = document.getElementById('prevPhoto'),
	currPhoto = document.getElementById('currentPhoto'),
	photoList = ['breuer-building.jpg', 'guggenheim-museum.jpg', 'headquarters.jpg', 'IAC.jpg', 'new-museum.jpg'],
	index = 0;

currPhoto.src = 'i/' + photoList[index];

nextBtn.onclick = function() {
		index++;
		indexTest();
		currPhoto.src = 'i/' + photoList[index];
	};
prevBtn.onclick = function() {
		index--;
		indexTest();
		currPhoto.src = 'i/' + photoList[index--];
	};

function indexTest() {
	if (index < 0) {index = photoList.length-1};
	if (index > photoList.length-1) {index = 0};
	return
}