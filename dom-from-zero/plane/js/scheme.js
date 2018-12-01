'use strict'

const acSelect = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv'); 
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty =  document.getElementById('btnSetEmpty');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');

function loadScheme(id) {
	return fetch(`https://neto-api.herokuapp.com/plane/${id}`)
		.then(res => res.json())
};

function toCount() {
	totalPax.textContent = document.getElementsByClassName('seat').length;
	totalAdult.textContent = document.getElementsByClassName('adult').length;
	totalHalf.textContent = document.getElementsByClassName('half').length;
};

function seatingRowGenerate(airbus) {

	function createSit(label) {
		const sit = document.createElement('div');
		const sitLabel = document.createElement('span');
		sitLabel.className = 'seat-label';
		sitLabel.textContent = label;
		sit.classList.add('col-xs-4', 'seat');
		sit.appendChild(sitLabel);

		sit.onclick = (event) => {
			// console.log(event)
			if (event.altKey) {
				event.currentTarget.classList.remove('adult');
				event.currentTarget.classList.toggle('half');
			} else {
				event.currentTarget.classList.remove('half');
				event.currentTarget.classList.toggle('adult');
			}
			toCount();
		};

		return sit;
	}

	function createEmptySit() {
		const sit = document.createElement('div');
		sit.classList.add('col-xs-4', 'no-seat');
		return sit;
	}

	function createHalfRow() {
		const halfRow = document.createElement('div');
		halfRow.className = 'col-xs-5';
		return halfRow;
	}

	function createRow(rowLetters, rowNumber) {
		let scheme = {};

		const row =  document.createElement('div');
		row.classList.add('row', 'seating-row', 'text-center');

		const rowNum =  document.createElement('div');
		const nameRow = document.createElement('h2');
		rowNum.classList.add('col-xs-1', 'row-number');
		nameRow.className = '';
		nameRow.textContent = rowNumber;
		rowNum.appendChild(nameRow);
		
		row.appendChild(rowNum);

		if (rowLetters.length == 0) {
			for (let i = 0; i < 6; i++) {
				rowLetters.push('');
			}
		};

		if (rowLetters.length == 4) {
			rowLetters.unshift('');
			rowLetters.push('');
		};

		const firstHalfRow = createHalfRow();
		for (let i = 0; i < rowLetters.length / 2; i++) {
			if (rowLetters[i] == '') {
				firstHalfRow.appendChild(createEmptySit());
			} else {
				firstHalfRow.appendChild(createSit(rowLetters[i]));
			}	
		};
		row.appendChild(firstHalfRow);

		const secondHalfRow = createHalfRow();
		for (let i = rowLetters.length / 2; i < rowLetters.length; i++) {
			if (rowLetters[i] == '') {
				secondHalfRow.appendChild(createEmptySit());
			} else {
				secondHalfRow.appendChild(createSit(rowLetters[i]));
			}	
		};
		row.appendChild(secondHalfRow);

		return row;
	};

	for (let j = 0; j < airbus.scheme.length; j++) {
		let rowLetters = [];
		if (airbus.scheme[j] == 4) rowLetters = airbus.letters4;
		if (airbus.scheme[j] == 6) rowLetters = airbus.letters6;
		seatMapDiv.appendChild(createRow(rowLetters, j + 1));
	}
};

function clearAirbus() {
	while (seatMapDiv.childNodes[0]) {
		seatMapDiv.removeChild(seatMapDiv.childNodes[0]);
	};
};

function airHandler(airbus) {
	seatMapTitle.textContent = airbus.title + ' ( ' + airbus.passengers + ' пассажиров )';
	clearAirbus();
	seatingRowGenerate(airbus);
	toCount();
};

btnSeatMap.addEventListener('click', (event) => {
	event.preventDefault();
	new Promise (function(done) {
		done(loadScheme(acSelect.value))
	}).then(airHandler);
});

btnSetFull.addEventListener('click', (event) => {
	event.preventDefault();
	if (seatMapDiv.children.length <= 1) return
	const places = document.getElementsByClassName('seat');
	for (let place of places) {
		place.classList.remove('half');
		place.classList.add('adult');
	};
	toCount();
});

btnSetEmpty.addEventListener('click', (event) => {
	event.preventDefault();
	if (seatMapDiv.children.length <= 1) return
	const places = document.getElementsByClassName('seat');
	for (let place of places) {
		place.classList.remove('half');
		place.classList.remove('adult');
	};
	toCount();
});
