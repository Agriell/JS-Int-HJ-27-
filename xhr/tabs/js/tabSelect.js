const tabs = document.getElementsByTagName('a'),
	  content = document.getElementById('content'),
	  preloader = document.getElementById('preloader');
let activeTab = document.getElementsByClassName('active')[0];

function tabSelect(event) {
	event.preventDefault();
	for (let tab of tabs) {
		tab.classList.remove('active');	
	};
	event.currentTarget.classList.add('active');
	fillTab(event.currentTarget)

}

function fillTab(tab) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', tab.href, true);
	xhr.addEventListener('loadstart', () => {
		preloader.classList.remove('hidden')
	});
	xhr.addEventListener('loadend', () => {
		preloader.classList.add('hidden')
	});
	xhr.addEventListener('load', (resp) => {
		content.innerHTML = resp.srcElement.responseText
	})
	xhr.send();
}

for (let tab of tabs) {
	tab.addEventListener('click', tabSelect);	
}

fillTab(activeTab);
