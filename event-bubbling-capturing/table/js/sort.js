'use strict';

const propNames = document.getElementsByTagName('th')
const tab = document.querySelector('table');

tab.addEventListener('click', handleTableClick);

function handleTableClick(event) {
	event.stopPropagation();
	let { target: item } = event;
	item.dataset.dir ? item.dataset.dir *= -1 : item.dataset.dir= 1;
	tab.dataset.sortBy = item.dataset.propName;
	sortTable(tab.dataset.sortBy, item.dataset.dir);
};
