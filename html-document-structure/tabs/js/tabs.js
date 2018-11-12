const 	articles = document.getElementsByClassName('tabs-content')[0],
		tabsNav = document.getElementsByClassName('tabs-nav')[0];
		
function firstBuild() {
	let sampleNode = tabsNav.removeChild(tabsNav.children[0]);

	for (let article of articles.children) {
		let newNode = sampleNode.cloneNode(true);
		newNode.children[0].innerHTML = article.dataset.tabTitle;
		newNode.children[0].classList.add(article.dataset.tabIcon);
		newNode.addEventListener('click', clickHandler)
		tabsNav.appendChild(newNode);
	}
	tabsNav.children[0].classList.add('ui-tabs-active');

	sampleNode = null;
}

function clickHandler(event) {
	Array.from(tabsNav.children).forEach((elem) => (elem.classList.remove('ui-tabs-active')));
	event.currentTarget.classList.add('ui-tabs-active');

	let marker = event.currentTarget.children[0].innerHTML,
		activeArticle = Array.from(articles.children).find((elem) =>(elem.dataset.tabTitle == marker));
	Array.from(articles.children).forEach((item) => (item.classList.add('hidden')));
	activeArticle.classList.remove('hidden');
}

firstBuild();
