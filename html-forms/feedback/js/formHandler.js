const contentform = document.getElementsByClassName('contentform')[0],
	  inputFields = document.getElementsByTagName('input'),
	  outputFields = document.getElementsByTagName('output'),
	  buttons = document.getElementsByClassName('button-contact');


function sendMessage(ev) {
	if (buttons[0].disabled) return;
	ev.preventDefault()
	for (let field of inputFields) {
		if (field.name == 'message') {
			document.getElementById('message').value = field.innerText;
		};
		if (document.getElementById(field.name) != null) {
			document.getElementById(field.name).value = field.value
		};
	}
	contentform.classList.toggle('hidden');
	document.getElementsByTagName('main')[0].classList.toggle('hidden');
}

function fillFormTest() {
	for (let field of inputFields) {
		if (!field.value) return false;
	}
	if (document.getElementsByTagName('textarea')[0].value) {return true}
	else return false
}

function testState() {
	if (fillFormTest()) {
		buttons[0].disabled = false
	} else {buttons[0].disabled = true}
}

inputFields[5].onkeypress = function(event) {
	// console.log(event)
	if (event.key >= 0 & event.key <= 9) {return event}
		else return false;
}


for (field of inputFields) {
	field.addEventListener('input', testState)	
}
document.getElementsByTagName('textarea')[0].addEventListener('input', testState);

for (button of buttons) {
	button.addEventListener('click', sendMessage)
}
