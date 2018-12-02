const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  if (isFirst) {
    let res = JSON.parse(event.data);
    res.reverse().forEach(elem => {
      let [label, data] = [elem.time, elem.online];
      realtime.addData([Number(data)], label);
    })
    isFirst = false;
  } else {
  	let res = JSON.parse(event.data);
    const [label, data] = [res.time, res.online];
    realtime.removeData();
    realtime.addData([Number(data)], label);
  }
});
