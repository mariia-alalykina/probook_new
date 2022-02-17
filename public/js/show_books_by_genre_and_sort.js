'use strict'

let genre = sessionStorage.getItem('genre'),
    $catalogBox = document.querySelector('#book_catalog'),
    typeOfSort = sessionStorage.getItem('sort');

function getSorted() {
    let typeOfSort = document.getElementById('sort').value;
    sessionStorage.setItem('sort', typeOfSort);
}

let statusFunc = function(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText));
    }
      return Promise.resolve(response);
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
}

function createBookCard(books) {
    let book_id = 0;
    $catalogBox.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        if (books[i].book_id == book_id) continue;

        let $prodCard = createElement('div', 'prod_card');
        
        let $book = createElement('a');
        $book.setAttribute('href', 'book.html');
        $book.setAttribute('data-id', books[i].book_id);
        $book.setAttribute('title', books[i].name);

        let $bookImg = createElement('div', 'img_book_card');

        let $img = createElement('img');
        $img.setAttribute('src', books[i].url_image);

        $bookImg.appendChild($img);                    

        let $cost = createElement('p', 'cost');

        let $price = createElement('span');
        $price.innerHTML = books[i].price;
        
        $cost.append($price);
        $cost.append(' грн.');

        let $bookName = createElement('p', 'book_name');
        $bookName.innerHTML = books[i].name;

        let $bookAuthor = createElement('p', 'book_author');
        $bookAuthor.innerHTML = books[i].author_name + " " + books[i].author_surname;

        $book.appendChild($bookImg);
        $book.appendChild($cost);
        $book.appendChild($bookName);
        $book.appendChild($bookAuthor);

        let $addToBasket = createElement('button', 'add_to_basket');
        $addToBasket.setAttribute('type', 'submit');
        $addToBasket.setAttribute('data-id', books[i].book_id);
        $addToBasket.innerHTML = "Добавить в корзину";

        $prodCard.appendChild($book);
        $prodCard.appendChild($addToBasket);

        $catalogBox.appendChild($prodCard);

        book_id = books[i].book_id;
    }
}

    if (genre == "all")
    {
        fetch ("books/all/" + typeOfSort, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((books) => {
                createBookCard(books);
                /* let $openBooks = document.querySelectorAll('.prod_card a');
                for(let i = 0; i < $openBooks.length; i++) {
                    $openBooks.addEventListener('click', function() {
                        sessionStorage.setItem('book_id', $openBooks.getAttribute('data-id'));
                    })
                }      */           
            })
            .catch((err) => { console.log(err); })    
    }   
    else {
        fetch ("books/" + genre + "/" + typeOfSort, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((books) => {
                createBookCard(books);
            })
            .catch((err) => {console.log(err);})
    }

function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
      
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));
     
        document.body.append(script);
    });
}

function getId()
{
  bookId = this.getAttribute('data-id');
  sessionStorage.setItem('book_id', bookId);
  window.location.href = 'book.html';
}

window.onload = function() {
    let promise = loadScript("js/add_to_basket_from_catalog.js");
    promise.then(
        script => { 
            console.log("Скрипт загружен!");
            let $productCard = document.querySelectorAll('.prod_card a');
            for(let i = 0; i < $productCard.length; i++) {
                $productCard[i].addEventListener('click', getId);
            }
        },
        error => console.log(`Ошибка:  + ${error.message}`)
    )
}




