var	 todo = document.getElementsByClassName('todo-list')[0],
	  done = todo.getElementsByClassName('done')[0],
	  undone = todo.getElementsByClassName('undone')[0],
	  checkbox = todo.getElementsByTagName('input');

function transferElem(elem, isDoneFor) {
	if (isDoneFor) {
		if (elem.parentElement != done) {
			done.appendChild(elem)
		};
	} else {
		if (elem.parentElement != undone) {
			undone.appendChild(elem)
		};
	}
}

function treeBilder(event) {
	for (box of checkbox) {
		box.cheked ? transferElem(box, true) : transferElem(box);
	}
};

function checking(event) {
	console.log(event.currentTarget);
	event.currentTarget.checked ? event.currentTarget.removeAttribute('checked') : event.currentTarget.setAttribute('unchecked', true);
	treeBilder();
}

for (let box of checkbox) {
	box.addEventListener('change', treeBilder);
}