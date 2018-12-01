'use strict';

function createElement(content) {
	
	if (typeof content[0] == 'string' || typeof content[0] == 'number') {
		return document.createTextNode(content);
	};

	if (Array.isArray(content)) {
		return content.reduce((f, elem) => {
			f.appendChild(createElement(elem));
			return f;
		}, document.createDocumentFragment());
	};

	if (content.name) {
		const element = document.createElement(content.name);
		if (content.props) {
			element.classList.add(
				...[].concat(content.props.class.split(' ')).filter(Boolean)
			);
		};
				
		if (content.childs) {
			for (let child of content.childs) {
				element.appendChild(createElement(child))
			}
		};
		return element;
	};
};