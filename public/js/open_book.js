'use strict'

let $pageBox = document.querySelector('#book_page');
        
let bookId = sessionStorage.getItem('book_id');

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

function createBookPage(book) {
	let $bookImgDiv = createElement('div', 'img_book_page');
	let $bookImg = createElement('img');
	$bookImg.setAttribute('src', book[0].url_image);
	$bookImgDiv.append($bookImg);

	let $bookContent = createElement('div');
	$bookContent.setAttribute('id', 'book_content');

	let $mainInfo = createElement('div', 'main_inform');

	let $author = createElement('p', 'author');
	let $authorTitle = createElement('b');
	$authorTitle.innerHTML = "Автор: ";
	let $authorValue = createElement('span');
	$authorValue.innerHTML = book[0].author_name + ' ' + book[0].author_surname;
	$author.append($authorTitle);
	$author.append($authorValue);

	let $series = createElement('p', 'series');
	let $seriesTitle = createElement('b');
	$seriesTitle.innerHTML = "Серия: ";
	let $seriesValue = createElement('span');
	$seriesValue.innerHTML = book[0].series;
	$series.append($seriesTitle);
	$series.append($seriesValue);

	let $bookName = createElement('p', 'b_name');
	let $bookNameTitle = createElement('b');
	$bookNameTitle.innerHTML = "Название: ";
	let $bookNameValue = createElement('span');
	$bookNameValue.innerHTML = book[0].name;
	$bookName.append($bookNameTitle);
	$bookName.append($bookNameValue);

	let $publishing = createElement('p', 'publishing');
	let $publishingTitle = createElement('b');
	$publishingTitle.innerHTML = "Издательство: ";
	let $publishingValue = createElement('span');
	$publishingValue.innerHTML = book[0].publishing_house;
	$publishing.append($publishingTitle);
	$publishing.append($publishingValue);

	let $year = createElement('p', 'year');
	let $yearTitle = createElement('b');
	$yearTitle.innerHTML = "Год: ";
	let $yearValue = createElement('span');
	$yearValue.innerHTML = book[0].year;
	$year.append($yearTitle);
	$year.append($yearValue);

	let $numOfPages = createElement('p', 'num_pages');
	let $numOfPagesTitle = createElement('b');
	$numOfPagesTitle.innerHTML = "Количество страниц: ";
	let $numOfPagesValue = createElement('span');
	$numOfPagesValue.innerHTML = book[0].number_of_pages;
	$numOfPages.append($numOfPagesTitle);
	$numOfPages.append($numOfPagesValue);

	let $ageLimit = createElement('p', 'age_limit');
	let $ageLimitTitle = createElement('b');
	$ageLimitTitle.innerHTML = "Возрастное ограничение: ";
	let $ageLimitValue = createElement('span');
	$ageLimitValue.innerHTML = book[0].age_limit;
	$ageLimit.append($ageLimitTitle);
	$ageLimit.append($ageLimitValue);

	let $bookId = createElement('p', 'book_id');
	$bookId.append('Код товара: ');
	let $bookIdValue = createElement('span');
	$bookIdValue.innerHTML = book[0].book_id;
	$bookId.append($bookIdValue);

	$mainInfo.append($author);
	$mainInfo.append($series);
	$mainInfo.append($bookName);
	$mainInfo.append($publishing);
	$mainInfo.append($year);
	$mainInfo.append($numOfPages);
	$mainInfo.append($ageLimit);
	$mainInfo.append($bookId);

	let $priceInfo = createElement('div', 'price_info');
	
	let $availability = createElement('p', 'availability');
	$availability.innerHTML = book[0].availability;

	let $price = createElement('p', 'price');
	let $priceValue = createElement('span');
	$priceValue.innerHTML = book[0].price;
	$price.append($priceValue);
	$price.append(' грн.');

	let $addToBasket = createElement('button', 'add_to_basket');
	$addToBasket.setAttribute('type', 'submit');
	$addToBasket.setAttribute('data-id', book[0].book_id);
	$addToBasket.innerHTML = "Добавить в корзину";

	$priceInfo.append($availability);
	$priceInfo.append($price);
	$priceInfo.append($addToBasket);

	let $description = createElement('div', 'description');
	let $descriptionValue = createElement('p');
	let $descriptionTitle = createElement('b');
	$descriptionTitle.innerHTML = "Описание: ";
	$descriptionValue.append($descriptionTitle);
	let $br = createElement('br');
	$descriptionValue.append($br);
	$descriptionValue.append(book[0].description);
	$description.append($descriptionValue);

	$bookContent.append($mainInfo);
	$bookContent.append($priceInfo);
	$bookContent.append($description);

	$pageBox.append($bookImgDiv);
	$pageBox.append($bookContent);
}

fetch ("books/" + bookId, {
	method: "GET",
	headers: { "Accept": "application/json", "Content-Type": "application/json" } })
	.then (statusFunc)
	.then ((response) => {return response.json();})
	.then ((book) => {
		createBookPage(book);
	})
	.catch((err) => {console.log(err);}) 

	function loadScript(src) {
		return new Promise(function(resolve, reject) {
			let script = document.createElement('script');
			script.src = src;
		  
			script.onload = () => resolve(script);
			script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));
		 
			document.body.append(script);
		});
	}

	window.onload = function() {
		let promise = loadScript("js/add_to_basket_from_page.js");
		promise.then(
			script => console.log("Скрипт загружен!"),
			error => console.log(`Ошибка:  + ${error.message}`)
		)
	}