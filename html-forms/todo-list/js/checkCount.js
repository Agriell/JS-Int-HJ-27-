const 	listBlock = document.getElementsByClassName('list-block')[0],
		points = listBlock.getElementsByTagName('input'),
		output = document.getElementsByTagName('output')[0];

function activePointsCount() {
	let count = 0;
	for (let i = 0; i < points.length; i++) {
		if (points[i].checked) {
			count++;
		}
	}
	return count;
}

function doChange(event) {
	var ready = activePointsCount(),
		all = points.length;

	output.value = ready + " из " + all;

	if (ready == all) {listBlock.classList.add('complete')}
	else {listBlock.classList.remove('complete')};
};

doChange();

for (let point of points) {
	point.addEventListener('change', doChange);
}
