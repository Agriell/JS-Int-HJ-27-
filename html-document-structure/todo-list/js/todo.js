const todo = document.getElementsByClassName('todo-list')[0],
	  done = todo.getElementsByClassName('done')[0],
	  undone = todo.getElementsByClassName('undone')[0],
	  checkbox = todo.getElementsByTagName('input');

function checking(event) {
			if (event.currentTarget.checked) {
				done.appendChild(event.currentTarget.parentElement)
			} else {
				undone.appendChild(event.currentTarget.parentElement)
			};
		}

Array.from(checkbox).forEach((item) => (item.addEventListener('change', checking)));
