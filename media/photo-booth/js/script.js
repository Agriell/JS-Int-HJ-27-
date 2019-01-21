'use strict';

const 	app = document.querySelector('.app'),
		photoList = document.querySelector('.list'),
		takePhotoButton = document.getElementById('take-photo'),
		controls = document.getElementsByClassName('controls')[0],
		errorMessage = document.getElementById('error-message');

let video = document.createElement('video');
video.autoplay = true;
let canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d'),
	image = document.createElement('image'),
	klatz = document.createElement('audio');	
klatz.src = 'https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3';

app.appendChild(video);
app.appendChild(canvas);


function createPhotoCard(path) {
	let figure = document.createElement('figure');

	let img = document.createElement('img');
	img.setAttribute('src', path);
	
	let	file_download = document.createElement('i');
	file_download.classList.add('material-icons');
	file_download.innerText = 'file_download';
	let a_file_download = document.createElement('a');
	a_file_download.href = path;
	a_file_download.download = 'snapshot.png';
	a_file_download.appendChild(file_download);

	let	file_upload = document.createElement('i');
	file_upload.classList.add('material-icons');
	file_upload.innerText = 'file_upload';
	let a_file_upload = document.createElement('a');
	a_file_upload.appendChild(file_upload);
	
	let	deleteBtn = document.createElement('i');
	deleteBtn.classList.add('material-icons');
	deleteBtn.innerText = 'delete';
	let a_deleteBtn = document.createElement('a');
	a_deleteBtn.appendChild(deleteBtn);

	let figcaption = document.createElement('figcaption');
	figure.appendChild(img);
	figcaption.appendChild(a_file_download);
	figcaption.appendChild(a_file_upload);
	figcaption.appendChild(a_deleteBtn);
	figure.appendChild(figcaption);

	return figure;
}

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(stream => {
	
	takePhotoButton.addEventListener('click', takePhoto)
	
	function takePhoto() {
		klatz.play();
		setTimeout(() => {
		   canvas.width = video.videoWidth;
		   canvas.height = video.videoHeight;
		   ctx.drawImage(video, 0, 0);
		   image.src = canvas.toDataURL();
		   if (photoList.children) {
		   	let firstPhoto = photoList.firstChild
		   	photoList.insertBefore(createPhotoCard(image.src), firstPhoto)

		   } else {
		   	photoList.appendChild(createPhotoCard(image.src))
		   }
		   // photoList.innerHTML += createPhotoCard(image.src);
		   photoList.addEventListener('click', (event) => clickHandler(event))
		}, 100);
	}
	
  	video.srcObject = stream;
  	video.onloadedmetadata = function() {
  		video.play();
  	};
  	controls.classList.add('visible');
  })
  .catch(err => {
  	errorMessage.textContent = err.message;
  	errorMessage.style.display = 'block';
  	video.style.display = 'none';
  	console.warn('Какие-то проблемы с доступом к камере.. ((');
  });

function clickHandler(event) {
	switch(event.target.innerText) {
	case 'file_upload': 
		uploadPhoto(event.target.parentElement.parentElement.parentElement)
		break;
	case 'file_download':
		savePhoto(event.target)
		break;
	case 'delete':
		deletePhoto(event.target)
		break;
	}
};

function savePhoto(event) {
	event.parentElement.style.display = 'none';
};

function deletePhoto(event) {
	event.parentElement.parentElement.parentElement.remove();
};

function uploadPhoto(event) {
	let photo = event.getElementsByTagName('img')[0];
	let sendForm = new FormData();
	sendForm.append('image', photo.src);
	console.log(sendForm);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth');
	xhr.setRequestHeader('Content-type', 'charset=utf-8');
	xhr.addEventListener('load', (ev) => console.log(ev))
	xhr.send(sendForm);

};

