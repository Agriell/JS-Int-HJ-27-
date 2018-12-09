'use strict'

const trash = document.getElementById('trash_bin');
let movedPiece = null;
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', event => {
  if (event.target.classList.contains('logo')) {
	movedPiece = event.target;
	const bounds = event.target.getBoundingClientRect();
	console.log(bounds)
	shiftX = bounds.width / 2;
	shiftY = bounds.height / 2;
  }
});

document.addEventListener('mousemove', event => {
  if (movedPiece) {
    event.preventDefault();
    movedPiece.classList.add('moving');
    movedPiece.style.left = `${event.pageX - shiftX}px`;
    movedPiece.style.top = `${event.pageY - shiftY}px`;
    
} });

document.addEventListener('mouseup', event => {
  if (movedPiece) {
    movedPiece.style.visibility = 'hidden';
    const check = document
      .elementFromPoint(event.clientX, event.clientY)
	movedPiece.style.visibility = 'visible';
	movedPiece.classList.remove('moving');
	if (check === trash) {movedPiece.style.display = 'none'};
	movedPiece = null;
	// console.log(check);
  } 
});


// Элементы для перетаскивания имеют класс logo.
// Корзина имеет id trash_bin
// При захвате элемента курсор должен быть в центре этого элемента.
// При захвате элемента необходимо присвоить этому элементу класс moving 
// и удалить этот класс после отпускания элемента.
// Удалить элемент(display: none;), если он был отпущен в области корзины.