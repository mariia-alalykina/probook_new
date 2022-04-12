'use strict'

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

function addBook()
{
    let authorValue = document.getElementById('choose_author').value,
    $allOfTheAuthors = document.querySelectorAll('#choose_author option'),
    series = document.getElementById('add_series').value,
    bookName = document.getElementById('add_name').value,
    publishingHouse = document.getElementById('add_publishing_house').value,
    year = document.getElementById('add_year').value,
    numberOfPages = document.getElementById('add_number_of_pages').value,
    ageLimit = document.getElementById('add_age_limit').value,
    description = document.getElementById('add_description').value,
    genre = document.getElementById('genres').value,
    availability = document.getElementById('add_availability').value,
    price = document.getElementById('add_price').value,
    image = document.getElementById('add_image').value;

    let authorId;

    for(let i = 0; i < $allOfTheAuthors.length; i++) {
        if($allOfTheAuthors[i].value == authorValue) {
            authorId = $allOfTheAuthors[i].getAttribute('data-author-id');
        }
    }

    if (authorId && series && bookName && publishingHouse && year && numberOfPages && ageLimit && description && genre && availability && price && image)
    {
        fetch('book', {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                authorId: authorId,
                series: series,
                bookName: bookName,
                publishingHouse: publishingHouse,
                year: year,
                numberOfPages: numberOfPages,
                ageLimit: ageLimit,
                description: description,
                genre: genre,
                availability: availability,
                price: price,
                image: image
            })
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно добавлена!');
                window.location.reload();
            } else {
                alert('Ошибка добавления книги!');
            }
        })        
    } else {
        alert('Заполните все поля!');
    }
}

function createAddBookBlock() {
    let $bookData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить книгу';

    let $blockOfBookData = createElement('div');

    let $labelAuthor = createElement('label');
    $labelAuthor.setAttribute('for', 'choose_author');
    let $bAuthor = createElement('b');
    $bAuthor.innerHTML = 'Автор ';
    $labelAuthor.append($bAuthor);

    let $divSelectionAuthor = createElement('div', 'selection');
    let $selectionAuthor = createElement('select');
    $selectionAuthor.setAttribute('id', 'choose_author');
    $selectionAuthor.setAttribute('name', 'choose_author');
    let $optionDash3 = createElement('option');
    $optionDash3.innerHTML = "-";
    $selectionAuthor.append($optionDash3);

    fetch ("authors", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((authors) => {
            createSelectionAuthors(authors, $selectionAuthor);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionAuthor.append($selectionAuthor);

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    /* let $labelAuthorName = createElement('label');
    $labelAuthorName.setAttribute('for', 'author_name');
    let $bAuthorName = createElement('b');
    $bAuthorName.innerHTML = 'Имя автора';
    $labelAuthorName.append($bAuthorName);
    let $inputAuthorName = createElement('input');
    $inputAuthorName.setAttribute('type', 'text');
    $inputAuthorName.setAttribute('name', 'author_name');
    $inputAuthorName.setAttribute('id', 'add_author_name');

    let $labelAuthorSurname = createElement('label');
    $labelAuthorSurname.setAttribute('for', 'author_surname');
    let $bAuthorSurname = createElement('b');
    $bAuthorSurname.innerHTML = 'Фамилия автора';
    $labelAuthorSurname.append($bAuthorSurname);
    let $inputAuthorSurname = createElement('input');
    $inputAuthorSurname.setAttribute('type', 'text');
    $inputAuthorSurname.setAttribute('name', 'author_surname');
    $inputAuthorSurname.setAttribute('id', 'add_author_surname'); */

    let $labelSeries = createElement('label');
    $labelSeries.setAttribute('for', 'series');
    let $bSeries = createElement('b');
    $bSeries.innerHTML = 'Серия';
    $labelSeries.append($bSeries);
    let $inputSeries = createElement('input');
    $inputSeries.setAttribute('type', 'text');
    $inputSeries.setAttribute('name', 'series');
    $inputSeries.setAttribute('id', 'add_series');

    let $labelName = createElement('label');
    $labelName.setAttribute('for', 'b_name');
    let $bName = createElement('b');
    $bName.innerHTML = 'Название';
    $labelName.append($bName);
    let $inputName = createElement('input');
    $inputName.setAttribute('type', 'text');
    $inputName.setAttribute('name', 'b_name');
    $inputName.setAttribute('id', 'add_name');

    let $labelPublishingHouse = createElement('label');
    $labelPublishingHouse.setAttribute('for', 'publishing_house');
    let $bPublishingHouse = createElement('b');
    $bPublishingHouse.innerHTML = 'Издательство';
    $labelPublishingHouse.append($bPublishingHouse);
    let $inputPublishingHouse = createElement('input');
    $inputPublishingHouse.setAttribute('type', 'text');
    $inputPublishingHouse.setAttribute('name', 'publishing_house');
    $inputPublishingHouse.setAttribute('id', 'add_publishing_house');

    let $labelYear = createElement('label');
    $labelYear.setAttribute('for', 'year');
    let $bYear = createElement('b');
    $bYear.innerHTML = 'Год';
    $labelYear.append($bYear);
    let $inputYear = createElement('input');
    $inputYear.setAttribute('type', 'text');
    $inputYear.setAttribute('name', 'year');
    $inputYear.setAttribute('id', 'add_year');

    let $labelNumberOfPages = createElement('label');
    $labelNumberOfPages.setAttribute('for', 'number_of_pages');
    let $bNumberOfPages = createElement('b');
    $bNumberOfPages.innerHTML = 'Количество страниц';
    $labelNumberOfPages.append($bNumberOfPages);
    let $inputNumberOfPages = createElement('input');
    $inputNumberOfPages.setAttribute('type', 'text');
    $inputNumberOfPages.setAttribute('name', 'number_of_pages');
    $inputNumberOfPages.setAttribute('id', 'add_number_of_pages');

    let $labelAgeLimit = createElement('label');
    $labelAgeLimit.setAttribute('for', 'age_limit');
    let $bAgeLimit = createElement('b');
    $bAgeLimit.innerHTML = 'Возрастное ограничение';
    $labelAgeLimit.append($bAgeLimit);
    let $inputAgeLimit = createElement('input');
    $inputAgeLimit.setAttribute('type', 'text');
    $inputAgeLimit.setAttribute('name', 'age_limit');
    $inputAgeLimit.setAttribute('id', 'add_age_limit');

    let $labelDescription = createElement('label');
    $labelDescription.setAttribute('for', 'description');
    let $bDescription = createElement('b');
    $bDescription.innerHTML = 'Описание';
    $labelDescription.append($bDescription);
    let $inputDescription = createElement('input');
    $inputDescription.setAttribute('type', 'text');
    $inputDescription.setAttribute('name', 'description');
    $inputDescription.setAttribute('id', 'add_description');

    let $labelGenre = createElement('label');
    $labelGenre.setAttribute('for', 'genre');
    let $bGenre = createElement('b');
    $bGenre.innerHTML = 'Жанр ';
    $labelGenre.append($bGenre);
    let $selectGenre = createElement('select');
    $selectGenre.setAttribute('id', 'genres');
    $selectGenre.setAttribute('name', 'genre');
    $selectGenre.setAttribute('required', 'required');
        let $option0 = createElement('option');
        $option0.setAttribute('selected', 'selected');
        $option0.innerHTML = 'Выберите жанр';

        let $option1 = createElement('option');
        $option1.setAttribute('value', 'Художественная литература');
        $option1.innerHTML = 'Художественная литература';

        let $option2 = createElement('option');
        $option2.setAttribute('value', 'Научно-популярная литература');
        $option2.innerHTML = 'Научно-популярная литература';

        let $option3 = createElement('option');
        $option3.setAttribute('value', 'Учебная литература');
        $option3.innerHTML = 'Учебная литература';

        let $option4 = createElement('option');
        $option4.setAttribute('value', 'Саморазвитие');
        $option4.innerHTML = 'Саморазвитие';

        let $option5 = createElement('option');
        $option5.setAttribute('value', 'Биографии, мемуары');
        $option5.innerHTML = 'Биографии, мемуары';
    $selectGenre.append($option0);
    $selectGenre.append($option1);
    $selectGenre.append($option2);
    $selectGenre.append($option3);
    $selectGenre.append($option4);
    $selectGenre.append($option5);

    let $br1 = createElement('br'); 
    let $br2 = createElement('br');

    let $labelAvailability = createElement('label');
    $labelAvailability.setAttribute('for', 'availability');
    let $bAvailability = createElement('b');
    $bAvailability.innerHTML = 'Наличие';
    $labelAvailability.append($bAvailability);
    let $inputAvailability = createElement('input');
    $inputAvailability.setAttribute('type', 'text');
    $inputAvailability.setAttribute('name', 'availability');
    $inputAvailability.setAttribute('id', 'add_availability');

    let $labelPrice = createElement('label');
    $labelPrice.setAttribute('for', 'price');
    let $bPrice = createElement('b');
    $bPrice.innerHTML = 'Цена';
    $labelPrice.append($bPrice);
    let $inputPrice = createElement('input');
    $inputPrice.setAttribute('type', 'text');
    $inputPrice.setAttribute('name', 'price');
    $inputPrice.setAttribute('id', 'add_price');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'image');
    $inputImage.setAttribute('id', 'add_image');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addBook()');
    $addButton.innerHTML = 'Добавить';

    $bookData.append($headOfBlock);

    $blockOfBookData.append($labelAuthor);
    $blockOfBookData.append($divSelectionAuthor);
    $blockOfBookData.append($br3);
    $blockOfBookData.append($br4);
    $blockOfBookData.append($labelSeries);
    $blockOfBookData.append($inputSeries);
    $blockOfBookData.append($labelName);
    $blockOfBookData.append($inputName);
    $blockOfBookData.append($labelPublishingHouse);
    $blockOfBookData.append($inputPublishingHouse);
    $blockOfBookData.append($labelYear);
    $blockOfBookData.append($inputYear);
    $blockOfBookData.append($labelNumberOfPages);
    $blockOfBookData.append($inputNumberOfPages);
    $blockOfBookData.append($labelAgeLimit);
    $blockOfBookData.append($inputAgeLimit);
    $blockOfBookData.append($labelDescription);
    $blockOfBookData.append($inputDescription);
    $blockOfBookData.append($labelGenre);
    $blockOfBookData.append($selectGenre);
    $blockOfBookData.append($br1);
    $blockOfBookData.append($br2);
    $blockOfBookData.append($labelAvailability);
    $blockOfBookData.append($inputAvailability);
    $blockOfBookData.append($labelPrice);
    $blockOfBookData.append($inputPrice);
    $blockOfBookData.append($labelImage);
    $blockOfBookData.append($inputImage);
    $blockOfBookData.append($addButton);

    $bookData.append($blockOfBookData);

    document.getElementById('admin_block').append($bookData);
}

function addAuthor() {
    let authorName = document.getElementById('add_author_name').value;
    let authorSurname = document.getElementById('add_author_surname').value;

    if (authorName && authorSurname) {
        fetch('author', {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                name: authorName,
                surname: authorSurname
            })
        })
        .then(statusFunc)
        .then((response) => { return response.json(); })
        .then((result) => {
            if (result == true) { 
                alert('Автор успешно добавлен!');
                window.location.reload();
            } else if(result == false) {
                alert('Ошибка добавления автора!');
            }
        })
    } else {
        alert('Заполните все поля!');
    }
}

function createAddAuthorBlock() {
    let $authorData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить автора';

    let $blockOfAuthorData = createElement('div');

    let $labelAuthorName = createElement('label');
    $labelAuthorName.setAttribute('for', 'author_name');
    let $bAuthorName = createElement('b');
    $bAuthorName.innerHTML = 'Имя автора';
    $labelAuthorName.append($bAuthorName);
    let $inputAuthorName = createElement('input');
    $inputAuthorName.setAttribute('type', 'text');
    $inputAuthorName.setAttribute('name', 'author_name');
    $inputAuthorName.setAttribute('id', 'add_author_name');

    let $labelAuthorSurname = createElement('label');
    $labelAuthorSurname.setAttribute('for', 'author_surname');
    let $bAuthorSurname = createElement('b');
    $bAuthorSurname.innerHTML = 'Фамилия автора';
    $labelAuthorSurname.append($bAuthorSurname);
    let $inputAuthorSurname = createElement('input');
    $inputAuthorSurname.setAttribute('type', 'text');
    $inputAuthorSurname.setAttribute('name', 'author_surname');
    $inputAuthorSurname.setAttribute('id', 'add_author_surname');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addAuthor()');
    $addButton.innerHTML = 'Добавить';

    $authorData.append($headOfBlock);

    $blockOfAuthorData.append($labelAuthorName);
    $blockOfAuthorData.append($inputAuthorName);
    $blockOfAuthorData.append($labelAuthorSurname);
    $blockOfAuthorData.append($inputAuthorSurname);
    $blockOfAuthorData.append($addButton);

    $authorData.append($blockOfAuthorData);

    document.getElementById('admin_block').append($authorData);
}

function createSelectionId(books, $select) {
    let previousId = 0;
    for (let i = 0; i < books.length; i++) {
        if (books[i].book_id === previousId) { continue; }
        let $id = createElement('option');
        $id.innerHTML = books[i].book_id;
        $id.setAttribute('value', books[i].book_id);
        $select.append($id);
        previousId = books[i].book_id;
    }
}

function createSelectionAuthors(authors, $select) {
    for (let i = 0; i < authors.length; i++) {
        let $author = createElement('option');
        $author.innerHTML = authors[i].author_name + ' ' + authors[i].author_surname;
        $author.setAttribute('data-author-id', authors[i].author_id);
        $select.append($author);
    }
}

function createChangeBookBlock() {
    let $bookData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Изменить данные книги';

    let $labelInputId = createElement('label');
    $labelInputId.setAttribute('for', 'book_id');
    let $bInputId = createElement('b');
    $bInputId.innerHTML = 'Выберите ID книги: ';
    $labelInputId.append($bInputId);
    
    let $divSelectionId1 = createElement('div', 'selection');
    let $selection1 = createElement('select');
    $selection1.setAttribute('id', 'input_book_id');
    $selection1.setAttribute('name', 'book_id');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = "-";
    $selection1.append($optionDash1);

    fetch ("books", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((books) => {
            createSelectionId(books, document.getElementById('input_book_id'));           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionId1.append($selection1);
    
    let $buttonShowData = createElement('input');
    $buttonShowData.setAttribute('type', 'button');
    $buttonShowData.setAttribute('value', 'Отобразить данные');
    $buttonShowData.setAttribute('onclick', 'showBookData()');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $blockOfBookData = createElement('div');

    let $labelAuthor = createElement('label');
    $labelAuthor.setAttribute('for', 'choose_author');
    let $bAuthor = createElement('b');
    $bAuthor.innerHTML = 'Автор ';
    $labelAuthor.append($bAuthor);

    let $divSelectionAuthor = createElement('div', 'selection');
    let $selectionAuthor = createElement('select');
    $selectionAuthor.setAttribute('id', 'choose_author');
    $selectionAuthor.setAttribute('name', 'choose_author');
    let $optionDash3 = createElement('option');
    $optionDash3.innerHTML = "-";
    $selectionAuthor.append($optionDash3);

    fetch ("authors", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((authors) => {
            createSelectionAuthors(authors, $selectionAuthor);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionAuthor.append($selectionAuthor);

    let $br7 = createElement('br');
    let $br8 = createElement('br');

    let $labelSeries = createElement('label');
    $labelSeries.setAttribute('for', 'series');
    let $bSeries = createElement('b');
    $bSeries.innerHTML = 'Серия';
    $labelSeries.append($bSeries);
    let $inputSeries = createElement('input');
    $inputSeries.setAttribute('type', 'text');
    $inputSeries.setAttribute('name', 'series');
    $inputSeries.setAttribute('id', 'add_series');

    let $labelName = createElement('label');
    $labelName.setAttribute('for', 'b_name');
    let $bName = createElement('b');
    $bName.innerHTML = 'Название';
    $labelName.append($bName);
    let $inputName = createElement('input');
    $inputName.setAttribute('type', 'text');
    $inputName.setAttribute('name', 'b_name');
    $inputName.setAttribute('id', 'add_name');

    let $labelPublishingHouse = createElement('label');
    $labelPublishingHouse.setAttribute('for', 'publishing_house');
    let $bPublishingHouse = createElement('b');
    $bPublishingHouse.innerHTML = 'Издательство';
    $labelPublishingHouse.append($bPublishingHouse);
    let $inputPublishingHouse = createElement('input');
    $inputPublishingHouse.setAttribute('type', 'text');
    $inputPublishingHouse.setAttribute('name', 'publishing_house');
    $inputPublishingHouse.setAttribute('id', 'add_publishing_house');

    let $labelYear = createElement('label');
    $labelYear.setAttribute('for', 'year');
    let $bYear = createElement('b');
    $bYear.innerHTML = 'Год';
    $labelYear.append($bYear);
    let $inputYear = createElement('input');
    $inputYear.setAttribute('type', 'text');
    $inputYear.setAttribute('name', 'year');
    $inputYear.setAttribute('id', 'add_year');

    let $labelNumberOfPages = createElement('label');
    $labelNumberOfPages.setAttribute('for', 'number_of_pages');
    let $bNumberOfPages = createElement('b');
    $bNumberOfPages.innerHTML = 'Количество страниц';
    $labelNumberOfPages.append($bNumberOfPages);
    let $inputNumberOfPages = createElement('input');
    $inputNumberOfPages.setAttribute('type', 'text');
    $inputNumberOfPages.setAttribute('name', 'number_of_pages');
    $inputNumberOfPages.setAttribute('id', 'add_number_of_pages');

    let $labelAgeLimit = createElement('label');
    $labelAgeLimit.setAttribute('for', 'age_limit');
    let $bAgeLimit = createElement('b');
    $bAgeLimit.innerHTML = 'Возрастное ограничение';
    $labelAgeLimit.append($bAgeLimit);
    let $inputAgeLimit = createElement('input');
    $inputAgeLimit.setAttribute('type', 'text');
    $inputAgeLimit.setAttribute('name', 'age_limit');
    $inputAgeLimit.setAttribute('id', 'add_age_limit');

    let $labelDescription = createElement('label');
    $labelDescription.setAttribute('for', 'description');
    let $bDescription = createElement('b');
    $bDescription.innerHTML = 'Описание';
    $labelDescription.append($bDescription);
    let $inputDescription = createElement('input');
    $inputDescription.setAttribute('type', 'text');
    $inputDescription.setAttribute('name', 'description');
    $inputDescription.setAttribute('id', 'add_description');

    let $labelGenre = createElement('label');
    $labelGenre.setAttribute('for', 'genre');
    let $bGenre = createElement('b');
    $bGenre.innerHTML = 'Жанр ';
    $labelGenre.append($bGenre);
    let $selectGenre = createElement('select');
    $selectGenre.setAttribute('id', 'genres');
    $selectGenre.setAttribute('name', 'genre');
    $selectGenre.setAttribute('required', 'required');
        let $option0 = createElement('option');
        $option0.setAttribute('selected', 'selected');
        $option0.innerHTML = 'Выберите жанр';

        let $option1 = createElement('option');
        $option1.setAttribute('value', 'Художественная литература');
        $option1.innerHTML = 'Художественная литература';

        let $option2 = createElement('option');
        $option2.setAttribute('value', 'Научно-популярная литература');
        $option2.innerHTML = 'Научно-популярная литература';

        let $option3 = createElement('option');
        $option3.setAttribute('value', 'Учебная литература');
        $option3.innerHTML = 'Учебная литература';

        let $option4 = createElement('option');
        $option4.setAttribute('value', 'Саморазвитие');
        $option4.innerHTML = 'Саморазвитие';

        let $option5 = createElement('option');
        $option5.setAttribute('value', 'Биографии, мемуары');
        $option5.innerHTML = 'Биографии, мемуары';
    $selectGenre.append($option0);
    $selectGenre.append($option1);
    $selectGenre.append($option2);
    $selectGenre.append($option3);
    $selectGenre.append($option4);
    $selectGenre.append($option5);

    let $br3 = createElement('br'); 
    let $br4 = createElement('br');

    let $labelAvailability = createElement('label');
    $labelAvailability.setAttribute('for', 'availability');
    let $bAvailability = createElement('b');
    $bAvailability.innerHTML = 'Наличие';
    $labelAvailability.append($bAvailability);
    let $inputAvailability = createElement('input');
    $inputAvailability.setAttribute('type', 'text');
    $inputAvailability.setAttribute('name', 'availability');
    $inputAvailability.setAttribute('id', 'add_availability');

    let $labelPrice = createElement('label');
    $labelPrice.setAttribute('for', 'price');
    let $bPrice = createElement('b');
    $bPrice.innerHTML = 'Цена';
    $labelPrice.append($bPrice);
    let $inputPrice = createElement('input');
    $inputPrice.setAttribute('type', 'text');
    $inputPrice.setAttribute('name', 'price');
    $inputPrice.setAttribute('id', 'add_price');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'image');
    $inputImage.setAttribute('id', 'add_image');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'changeBook()');
    $addButton.innerHTML = 'Изменить';

    let $br5 = createElement('br'); 
    let $br6 = createElement('br');

    let $labelInputDelId = createElement('label');
    $labelInputDelId.setAttribute('for', 'del_book_id');
    let $bInputDelId = createElement('b');
    $bInputDelId.innerHTML = 'Выберите ID книги для удаления: ';
    $labelInputDelId.append($bInputDelId);
    
    let $divSelectionId2 = createElement('div', 'selection');
    let $selection2 = createElement('select');
    $selection2.setAttribute('id', 'input_del_book_id');
    $selection2.setAttribute('name', 'del_book_id');
    let $optionDash2 = createElement('option');
    $optionDash2.innerHTML = '-';
    $selection2.append($optionDash2);

    fetch ("books", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((books) => {
            createSelectionId(books, document.getElementById('input_del_book_id'));           
        })
        .catch((err) => { console.log(err); })  

    $divSelectionId2.append($selection2);

    let $buttonDeleteBook = createElement('button');
    $buttonDeleteBook.innerHTML = 'Удалить книгу';
    $buttonDeleteBook.setAttribute('onclick', 'deleteBook()');

    $bookData.append($headOfBlock);

    $bookData.append($labelInputId);
    $bookData.append($divSelectionId1);
    $bookData.append($buttonShowData);
    $bookData.append($br1);
    $bookData.append($br2);

    $blockOfBookData.append($labelAuthor);
    $blockOfBookData.append($divSelectionAuthor);
    $blockOfBookData.append($br7);
    $blockOfBookData.append($br8);
    $blockOfBookData.append($labelSeries);
    $blockOfBookData.append($inputSeries);
    $blockOfBookData.append($labelName);
    $blockOfBookData.append($inputName);
    $blockOfBookData.append($labelPublishingHouse);
    $blockOfBookData.append($inputPublishingHouse);
    $blockOfBookData.append($labelYear);
    $blockOfBookData.append($inputYear);
    $blockOfBookData.append($labelNumberOfPages);
    $blockOfBookData.append($inputNumberOfPages);
    $blockOfBookData.append($labelAgeLimit);
    $blockOfBookData.append($inputAgeLimit);
    $blockOfBookData.append($labelDescription);
    $blockOfBookData.append($inputDescription);
    $blockOfBookData.append($labelGenre);
    $blockOfBookData.append($selectGenre);
    $blockOfBookData.append($br3);
    $blockOfBookData.append($br4);
    $blockOfBookData.append($labelAvailability);
    $blockOfBookData.append($inputAvailability);
    $blockOfBookData.append($labelPrice);
    $blockOfBookData.append($inputPrice);
    $blockOfBookData.append($labelImage);
    $blockOfBookData.append($inputImage);
    $blockOfBookData.append($addButton);
    $blockOfBookData.append($br5);
    $blockOfBookData.append($br6);
    $blockOfBookData.append($labelInputDelId);
    $blockOfBookData.append($divSelectionId2);
    $blockOfBookData.append($buttonDeleteBook);

    $bookData.append($blockOfBookData);

    document.getElementById('admin_block').append($bookData);
}

function setValuesOfField(books) {
    let $authors = document.querySelectorAll('#choose_author option');
    for(let i = 0; i < $authors.length; i++) {
        if($authors[i].getAttribute('selected')) {
            $authors[i].removeAttribute('selected');
        }
    }
    for(let i = 0; i < $authors.length; i++) {
        if ($authors[i].value == (books[0].author_name + ' ' + books[0].author_surname)) {
            $authors[i].setAttribute('selected', 'selected');
        }
    }
    document.getElementById('add_series').value = books[0].series;
    document.getElementById('add_name').value = books[0].name;
    document.getElementById('add_publishing_house').value = books[0].publishing_house;
    document.getElementById('add_year').value = books[0].year;
    document.getElementById('add_number_of_pages').value = books[0].number_of_pages;
    document.getElementById('add_age_limit').value = books[0].age_limit;
    document.getElementById('add_description').value = books[0].description;
    let genres = document.querySelectorAll('#genres option');
    for(let i = 0; i < genres.length ; i++) {
        if (genres[i].value == books[0].genre) {
            genres[i].setAttribute('selected', 'selected');
        }
    }
    document.getElementById('add_availability').value = books[0].availability;
    document.getElementById('add_price').value = books[0].price;
    document.getElementById('add_image').value = books[0].url_image;
}

function showBookData() {
    let bookId = document.getElementById('input_book_id').value;
    if(bookId === '-') { 
        alert('Выберите ID книги!');
    } else {
        fetch ("books/" + bookId, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((books) => {
            setValuesOfField(books);           
        })
        .catch((err) => { console.log(err); }) 
    }    
}

function changeBook() {
    let bookId = document.getElementById('input_book_id').value;    
    let authorValue = document.getElementById('choose_author').value,
    $allOfTheAuthors = document.querySelectorAll('#choose_author option'),
    series = document.getElementById('add_series').value,
    bookName = document.getElementById('add_name').value,
    publishingHouse = document.getElementById('add_publishing_house').value,
    year = document.getElementById('add_year').value,
    numberOfPages = document.getElementById('add_number_of_pages').value,
    ageLimit = document.getElementById('add_age_limit').value,
    description = document.getElementById('add_description').value,
    genre = document.getElementById('genres').value,
    availability = document.getElementById('add_availability').value,
    price = document.getElementById('add_price').value,
    image = document.getElementById('add_image').value;

    let authorId;

    for(let i = 0; i < $allOfTheAuthors.length; i++) {
        if($allOfTheAuthors[i].value == authorValue) {
            authorId = $allOfTheAuthors[i].getAttribute('data-author-id');
        }
    }

    if(series || bookName || publishingHouse || year || numberOfPages || ageLimit || description || genre || availability || price || authorId || image) {
        if(authorId) {
            if(image) {
                fetch ("book/image/" + bookId, {
                    method: "PUT",
                    headers: { "Accept": "application/text", "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image: image
                    }) })
                    .then (statusFunc)
                    .then ((response) => {return response.json();})
                    .then ((result) => {
                        if(result == true) {
                            alert('Изображение изменено!');          
                        } else if (result == false) {
                            alert('Ошибка изменения изображения!');
                        }
                    })
                    .catch((err) => { console.log(err); })  
            }

            fetch ("book/author/" + bookId, {
                method: "PUT",
                headers: { "Accept": "application/text", "Content-Type": "application/json" },
                body: JSON.stringify({
                    authorId: authorId
                }) })
                .then (statusFunc)
                .then ((response) => {return response.json();})
                .then ((result) => {
                    if(result == true) {
                        alert('Автор изменён!');    
                    } else if (result == false) {
                        alert('Ошибка изменения автора!');
                    }
                })
                .catch((err) => { console.log(err); })
        }

        fetch ("book/" + bookId, {
            method: "PUT",
            headers: { "Accept": "application/text", "Content-Type": "application/json" },
            body: JSON.stringify({
                    series: series,
                    bookName: bookName,
                    publishingHouse: publishingHouse,
                    year: year,
                    numberOfPages: numberOfPages,
                    ageLimit: ageLimit,
                    description: description,
                    genre: genre,
                    availability: availability,
                    price: price,
                })
            })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((result) => {
                if(result == true) {
                    alert('Основные данные книги изменены!');  
                    window.location.reload();       
                } else if (result == false) {
                    alert('Ошибка изменения данных книги!');
                }
            })
            .catch((err) => { console.log(err); })
    }
}

function deleteBook() {
    let bookId = document.getElementById('input_del_book_id').value;
    if(bookId === '-') { 
        alert('Выберите ID книги!');
    } else {
        fetch ("book/" + bookId, {
        method: "DELETE",
        headers: { "Accept": "application/text", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно удалена!');
                window.location.reload();
            } else if(result == false) {
                alert('Ошибка удаления книги!');
            }
        })
        .catch((err) => { console.log(err); }) 
    }
}

window.onload = function() {
    if(sessionStorage.getItem('page') === 'add_book') {
        createAddBookBlock();
    } else if (sessionStorage.getItem('page') === 'change_delete_book') {
        createChangeBookBlock();
    } else if (sessionStorage.getItem('page') === 'add_author') {
        createAddAuthorBlock();
    }
}

