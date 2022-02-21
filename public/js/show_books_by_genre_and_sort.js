'use strict'

let genre = sessionStorage.getItem('genre'),
    authorSort = sessionStorage.getItem('author'),
    yearSort = sessionStorage.getItem('year'),
    costFromSort = sessionStorage.getItem('cost_from'),
    costToSort = sessionStorage.getItem('cost_to'),
    $catalogBox = document.querySelector('#book_catalog'),
    typeOfSort = sessionStorage.getItem('sort'),
    $authors = document.getElementById('author'),
    $years = document.getElementById('year');

function setTypeOfSort() {
    sessionStorage.removeItem('author');
    sessionStorage.removeItem('year');
    sessionStorage.removeItem('cost_from');
    sessionStorage.removeItem('cost_to');

    let typeOfSort = document.getElementById('sort').value;
    sessionStorage.setItem('sort', typeOfSort);
}

function setAuthor() {
    sessionStorage.removeItem('year');
    sessionStorage.removeItem('cost_from');
    sessionStorage.removeItem('cost_to');

    let authorForSort = document.getElementById('author').value;
    sessionStorage.setItem('author', authorForSort);
}

function setYear() {
    sessionStorage.removeItem('author');
    sessionStorage.removeItem('cost_from');
    sessionStorage.removeItem('cost_to');

    let yearForSort = document.getElementById('year').value;
    sessionStorage.setItem('year', yearForSort);
}

function setPriceRange() {
    sessionStorage.removeItem('year');
    sessionStorage.removeItem('author');

    let costFrom = document.getElementsByName('cost_from');
    const valueFrom = costFrom[0].value;
    let costTo = document.getElementsByName('cost_to');
    const valueTo = costTo[0].value;
    sessionStorage.setItem('cost_from', valueFrom);
    sessionStorage.setItem('cost_to', valueTo);
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

function createListOfAuthors(authors) {
    for (let i = 0; i < authors.length; i++) {
        let $author = createElement('option');
        $author.innerHTML = authors[i].author_surname;
        $authors.append($author);
    }
}

function createListOfYears(years) {
    for (let i = 0; i < years.length; i++) {
        let $year = createElement('option');
        $year.innerHTML = years[i].year;
        $years.append($year);
    }
}

if (!authorSort && !yearSort && !costFromSort && !costToSort) {
    if (genre == "all")
    {
        fetch ("books/all/" + typeOfSort, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((books) => {
                createBookCard(books);           
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
}

    if (authorSort !== null) {
        fetch ("authorbooks/" + authorSort, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((books) => {
                createBookCard(books);           
            })
            .catch((err) => { console.log(err); })    
    }   
    
    if (yearSort !== null) {
        fetch ("yearbooks/" + yearSort, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((books) => {
                createBookCard(books);           
            })
            .catch((err) => { console.log(err); })    
    }   

    if (costFromSort !== null && costToSort !== null) {
        fetch ("costbooks/" + costFromSort + "/" + costToSort, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((books) => {
                createBookCard(books);           
            })
            .catch((err) => { console.log(err); }) 
    }

    fetch ("authors", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((authors) => {
            createListOfAuthors(authors);           
        })
        .catch((err) => { console.log(err); })    

    fetch ("years", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((years) => {
            createListOfYears(years);           
        })
        .catch((err) => { console.log(err); })  

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




