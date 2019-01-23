let bookList = [];

document.getElementById('content')
  .removeChild(
    document.getElementById('content').getElementsByTagName('li')[0]
);

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', false);
xhr.addEventListener('load',(resp) => {
  bookList = JSON.parse(resp.srcElement.responseText);
  bookList.forEach(function(elem) {
    document.getElementById('content').appendChild(createBook(elem));
  });
})
xhr.send();


function createBook(book) {
  let elemBook = document.createElement('li');
  elemBook.dataset.title = book.title;
  elemBook.dataset.author = book.author.name;
  elemBook.dataset.info = book.info;
  elemBook.dataset.price = book.price;
  let image = document.createElement('img');
  image.src = book.cover.small
  elemBook.appendChild(image)
  return elemBook
  }


// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});
