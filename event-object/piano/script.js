const pianoKeys = document.getElementsByTagName('li'),
	  piano = document.getElementsByTagName('ul'),
  	  pianoPlayers = document.getElementsByTagName('audio');
var	soundNames = ["first", "second", "third", "fourth", "fifth"];

playSound = function(event) {
	if (!event.shiftKey & !event.altKey) {
		piano[0].classList.remove('higher', 'lower');
		piano[0].classList.add('middle');
	}
	if (event.shiftKey) {
		piano[0].classList.remove('higher', 'middle');
		piano[0].classList.add('lower');
	}
	if (event.altKey) {
		piano[0].classList.remove('lower', 'middle');
		piano[0].classList.add('higher');
	}
	event.currentTarget.getElementsByTagName('audio')[0].src = './sounds/' + piano[0].classList[1] + '/' + event.currentTarget.classList[1] + '.mp3';
	event.currentTarget.getElementsByTagName('audio')[0].play()
}

for (let i = 0; i <= soundNames.length - 1; i++) {
	pianoKeys[i].classList.add(soundNames[i]);
	pianoKeys[i].addEventListener('click', playSound)
}





