'use strict';

const	propNames = document.getElementsByTagName('th'),
		tab = document.getElementsByTagName('table')[0];

function handleTableClick(event) {
	event.stopPropagation();
	let { target: item } = event;

	item.dataset.dir ? item.dataset.dir *= -1 : item.setAttribute('data-dir', 1);
	tab.setAttribute('data-sort-by', item.dataset.propName);
	sortTable(tab.dataset.sortBy, item.dataset.dir);
}

Array.from(propNames).forEach((item) => {
	item.addEventListener('click', handleTableClick)
})
