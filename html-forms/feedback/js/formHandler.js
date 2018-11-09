const contentform = document.getElementsByClassName('contentform')[0],
	  inputFields = document.getElementsByTagName('input'),
	  outputFields = document.getElementsByTagName('output');


function sendMessage() {
	for (let field of inputFields) {
		if (document.getElementById(field.name) != null) {
			document.getElementById(field.name).value = field.value
		};
	}
	contentform.classList.toggle('hidden');
	document.getElementsByTagName('main')[0].classList.toggle('hidden');
}

// function sendMessage() {
// 	let testSumm = 0;
// 	for (field of inputFields) {
// 		if (field.value) {testSumm++}
// 	}
// 	if (testSumm == 11) {

// 	}
// }