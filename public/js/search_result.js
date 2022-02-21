'use strict'

let textForSearching = sessionStorage.getItem('search'),
    $resultBox = document.querySelector('#search_result');

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

function createResultPage(result) {
    let $searchingTitle = createElement('p');
    $searchingTitle.append('Результаты поиска "');
    let $inputText = createElement('b');
    $inputText.innerHTML = textForSearching;
    $searchingTitle.append($inputText);
    $searchingTitle.append('"');

    if (result.length == 0) {
        let $emptyResult = createElement('p');
        $emptyResult.innerHTML = 'Ничего не найдено.';
        $resultBox.append($searchingTitle);
        $resultBox.append($emptyResult);
    } else {
        let $resultTable = createElement('table');

        for (let i = 0; i < result.length; i++) {
            let $line = createElement('tr');

            let $cellBookname = createElement('td');
            let $linkOnBook = createElement('a');
            $linkOnBook.setAttribute('href', 'book.html');
            $linkOnBook.setAttribute('data-id', result[i].book_id);
            $linkOnBook.setAttribute('onclick', 'getId(this)');
            let $bookname = createElement('p');
            $bookname.innerHTML = result[i].name;
            $linkOnBook.append($bookname);
            $cellBookname.append($linkOnBook);

            let $cellAuthor = createElement('td');
            $cellAuthor.innerText = result[i].author_name + ' ' + result[i].author_surname;

            let $cellPrice = createElement('td');
            let $price = createElement('span');
            $price.innerHTML = result[i].price;
            $cellPrice.append($price);
            $cellPrice.append(' грн.');

            $line.append($cellBookname);
            $line.append($cellAuthor);
            $line.append($cellPrice);
            
            $resultTable.append($line);
        }

        $resultBox.append($searchingTitle);
        $resultBox.append($resultTable);
    }
}

if (textForSearching)
{
    fetch ("search/" + textForSearching, {
        method: "GET",
        headers: { "Accept": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((result) => {
            createResultPage(result);
        })
        .catch((err) => {console.log(err);}) 
}

function getId(elem)
{
    let bookId = elem.getAttribute('data-id');
    sessionStorage.setItem('book_id', bookId);
    window.location.href = 'book.html';
}