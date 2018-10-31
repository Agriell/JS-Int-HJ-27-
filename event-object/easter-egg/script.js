const navPanel = document.getElementsByTagName('nav')[0],
	  secret = document.getElementsByClassName('secret')[0],
	  secretCode = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
var	secretTemp = Array.from(secretCode);

wiseGhost = function(event) {
	if (event.ctrlKey & event.altKey & event.code == 'KeyT') {
		navPanel.classList.toggle('visible');
	}

	if (event.code === secretTemp[0]) {
		secretTemp.shift();
		if (secretTemp.length == 0) {
			secret.classList.toggle('visible');
			secretTemp = Array.from(secretCode);
		}
	} else {
		secretTemp = Array.from(secretCode);
	}
}

window.addEventListener('keydown', wiseGhost)
