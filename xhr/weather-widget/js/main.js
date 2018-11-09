const request = new XMLHttpRequest();
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();
const ready = request.addEventListener('load', onLoad);

function onLoad() {
  const response = JSON.parse(request.responseText);
  console.log(response);
  setData(response);
}
