'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  for (let elem of list.reverse()) {
    commentsContainer.insertBefore(createComment(elem), commentsContainer.firstChild);
    }
}

function createComment(comment) {

  const wrap = document.createElement('div');
  const photo = document.createElement('div');
  const avatar = document.createElement('div');
  const block = document.createElement('div');
  const text = document.createElement('p');
  const bottom = document.createElement('div');
  const date = document.createElement('div');
  const actions = document.createElement('ul');
  const complain = document.createElement('li');
  const reply = document.createElement('li');
  
  wrap.className = 'comment-wrap';
  photo.className = 'photo';
  avatar.className = 'avatar'
  block.className = 'comment-block';
  text.className = 'comment-text';
  bottom.className = 'bottom-comment';
  date.className = 'comment-date';
  actions.className = 'comment-actions';
  complain.className = 'complain';
  reply.className = 'reply';

  wrap.appendChild(photo);
  photo.appendChild(avatar);
  wrap.appendChild(block);
  block.appendChild(text);
  block.appendChild(bottom);
  bottom.appendChild(date)
  bottom.appendChild(actions)
  actions.appendChild(complain);
  actions.appendChild(reply);

  photo.title = comment.author.name;
  avatar.style.backgroundImage = 'url(' + comment.author.pic + ')';
  text.innerText = comment.text;
  date.innerText = new Date(Date(comment.date)).toLocaleString('ru-Ru');
  complain.innerText = 'Пожаловаться';
  reply.innerText = 'Ответить';

  return wrap;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);

