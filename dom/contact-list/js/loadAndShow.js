var contacts = JSON.parse(loadContacts()),
	contactList = document.getElementsByClassName('contacts-list')[0];

createContactForm = function (card) {
	let newLi = document.createElement('li'),
		name =  document.createElement('strong');

	name.innerHTML = card.name;
	newLi.dataset.email = card.email;
	newLi.dataset.phone = card.phone;
	newLi.appendChild(name);
	contactList.appendChild(newLi);
}

contactList.getElementsByTagName('li')[0].remove();

for (let contact of contacts) {
	createContactForm(contact)
}