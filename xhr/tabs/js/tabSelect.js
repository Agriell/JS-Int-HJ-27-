const tabs = document.getElementsByTagName('a'),
	  content = document.getElementById('content');

function tabSelect(event) {
	event.preventDefault();
	for (let tab of tabs) {
		tab.classList.remove('active');	
	};
	event.currentTarget.classList.add('active');

}

function fillTab(tab) {
	let xhr = new XMLHttpRequest();
	console.log(tab.href)
	xhr.open('GET', tab.href, true);
	xhr.send();
	console.log(xhr.responseText)
}


for (let tab of tabs) {
	tab.addEventListener('click', tabSelect);	
}

const activeTab = document.getElementsByClassName('active')[0];

fillTab(activeTab);
