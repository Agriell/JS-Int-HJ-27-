const request = new XMLHttpRequest();
request.open('GET',
	'https://neto-api.herokuapp.com/weather',
	false
);

request.addEventListener('load', onLoad);
request.send();

function onLoad() {
	console.log(request)
  const response = JSON.parse(request.responseText);
  console.log(response);
  setData(response);
}
