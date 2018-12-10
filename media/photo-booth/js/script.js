'use strict';

const app = document.querySelector('.app');
const photoList = document.querySelector('.list'); 
let video = document.createElement('video');
video.autoplay = true;
app.appendChild(video);

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(stream => {
  	console.log(window.URL.createObjectURL(stream))
  	video.src = window.URL.createObjectURL(stream);
  })
  .catch(err => console.warn('Какие-то проблемы с доступом к камере.. (('));

